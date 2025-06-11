import { parkingService } from "@/services/parkingSpotService";
import ClientParking from "@/views/parking-spot/ClientParking";

export const dynamic = "force-dynamic";

export default async function ParkingPage() {
  const initialSpots = await parkingService.getAll();

  return <ClientParking initialSpots={initialSpots} />;
}