import prisma from "../utils/prisma";
import { ParkingSpot } from "../types";

export const getAllParkingSpots = async (): Promise<ParkingSpot[]> => {
   try {
      const spots = await prisma.parkingSpot.findMany({
         orderBy: { createdAt: "desc" },
      });

      return spots.map((spot) => ({
         ...spot,
         pricePerHour: spot.pricePerHour.toNumber(),
      }));
   } catch (error) {
      if (error instanceof Error) {
         throw new Error(`Error fetching parking spots: ${error.message}`);
      }
      throw new Error(`Error fetching parking spots`);
   }
};

export const createParkingSpot = async (
   data: Omit<ParkingSpot, "id" | "createdAt" | "updatedAt">
): Promise<ParkingSpot> => {
   try {
      const spot = await prisma.parkingSpot.create({
         data,
      });

      return {
         ...spot,
         pricePerHour: spot.pricePerHour.toNumber(),
      };
   } catch (error) {
      if (error instanceof Error) {
         throw new Error(`Error creating parking spot: ${error.message}`);
      }
      throw new Error(`Error creating parking spot`);
   }
};

export const updateParkingSpotStatus = async (
   id: string,
   isActive: boolean
): Promise<ParkingSpot> => {
   try {
      const spot = await prisma.parkingSpot.update({
         where: { id },
         data: { isActive },
      });

      return {
         ...spot,
         pricePerHour: spot.pricePerHour.toNumber(),
      };
   } catch (error) {
      if (error instanceof Error) {
         throw new Error(
            `Error updating parking spot status: ${error.message}`
         );
      }
      throw new Error(`Error updating parking spot status`);
   }
};

export const deleteParkingSpot = async (id: string): Promise<void> => {
   try {
      await prisma.parkingSpot.delete({
         where: { id },
      });
   } catch (error) {
      if (error instanceof Error) {
         throw new Error(`Error deleting parking spot: ${error.message}`);
      }
      throw new Error(`Error deleting parking spot`);
   }
};
