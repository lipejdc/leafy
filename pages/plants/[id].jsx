import useSWR from "swr";
import { useRouter } from "next/router";
import Image from "next/image";
import styled from "styled-components";
import DetailCard from "@/components/DetailCard";

export default function PlantDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { data: plant, error } = useSWR(
    id ? `/api/plants/${id}` : null
  );

  if (error) return <div>Error loading plant.</div>;
  if (!plant) return <div>Loading...</div>;

  return (
    <main>
      <button type="button" onClick={() => router.back()}>
        ←
      </button>
      <DetailCard plant={plant} />
    </main>
  );
}
