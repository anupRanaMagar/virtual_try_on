import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
  await resend.emails.send({
    from: "mail@anupranamagar.com.np",
    to: email,
    subject: "Confirm your email",
    html: `
            <h1>Confirm your email</h1>
            <p>Click the link below to confirm your email</p>
            <a href="${confirmLink}">Confirm email</a>
        `,
  });
};
