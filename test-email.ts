import { sendWelcomeEmail, sendReceiptEmail } from "./src/lib/resend";
import * as dotenv from "dotenv";

dotenv.config();

async function testEmails() {
  const email = "zionjebba@gmail.com";
  console.log(`Sending test emails to ${email}...`);

  try {
    // Test 1: Welcome Email
    await sendWelcomeEmail(email, {
      userName: "Jaz (Test)",
      loginUrl: "https://jazcontortion.vercel.app/login",
    });
    console.log("✅ Welcome Email sent successfully!");

    // Test 2: Receipt Email
    await sendReceiptEmail(email, {
      userName: "Jaz (Test)",
      programTitle: "The Flex Mastery Program",
      amount: 199.99,
      currency: "USD",
      accessUrl: "https://jazcontortion.vercel.app/account",
    });
    console.log("✅ Receipt Email sent successfully!");
    
    console.log("\nCheck your inbox at jazcontortionist@gmail.com!");
  } catch (error) {
    console.error("❌ Failed to send emails:", error);
  }
}

testEmails();
