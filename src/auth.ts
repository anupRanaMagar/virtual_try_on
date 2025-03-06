import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import db from "./drizzle";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { LoginSchema } from "./schemas";
import { getUserByEmail, getUserById } from "./data/user";
import { accounts, sessions, users } from "./drizzle/schema";
import { uuid } from "drizzle-orm/pg-core";
import { encode } from "@auth/core/jwt";
import { eq } from "drizzle-orm";

const adapter = DrizzleAdapter(db, {
  accountsTable: accounts,
  usersTable: users,
  sessionsTable: sessions,
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.hashedPassword) {
            return null;
          }
          const isPasswordValid = await bcrypt.compare(
            password,
            user.hashedPassword
          );
          if (isPasswordValid) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/error",
  },
  events: {
    async linkAccount({ user }) {
      await db
        .update(users)
        .set({ emailVerified: new Date() })
        .where(eq(users.id, user.id as string));
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      //Allow OAuth without email verification
      // console.log(user, account);
      console.log("USER", user);
      console.log("ACCOUNT", account);
      if (account?.provider == "google" || account?.provider == "github")
        return true;
      const exisitingUser = await getUserById(user.id as string);
      if (!exisitingUser || !exisitingUser.emailVerified) return false;
      return true;
    },
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
    // async signIn({ user }) {
    //   const exisitingUser = await getUserById(user.id as string);
    //   console.log(exisitingUser);
    //   if (!exisitingUser || !exisitingUser.emailVerified) {
    //     return false;
    //   }
    //   return true;
    // },
  },
  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid().toString();

        if (!params.token.sub) {
          throw new Error("No user ID found in token");
        }

        const createdSession = await adapter?.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        });

        if (!createdSession) {
          throw new Error("Failed to create session");
        }

        return sessionToken;
      }
      return encode(params);
    },
  },
  session: {
    strategy: "database",
  },
});
