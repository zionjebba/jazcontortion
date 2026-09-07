import { Resend } from "resend";
import { ReceiptEmail } from "@/emails/ReceiptEmail";
import { WelcomeEmail } from "@/emails/WelcomeEmail";
import { ContactEmail } from "@/emails/ContactEmail";
import { render } from "@react-email/components";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendReceiptEmail(
  to: string,
  data: { userName?: string; programTitle: string; amount: number; currency: string; accessUrl: string }
) {
  if (!resend) {
    console.warn("RESEND_API_KEY is missing. Skipping receipt email to:", to);
    return;
  }

  try {
    const html = await render(ReceiptEmail(data));

    await resend.emails.send({
      from: "Jaz Contortion <hello@jazcontortion.com>",
      to,
      subject: `Your receipt for ${data.programTitle}`,
      html,
    });
  } catch (error) {
    console.error("Failed to send receipt email:", error);
  }
}

export async function   sendWelcomeEmail(to: string, data: { userName?: string; loginUrl: string }) {
  if (!resend) {
    console.warn("RESEND_API_KEY is missing. Skipping welcome email to:", to);
    return;
  }

  try {
    const html = await render(WelcomeEmail(data));

    await resend.emails.send({
      from: "Jaz Contortion <hello@jazcontortion.com>",
      to,
      subject: "Welcome to Jaz Contortion!",
      html,
    });
  } catch (error) {
    console.error("Failed to send welcome email:", error);
  }
}

export async function sendContactEmail(data: { name: string; email: string; subject: string; message: string }) {
  if (!resend) {
    console.warn("RESEND_API_KEY is missing. Skipping contact email from:", data.email);
    return;
  }

  try {
    const html = await render(ContactEmail(data));

    await resend.emails.send({
      from: "Jaz Contortion <hello@jazcontortion.com>",
      to: "zionjebba@gmail.com",
      replyTo: data.email,
      subject: `New Contact Form: ${data.subject}`,
      html,
    });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    throw new Error("Failed to send message");
  }
}
