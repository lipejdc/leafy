import Link from "next/link";
import styled from "styled-components";

const Header = styled.header`
  background-image: linear-gradient(
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
    ),
    url("https://images.pexels.com/photos/4503268/pexels-photo-4503268.jpeg");
  background-size: cover;
  background-position: center;
  color: white;
  height: 30vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 2rem;
`;

const TopNav = styled.nav`
  position: absolute;
  top: 1.5rem;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: white;
  font-weight: bold;
  text-decoration: none;
  position: relative;
  padding: 0.3rem;

  &:after {
    content: "";
    position: absolute;
    height: 2px;
    width: 0%;
    left: 0;
    bottom: -3px;
    background-color: white;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  &:hover {
    color: #e0f7fa;
  }
`;

const Title = styled.h1`
  margin: 0 auto;
  font-size: 3rem;
  font-weight: 700;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
`;

export default function Navbar() {
  return (
    <Header>
      <TopNav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/myplants">My Plants</NavLink>
        {/* <NavLink href="/collection">Plant of the Day</NavLink> */}
      </TopNav>
      <Title>Leafy</Title>
    </Header>
  );
}
