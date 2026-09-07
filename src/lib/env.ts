import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  NEXTAUTH_SECRET: z.string().min(1, "NEXTAUTH_SECRET is required"),
  NEXTAUTH_URL: z.string().url("NEXTAUTH_URL must be a valid URL"),
  MUX_TOKEN_ID: z.string().min(1, "MUX_TOKEN_ID is required"),
  MUX_TOKEN_SECRET: z.string().min(1, "MUX_TOKEN_SECRET is required"),
  MUX_WEBHOOK_SECRET: z.string().min(1, "MUX_WEBHOOK_SECRET is required"),
  MUX_SIGNING_KEY: z.string().min(1, "MUX_SIGNING_KEY is required"),
  MUX_SIGNING_PRIVATE_KEY: z.string().min(1, "MUX_SIGNING_PRIVATE_KEY is required"),
  CLOUDINARY_API_SECRET: z.string().min(1, "CLOUDINARY_API_SECRET is required"),
  PAYSTACK_SECRET_KEY: z.string().min(1, "PAYSTACK_SECRET_KEY is required"),
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required").optional(),
});

export const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error("❌ Invalid environment variables:");
  console.error(env.error.flatten().fieldErrors);
  
  // Allow local next build to bypass strict secrets check
  if (process.env.NODE_ENV === "production" && process.env.FAIL_ON_MISSING_ENV === "true") {
    throw new Error("Invalid environment variables");
  } else {
    console.warn("⚠️ Continuing despite invalid environment variables.");
  }
}
