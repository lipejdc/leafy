import * as styles from "./styles";

export default function Navigation() {
  return (
    <styles.Header>
      <styles.TopNav>
        <styles.NavLink href="/">Home</styles.NavLink>
        <styles.NavLink href="/myplants">My Plants</styles.NavLink>
      </styles.TopNav>
      <styles.Title>Leafy</styles.Title>
    </styles.Header>
  );
}
