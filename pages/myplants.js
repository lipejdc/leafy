import styled from "styled-components";
import useSWR from "swr";
import Card from "@/components/Card/Card";
import { getSession } from "next-auth/react";

const ListSection = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem 0;
  padding: 2rem;
  margin: 0;
  list-style: none;
  justify-content: space-evenly;
`;

const ListItem = styled.li`
  flex: 1 1 30rem;
  display: flex;
  justify-content: center;
`;

const Message = styled.p`
  text-align: center;
  margin-top: 2rem;
  color: #555;
`;

const Heading = styled.h2`
  padding: 1rem 2rem;
  text-align: left;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 1rem 5rem;
`;

//Server-side protection for logged-in users only
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}


export default function MyPlantsPage({ toggleOwned }) {
  //Fetch ONLY the logged-in user's owned plants
  const { data, error } = useSWR(`/api/plants`);

  if (error) {
    return <Message>Failed to load your plants. Please try again later.</Message>;
  }

  if (!data) {
    return <Message>Loading your plants...</Message>;
  }

  const ownedPlants = data.plants || [];

  return (
    <>
      <Heading>My Plants</Heading>
      {ownedPlants.length === 0 ? (
        <Message>You haven&apos;t marked any plants as owned yet.</Message>
      ) : (
        <ListSection>
          {ownedPlants.map((plant) => (
            <ListItem key={plant._id}>
              <Card plant={plant} toggleOwned={toggleOwned} />
            </ListItem>
          ))}
        </ListSection>
      )}
    </>
  );
}
