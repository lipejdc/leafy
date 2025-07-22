import useSWR from "swr";
import { useRouter } from "next/router";
import Image from "next/image";

export default function DetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const fetcher = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      const error = new Error("Fetch error");
      error.status = res.status;
      throw error;
    }
    return res.json();
  };
  const {
    data: plant,
    error,
    isLoading,
  } = useSWR(id ? `/api/plants/${id}` : null, fetcher);

  if (isLoading) return <h2>Loading ..</h2>;
  if (error) return <h2> Error loading plant. Please try again later.</h2>;
  if (!plant) return <h2>Unfortunately no Plant found. </h2>;

  return (
    <>
      <div style={{ position: "relative", width: "100%", height: "400px" }}>
        <Image
          src={plant.imageUrl}
          alt={plant.name || "Plant Image"}
          fill
          style={{ objectFit: "cover" }}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <h2>{plant.name}</h2>
      <h3>{plant.botanicalName}</h3>
      <p>{plant.description}</p>
      <p>Fertiliser Season: {plant.fertiliserSeason}</p>
      <p>Water Needs: {plant.waterNeed}</p>
      <p>Light Needs: {plant.lightNeed}</p>
    </>
  );
}
