import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';

import https from 'https';
import fetch from 'node-fetch';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_MINHA_BASE; // Base URL of your external API

// Crie um agente HTTPS que ignora certificados autoassinados
const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

const authConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
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
      } */
    }),
    CredentialProvider({
      credentials: {
        email: {
          type: 'email'
        },
        password: {
          type: 'password'
        }
      },

      async authorize(credentials, req) {
        try {
          const response = await fetch(
            `${API_BASE_URL}/sfa/usuario/autenticacao`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password
              }),
              agent: httpsAgent // Adiciona o agente que ignora o erro do certificado
            }
          );

          /* const response = await axios.post(
            `${API_BASE_URL}/sfa/usuario/autenticacao`,
            {
              email: credentials?.email,
              password: credentials?.password
            }
          ); */

          const responseData = await response.json();
          const usuario = responseData?.sfaUsuario;

          if (usuario) {
            return {
              id: usuario.id,
              name: usuario.nome,
              email: usuario.email,
              administrador: usuario.administrador,
              provider: usuario.provider
            };
          }

          return null;
        } catch (error: any) {
          const errorMessage =
            error?.response?.data?.message ||
            'Erro desconhecido durante a autorização';

          // Log do erro para debugging

          // Lança uma resposta customizada que o NextAuth pode entender
          throw new Error(
            JSON.stringify({
              error: errorMessage,
              status: error.response?.status || 400
            })
          );
        }
      }
    })
  ],
  trustHost: true,
  pages: {
    signIn: '/' //sigin page
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('✔️');
      if (account?.provider === 'github' || account?.provider === 'google') {
        const provider = account?.provider;
        const email = profile?.email;
        let img_url = '';



          if (email) {
            const response = await fetch(
              `${API_BASE_URL}/sfa/usuario/buscausuarioemail`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  email: email
                }),
                agent: httpsAgent // Adiciona o agente que ignora o erro do certificado
              }
            );
            const responseData = await response.json();
            console.log(responseData)
         /* let usuario = await prisma.sFAUser.findUnique({
            where: { email }
          });

          if (!usuario) {
            usuario = await prisma.sFAUser.create({
              data: {
                email,
                nome: String(profile.name),
                password_hash: uuidv4(),
                provider,
                img_url: profile?.picture
              }
            });
          } else {
            if (
              usuario.img_url === '' ||
              usuario.img_url === null ||
              usuario.img_url === undefined
            ) {
              if (account?.provider === 'google') {
                img_url = profile?.picture;
              } else if (account?.provider === 'github') {
                if (typeof profile?.avatar_url === 'string') {
                  img_url = profile.avatar_url;
                }
              }
            }

            await prisma.sFAUser.update({
              where: {
                email
              },
              data: {
                password_hash: uuidv4(),
                provider,
                img_url
              }
            });
          }

          user.id = usuario.id;
          user.administrador = usuario.administrador;
          user.provider = usuario.provider;*/
        }
      }

      return true;
    },
    async jwt({ token, user }) {
      // First time JWT callback is run, user object is available
      if (user) {
        token.id = user.id;
        token.administrador = user.administrador;
        token.provider = user.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = String(token.id);
        session.user.administrador = token.administrador;
        session.user.provider = String(token.provider);
      }
      return session;
    }
  },
  jwt: {
    maxAge: 60 * 60 // 1 h
  }
} satisfies NextAuthConfig;

export default authConfig;
