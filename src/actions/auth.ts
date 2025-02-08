"use server";
import { signIn } from "@/auth";
import db from "@/drizzle";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export const loginWithGithub = async () => {
  await signIn("github", { redirectTo: "/dashboard" });
};

export const loginWithGoogle = async () => {
  await signIn("google", { redirectTo: "/dashboard" });
};

export const handleCredentialLogin = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  await signIn("credentials", { email, password, redirectTo: "/dashboard" });
};

export const handleSignUp = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    throw new Error("Missing name, email or password");
  }

  const exisitingUser = await db.query.users.findFirst({
    where: (user) => eq(user.email, email),
  });

  if (!exisitingUser) {
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      name,
      email,
      hashedPassword: hashedPassword,
    });

    redirect("/auth/login");
  }
};
