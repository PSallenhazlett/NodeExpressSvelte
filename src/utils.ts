import { Express } from "express";
import { CarController } from "./controllers/car.controller";
import { UserController } from "./controllers/user.controller";

export const registerControllers = (app: Express) => {
  const controllers = [
    new CarController(app),
    new UserController(app),
  ];

  controllers.forEach(c => c.register());
}