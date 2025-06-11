import { Request, Response } from "express";
import {
   getAllParkingSpots,
   createParkingSpot,
   updateParkingSpotStatus,
   deleteParkingSpot,
} from "../services/parking.service";
import { ApiResponse, ParkingSpot } from "../types";

export const getParkingSpotsController = async (
   req: Request,
   res: Response
): Promise<void> => {
   try {
      const spots = await getAllParkingSpots();
      res.json({
         success: true,
         data: spots,
      } as ApiResponse<ParkingSpot[]>);
   } catch (error) {
      res.status(500).json({
         success: false,
         error: error instanceof Error ? error.message : String(error),
      } as ApiResponse<null>);
   }
};

export const createParkingSpotController = async (
   req: Request,
   res: Response
): Promise<void> => {
   try {
      const { spotNumber, location, floor, isActive, pricePerHour } = req.body;
      const spot = await createParkingSpot({
         spotNumber,
         location,
         floor,
         isActive,
         pricePerHour,
      });

      res.status(201).json({
         success: true,
         data: spot,
      } as ApiResponse<ParkingSpot>);
   } catch (error) {
      res.status(400).json({
         success: false,
         error: error instanceof Error ? error.message : String(error),
      } as ApiResponse<null>);
   }
};

export const updateParkingSpotStatusController = async (
   req: Request,
   res: Response
): Promise<void> => {
   try {
      const { id } = req.params;
      const { isActive } = req.body;

      const spot = await updateParkingSpotStatus(id, isActive);

      res.json({
         success: true,
         data: spot,
      } as ApiResponse<ParkingSpot>);
   } catch (error) {
      res.status(400).json({
         success: false,
         error: error instanceof Error ? error.message : String(error),
      } as ApiResponse<null>);
   }
};

export const deleteParkingSpotController = async (
   req: Request,
   res: Response
): Promise<void> => {
   try {
      const { id } = req.params;

      await deleteParkingSpot(id);

      res.json({
         success: true,
         message: "Parking spot deleted successfully",
      } as ApiResponse<null>);
   } catch (error) {
      res.status(400).json({
         success: false,
         error: error instanceof Error ? error.message : String(error),
      } as ApiResponse<null>);
   }
};
