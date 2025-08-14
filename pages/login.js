import styled from "styled-components";
import { signIn } from "next-auth/react";
import { LogIn } from "lucide-react";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
`;

const LoginButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
`;

export default function LoginPage() {
  return (
    <Container>
      <h1>Sign in</h1>
      <LoginButton onClick={() => signIn("google", { callbackUrl: "/" })}>
        <LogIn size={20} /> Sign in with Google
      </LoginButton>
    </Container>
  );
}
