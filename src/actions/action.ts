"use server";
import bcrypt from "bcryptjs";
import db from "@/drizzle";
import { eq } from "drizzle-orm";

export const tryOn = async () => {
  console.log("Trying on clothe");
};

export const saltAndHashPassword = async (password: string) => {
  const hashPassword = await bcrypt.hash(password, 10);
  return hashPassword;
};

export const getUserFromDb = async (email: string) => {
  const user = db.query.users.findFirst({
    where: (user) => eq(user.email, email),
    columns: {
      id: true,
      email: true,
      hashedPassword: true, // Ensure this is included!
    },
  });
  return user;
};
