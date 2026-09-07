"use server";

import { sendContactEmail } from "@/lib/resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function submitContactForm(
  prevState: any,
  formData: FormData
) {
  try {
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    const validated = contactSchema.safeParse(rawData);
    
    if (!validated.success) {
      return {
        success: false,
        error: validated.error.issues[0].message,
      };
    }

    await sendContactEmail(validated.data);

    return {
      success: true,
      message: "Your message has been sent! I'll get back to you soon.",
    };
  } catch (error) {


    console.error("Contact form error:", error);
    return {
      success: false,
      error: "Something went wrong. Please try again later.",
    };
  }
}
