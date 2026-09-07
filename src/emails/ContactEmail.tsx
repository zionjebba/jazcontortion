import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
} from "@react-email/components";

interface ContactEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const ContactEmail = ({
  name,
  email,
  subject,
  message,
}: ContactEmailProps) => (
  <Html>
    <Head />
    <Preview>New Contact Form Submission: {subject}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New Message from {name}</Heading>
        <Text style={text}>
          <strong>Email:</strong> {email}
        </Text>
        <Text style={text}>
          <strong>Subject:</strong> {subject}
        </Text>
        <div style={messageBox}>
          <Text style={text}>{message}</Text>
        </div>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#f4f4f5",
  fontFamily: "sans-serif",
  padding: "40px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #e4e4e7",
  borderRadius: "12px",
  padding: "40px",
  margin: "0 auto",
  maxWidth: "600px",
};

const h1 = {
  color: "#18181b",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0 0 20px 0",
};

const text = {
  color: "#3f3f46",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 10px 0",
};

const messageBox = {
  marginTop: "24px",
  padding: "16px",
  backgroundColor: "#f4f4f5",
  borderRadius: "8px",
  borderLeft: "4px solid #ff5a1f",
};
