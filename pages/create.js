import Form from "@/components/Form/Form";
import { useRouter } from "next/router";
import { mutate } from "swr";
import { toast } from "sonner";
import styled from "styled-components";

const Heading = styled.h1`
  text-align: center;
  margin: 1rem 0;
`;

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
      await mutate("/api/plants");

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
      <Heading>Add a plant</Heading>
      <Form onSubmit={addPlant} />
    </>
  );
}
