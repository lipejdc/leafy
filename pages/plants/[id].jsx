import useSWR from "swr";
import { useRouter } from "next/router";
import Image from "next/image";
import styled from "styled-components";
import DetailCard from "@/components/DetailCard";

export default function PlantDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { data: plant, error } = useSWR(id ? `/api/plants/${id}` : null);

  if (error) return <div>Error loading plant.</div>;
  if (!plant) return <div>Loading...</div>;

  async function deletePlant() {
    try {
      const res = await fetch(`/api/plants/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete plant");
      }

      // Optionally redirect or show success message
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Error deleting plant");
    }
  }

  return (
    <main>
      <button type="button" onClick={() => router.back()}>
        ←
      </button>
      <DetailCard plant={plant} />

      <button onClick={deletePlant}> delete Plant</button>
    </main>
  );
}
