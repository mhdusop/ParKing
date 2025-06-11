import { Router } from "express";
import {
   getParkingSpotsController,
   createParkingSpotController,
   updateParkingSpotStatusController,
   deleteParkingSpotController,
} from "../controllers/parking.controller";

const parkingRouter = Router();

parkingRouter.get("/", getParkingSpotsController);
parkingRouter.post("/", createParkingSpotController);
parkingRouter.put("/:id/status", updateParkingSpotStatusController);
parkingRouter.delete("/:id", deleteParkingSpotController);

export default parkingRouter;
