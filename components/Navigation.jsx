import Link from "next/link";
import styled from "styled-components";

const Header = styled.header`
  background-image: linear-gradient(
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
    ),
    url("https://images.pexels.com/photos/212324/pexels-photo-212324.jpeg");
  background-size: cover;
  background-position: center;
  color: white;
  padding: 5rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  margin: 0 0 3rem;
  font-size: 2.5rem;
  font-weight: 700;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);
`;

const Nav = styled.nav`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
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

export default function Navbar() {
  return (
    <Header>
      <Title>Leafy</Title>
      <Nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/collection">My Plants</NavLink>
        <NavLink href="/collection">Plant of the Day</NavLink>
      </Nav>
    </Header>
  );
}
