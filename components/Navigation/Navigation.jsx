import { Header, TopNav, NavLink, Title } from "./styles";

export default function Navigation() {
  return (
    <Header>
      <TopNav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/myplants">My Plants</NavLink>
        <NavLink href="/plant-of-the-day">Plant of the Day</NavLink>
      </TopNav>
      <Title>Leafy</Title>
    </Header>
  );
}
