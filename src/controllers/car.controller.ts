import { Express, Request, Response } from "express";
import { ControllerBase } from "./base.controller";
import { CarDTO } from "../dtos/car.dto";
import { Car } from "@prisma/client";
import { CarService } from "../services/car.service";

export class CarController extends ControllerBase<Car, CarDTO> {
  path = "Car";
  service: CarService = new CarService();
}