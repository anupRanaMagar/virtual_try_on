"use server";
import bcrypt from "bcryptjs";
import db from "@/drizzle";
import { eq } from "drizzle-orm";
import { users, verificationTokens } from "@/drizzle/schema";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { getUserByEmail } from "@/data/user";

export const tryOn = async () => {
  console.log("Trying on clothe");
};

export const saltAndHashPassword = async (password: string) => {
  const hashPassword = await bcrypt.hash(password, 10);
  return hashPassword;
};

export async function getUserFromDb(email: string, password: string) {
  try {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!existingUser) {
      return { sucess: false, message: "No account found with this email" };
    }

    if (!existingUser.hashedPassword) {
      return { sucess: false, message: "No password found for this user" };
    }

    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.hashedPassword
    );
    if (!isValidPassword) {
      return { sucess: false, message: "Incorrect password" };
    }

    return {
      sucess: true,
      data: existingUser,
    };
  } catch (error) {
    return {
      sucess: false,
      message: (error as Error).message,
    };
  }
}
// export const getUserFromDb = async (email: string) => {
//   const user = db.query.users.findFirst({
//     where: (user) => eq(user.email, email),
//     columns: {
//       id: true,
//       email: true,
//       hashedPassword: true, // Ensure this is included!
//     },
//   });
//   return user;

// export const handleTryOn = async (formData: FormData) => {
//   console.log(formData);
//   const res = await fetch("http://127.0.0.1:8000/tryon", {
//     method: "POST",
//     body: formData,
//   });
//   if (res.ok) {
//     const data = await res.json();
//     setOutputImage(data.image);
//   }
// };

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) {
    return { error: "Token not exit" };
  }
  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const exisitingUser = await getUserByEmail(existingToken.email);

  if (!exisitingUser) {
    return { error: "Email not found" };
  }
  await db
    .update(users)
    .set({ emailVerified: new Date(), email: existingToken.email })
    .where(eq(users.id, exisitingUser.id));

  await db
    .delete(verificationTokens)
    .where(eq(verificationTokens.id, existingToken.id));

  return { success: "Email verified" };
};
