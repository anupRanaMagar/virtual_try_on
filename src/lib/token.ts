import db from "@/drizzle";
import { verificationTokens } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { v4 as uuid } from "uuid";
export const generateVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 1000 * 60 * 60); // 24 hours

  const existingToken = await db.query.verificationTokens.findFirst({
    where: (token) => eq(token.email, email),
  });
  if (existingToken) {
    await db
      .delete(verificationTokens)
      .where(eq(verificationTokens.id, existingToken.id));
  }

  const verificationToken = await db
    .insert(verificationTokens)
    .values({
      email,
      token,
      expires,
    })
    .returning({
      email: verificationTokens.email,
      token: verificationTokens.token,
    });
  return verificationToken;
};
