import db from "@/drizzle";
import { eq } from "drizzle-orm";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: (user) => eq(user.email, email),
    });

    return user;
  } catch {
    return null;
  }
};
export const getUserById = async (id: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: (user) => eq(user.id, id),
    });
    return user;
  } catch {
    return null;
  }
};
