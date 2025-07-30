import { useRouter } from "next/router";
import useSWR from "swr";
import Form from "@/components/Form/Form";
import { toast } from "sonner";

export default function EditPlant() {
  const router = useRouter();
  const { id } = router.query;
  const { data: plant, error } = useSWR(id ? `/api/plants/${id}` : null);

  async function updatePlant(updatedPlant) {
    try {
      const res = await fetch(`/api/plants/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPlant),
      });
      if (!res.ok) throw new Error("Failed to update plant");
      toast.success("Plant updated successfully!");
      router.push(`/plants/${id}`);
    } catch (err) {
      toast.error("Error updating plant");
    }
  }

  if (error) return <div>Error loading plant.</div>;
  if (!plant) return <div>Loading...</div>;

  return (
    <>
      <button type="button" onClick={() => router.back()}>
        ←
      </button>
      <h1>Edit Plant</h1>
      <Form onSubmit={updatePlant} initialValues={plant} />
    </>
  );
}
