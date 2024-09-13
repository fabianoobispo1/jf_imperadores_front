import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import axios from 'axios';
//recuperar a mensagem de erro no front web
//verificar o eemail antes de logar 

const API_BASE_URL = process.env.NEXT_PUBLIC_API_MINHA_BASE; // Base URL of your external API

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
          const response = await axios.post(
            `${API_BASE_URL}/sfa/usuario/autenticacao`,
            {
              email: credentials?.email,
              password: credentials?.password
            }
          );

          const usuario = response.data.sfaUsuario;

          if (usuario) {
            return {
              id: usuario.id,
              name: usuario.nome,
              email: usuario.email,
              administrador: usuario.administrador,
              provider: usuario.provider,
              tokenApi: response.data.token
            };
          }

          return null;
        } catch (error: any) {
          console.log('🤞' + error);
          const errorMessage =
            error?.response?.data?.message ||
            'Erro desconhecido durante a autorização';
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
      console.log('signIn');
      console.log(user);
      if (account?.provider === 'github' || account?.provider === 'google') {
        const provider = account?.provider;
        const email = profile?.email;
        let img_url = '';
        if (account?.provider === 'google') {
          img_url = profile?.picture;
        } else if (account?.provider === 'github') {
          if (typeof profile?.avatar_url === 'string') {
            img_url = profile.avatar_url;
          }
        }

        //loga com usuario especial para login
        const responseUserAuth = await axios.post(
          `${API_BASE_URL}/sfa/usuario/autenticacao`,
          {
            email: process.env.USER_LOGIN_AUTH,
            password: process.env.PASS_LOGIN_AUTH
          }
        );
        console.log('realizou login auth');
        //verifica se existe email ja cadastrado -rota autenticada
        let usuario;
        let exsiteusuario = false;
        try {
          const responseUsuario = await axios.post(
            `${API_BASE_URL}/sfa/usuario/buscausuarioemail`,
            {
              email
            },
            {
              headers: {
                Authorization: `Bearer ${responseUserAuth.data.token}`
              }
            }
          );
          exsiteusuario = true;
          usuario = responseUsuario.data.sfaUsuario;
        } catch (error: any) {
          exsiteusuario = false;
        }
        console.log('aqui');
        if (!exsiteusuario) {
          //se nao existir realiza o cadastro
          console.log('Cadastra');
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_MINHA_BASE}/sfa/usuario/adicionar`,
            {
              email,
              nome: String(profile?.name),
              password: '12345678',
              provider,
              img_url
            }
          );
        } else {
          console.log('atualiza');
          const response = await axios.put(
            `${process.env.NEXT_PUBLIC_API_MINHA_BASE}/sfa/usuario/editarusuario/${usuario.id}`,
            {
              nome: usuario.name,
              email: usuario.email,
              password: '12345678',
              provider,
              img_url
            },
            {
              headers: {
                Authorization: `Bearer ${responseUserAuth.data.token}`
              }
            }
          );
        }

        //realiza o login coim o usuario para pegar o tokn da api
        const responseUser = await axios.post(
          `${API_BASE_URL}/sfa/usuario/autenticacao`,
          {
            email: usuario.email,
            password: '12345678'
          }
        );

        user.id = usuario.id;
        user.administrador = usuario.administrador;
        user.provider = usuario.provider;
        user.tokenApi = responseUser.data.token;
      }

      return true;
    },
    async jwt({ token, user }) {
      // First time JWT callback is run, user object is available
      console.log('✔');
      console.log('JWT');
      console.log(user);
      console.log(token);
      if (user) {
        token.id = user.id;
        token.administrador = user.administrador;
        token.provider = user.provider;
        token.tokenApi = user.tokenApi;
      }
      return token;
    },
    async session({ session, token }) {
      console.log('✔');
      console.log('ssion');
      console.log(token);
      if (token?.id) {
        session.user.id = String(token.id);
        session.user.administrador = token.administrador;
        session.user.provider = String(token.provider);
        session.user.tokenApi = String(token.tokenApi);
      }
      console.log('✔');
      console.log('ssion');
      console.log(session);
      return session;
    }
  },
  jwt: {
    maxAge: 60 * 60 // 1 h
  }
} satisfies NextAuthConfig;

export default authConfig;
