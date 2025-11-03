import { globalErrorHandler } from "@/helpers/globalHanlers";
import { LoginUserResponseType, LoginUserType, Role } from "@/types/auth.types";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { baseUrl } from "./api";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        token: { label: "token", type: "text" },
        nonce: { label: "nonce", type: "text" },
      },

      async authorize(credentials) {
        try {
          if (!credentials) return null;

          const { email, password, nonce } = credentials;

          const res = await fetch(`${baseUrl}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
              nonce,
            }),
          });

          const data: LoginUserResponseType = await res.json();

          if (!res.ok || !data.status) {
            return null;
          }

          if (data.status && data.access_token && data.user) {
            return {
              ...data.user,
              access_token: data.access_token,
            };
          }

          return null;
        } catch (error) {
          throw new Error(globalErrorHandler(error));
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.access_token;
        token.user = user;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken as string;
        session.user = token.user as LoginUserType;
        session.user.role = session.user.role.toLowerCase() as Role;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7,
  },

  pages: {
    signIn: "/login",
  },
});
