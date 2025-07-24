import useSWR from "swr";
import { useRouter } from "next/router";
import DetailCard from "@/components/DetailCard";

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

      // Optionally redirect or show success message
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

      <button onClick={deletePlant}> delete Plant</button>
    </main>
  );
}
