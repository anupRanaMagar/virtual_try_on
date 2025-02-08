import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import db from "./drizzle";
import Credentials from "next-auth/providers/credentials";
import { getUserFromDb } from "./actions/action";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Google,
    GitHub,
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials: { email: string; password: string }) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing username or password");
        }

        // Fetch user from DB by email
        const user = await getUserFromDb(credentials.email);

        if (!user || !user.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        // Compare hashed password
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!isValidPassword) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
});
