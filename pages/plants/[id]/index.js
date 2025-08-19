import useSWR from "swr";
import { useRouter } from "next/router";
import DetailCard from "@/components/DetailCard/DetailCard";
import styled from "styled-components";

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ActionButton = styled.button`
  background: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: var(--color-accent);
    color: var(--color-text);
  }
`;

export default function PlantDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { data: plant, error } = useSWR(id ? `/api/plants/${id}` : null);

  if (error) return <div>Error loading plant.</div>;
  if (!plant) return <div>Loading...</div>;

  async function deletePlant() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this plant?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/plants/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete plant");
      }

      alert("Plant deleted successfully!");
      router.push("/");
    } catch (error) {
      console.error("Error deleting plant:", error);
      alert("Could not delete the plant. Please try again.");
    }
  }

  return (
    <main>
      <button type="button" onClick={() => router.back()}>
        ←
      </button>

      <DetailCard plant={plant} />

      <ButtonGroup>
        <ActionButton type="button" onClick={() => router.push(`/plants/${id}/edit`)}>
          Edit
        </ActionButton>

        <ActionButton onClick={deletePlant}>Delete</ActionButton>
      </ButtonGroup>
    </main>
  );
}
