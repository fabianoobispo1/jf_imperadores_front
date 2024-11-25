import { NextAuthConfig } from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import { fetchMutation, fetchQuery } from 'convex/nextjs'
import { z } from 'zod'
import { compare } from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

import { api } from '../../convex/_generated/api'

async function getUser(identifier: { key: string; value: string }) {
  let user
  if (identifier.key === 'email')
    user = fetchQuery(api.user.getByEmail, { email: identifier.value })

  return user
}

const authConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '' /* ,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      } */,
    }),
    CredentialProvider({
      credentials: {
        email: {
          type: 'email',
        },
        password: {
          type: 'password',
        },
      },

      async authorize(credentials) {
        const parsedCredentials = z
          .object({ identifier: z.string(), password: z.string().min(6) })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { identifier, password } = parsedCredentials.data
          const isEmail = identifier.includes('@')
          const user = await getUser({
            key: isEmail ? 'email' : 'username',
            value: identifier,
          })
          if (!user) return null

          const isMatch = await compare(password, user.password)
          if (!isMatch) return null

          return {
            id: user._id.toString(),
            image: user.image || '',
            email: user.email,
            role: user.role,
            nome: user.nome,
          }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === 'github' || account?.provider === 'google') {
        const provider = account?.provider
        const email = profile?.email
        if (email) {
          const usuario = await getUser({ key: 'email', value: email })
          if (!usuario) {
            await fetchMutation(api.user.create, {
              password: uuidv4(),
              provider,
              email,
              role: 'user',
              image: String(profile.avatar_url),
              nome: String(profile.nome),
            })
          }
        }
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string
        token.role = user.role
        token.image = user.image as string
        token.nome = user.nome as string
      }
      return token
    },

    async session({ session, token }) {
      if (token.role) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.image = token.image
        session.user.nome = token.nome
      }
      return session
    },
  },
  jwt: {
    maxAge: 60 * 60, // 1 h
  },
} satisfies NextAuthConfig

export default authConfig
