import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";

interface WelcomeEmailProps {
  userName?: string;
  loginUrl: string;
}

export const WelcomeEmail = ({
  userName = "there",
  loginUrl = "https://yourdomain.com/login",
}: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to Jaz Contortion!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Welcome to Jaz Contortion, {userName}!</Heading>
        <Text style={text}>
          We&apos;re thrilled to have you here. Get ready to push your boundaries and unlock your flexibility.
        </Text>
        <Text style={text}>
          You can access your account and explore our programs by logging in:
        </Text>
        <Link href={loginUrl} style={button}>
          Go to My Account
        </Link>
        <Text style={footer}>
          If you have any questions, simply reply to this email. We&apos;re always here to help.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 20px",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
  textAlign: "center" as const,
};

const text = {
  color: "#555",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#f43f5e", // Rose-500 (Vibrant primary)
  borderRadius: "5px",
  color: "#fff",
  display: "block",
  fontSize: "16px",
  fontWeight: "bold",
  textAlign: "center" as const,
  textDecoration: "none",
  width: "100%",
  padding: "12px 0",
  margin: "24px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  textAlign: "center" as const,
  marginTop: "48px",
};
