import { Header, TopNav, NavLink, Title } from "./styles";
import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";
import { LogIn, LogOut } from "lucide-react";

const AuthButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;

  background: ${(props) => (props.signout ? "#e53935" : "")};
`;

export default function Navigation() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  return (
    <Header>
      <TopNav>
        <NavLink href="/">Home</NavLink>
        {session && <NavLink href="/myplants">My Plants</NavLink>}
        <NavLink href="/plant-of-the-day">Plant of the Day</NavLink>

        {!isLoading && !session && (
          <AuthButton onClick={() => signIn("google")}>
            <LogIn size={18} /> Sign In
          </AuthButton>
        )}

        {!isLoading && session && (
          <AuthButton $signout onClick={() => signOut({ callbackUrl: "/" })}>
            <LogOut size={18} /> Sign Out
          </AuthButton>
        )}

        {isLoading && <p>Checking session...</p>}
      </TopNav>
      <Title>Leafy</Title>
    </Header>
  );
}
