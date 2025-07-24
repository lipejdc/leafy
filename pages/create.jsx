import Form from "@/components/Form";
import { useRouter } from "next/router";

import { toast } from "sonner";

export default function CreatePlant() {
  const router = useRouter();

  async function addPlant(plant) {
    try {
      const res = await fetch("/api/plants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(plant),
      });

      if (!res.ok) {
        throw new Error("Failed to add plant");
      }

      toast.success("Plant added successfully!"); 

      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Error adding plant");
    }
  }

  return (
    <>
      <button type="button" onClick={() => router.back()}>
        ←
      </button>
      <h1>Add a plant</h1>

      <Form onSubmit={addPlant} />
    </>
  );
}
