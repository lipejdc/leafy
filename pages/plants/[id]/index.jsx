import useSWR from "swr";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

export default function DetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: plant,
    error,
    isLoading,
  } = useSWR(id ? `/api/plants/${id}` : null);

  if (!id) return <h2>Please select a plant.</h2>;
  if (isLoading) return <h2>Loading ..</h2>;
  if (error) return <h2> Error loading plant.</h2>;
  if (!plant && !isLoading && !error)
    return <h2>Unfortunately no Plant found. </h2>;

  return (
    <>
      <Link href="/">← Back to Plant Collection</Link>

      <div>
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
