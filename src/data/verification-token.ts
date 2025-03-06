import db from "@/drizzle";
import { eq } from "drizzle-orm";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.query.verificationTokens.findFirst({
      where: (verificationToken) => eq(verificationToken.email, email),
    });

    return verificationToken;
  } catch {
    return null;
  }
};
export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.query.verificationTokens.findFirst({
      where: (verificationToken) => eq(verificationToken.token, token),
    });

    return verificationToken;
  } catch {
    return null;
  }
};
