import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      administrador: boolean;
      provider: string;
    } & DefaultSession['user'];
  }

  interface User {
    administrador: boolean;
    provider: string;
  }

  interface CredentialsInputs {
    email: string;
    password: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    administrador: boolean;
    provider: string;
  }
}
