"use server";
import { signIn, signOut } from "@/auth";
import db from "@/drizzle";
import { users } from "@/drizzle/schema";

// import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { LoginSchema, SignUpSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/token";
import { redirect } from "next/navigation";
import { sendVerificationEmail } from "@/lib/mail";

export const loginWithGithub = async () => {
  await signIn("github", { redirectTo: "/dashboard" });
};

export const loginWithGoogle = async () => {
  await signIn("google", { redirectTo: "/dashboard" });
};

export const handleLogin = async (values: z.infer<typeof LoginSchema>) => {
  const validatedField = LoginSchema.safeParse(values);

  if (!validatedField.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedField.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.hashedPassword) {
    return { error: "Email does not exist" };
  }

  // Check if email is verified; return error if not
  if (!existingUser.emailVerified) {
    return {
      error: "Email not verified. Please verify your email before logging in.",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "An error occurred" };
      }
    }
    throw error;
  }
  return { success: "Logged in" };
};

export const handleSignUp = async (values: z.infer<typeof SignUpSchema>) => {
  const validatedField = SignUpSchema.safeParse(values);
  if (!validatedField.success) {
    return { error: "Invalid fields" };
  }
  const { name, email, password } = validatedField.data;

  const exisitingUser = await getUserByEmail(email);

  if (exisitingUser) {
    return { error: "Email alread in use!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.insert(users).values({
    name,
    email,
    hashedPassword: hashedPassword,
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(
    verificationToken[0]?.email,
    verificationToken[0]?.token
  );

  // redirect("/login");

  return { success: "Verification email sent" };
};

export const handleLogout = async () => {
  await signOut();
  redirect("/");
};
