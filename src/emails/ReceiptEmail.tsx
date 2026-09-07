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

interface ReceiptEmailProps {
  userName?: string;
  programTitle: string;
  amount: number;
  currency: string;
  accessUrl: string;
}

export const ReceiptEmail = ({
  userName = "there",
  programTitle = "Flexibility Masterclass",
  amount = 150,
  currency = "GHS",
  accessUrl = "https://yourdomain.com/account",
}: ReceiptEmailProps) => (
  <Html>
    <Head />
    <Preview>Your receipt for {programTitle}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Thank you for your purchase, {userName}!</Heading>
        <Text style={text}>
          Your payment of <strong>{currency} {amount}</strong> was successful. You now have full access to <strong>{programTitle}</strong>.
        </Text>
        <Text style={text}>
          Click the button below to start learning right away:
        </Text>
        <Link href={accessUrl} style={button}>
          Access My Program
        </Link>
        <Text style={footer}>
          If you have any questions about this purchase, reply to this email.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default ReceiptEmail;

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
  backgroundColor: "#f43f5e",
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
