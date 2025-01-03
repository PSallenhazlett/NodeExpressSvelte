import { Car } from "@prisma/client";
import { BaseService } from "./base.service";
import { CarDTO } from "../dtos/car.dto";
import { CarRepository } from "../repository/car.repository";
import { UserService } from "./user.service";
import { UserDTO } from "../dtos/user.dto";

export class CarService extends BaseService<Car, CarDTO> {
  repository: CarRepository = new CarRepository();
  
  public mapModelToDTO = (model: Car): CarDTO => {
    const color: string | undefined = model.color === null 
      ? undefined 
      : model.color;
      
    const createdById: number | undefined = model.createdById === null 
      ? undefined 
      : model.createdById;

    return {
      id: model.id,
      make: model.make,
      model: model.model,
      year: model.year,
      color: color,
      createdById: createdById,
    };
  }

  mapDTOToModel = (dto: CarDTO): Car => {
    const color: string | null = dto.color === undefined 
      ? null 
      : dto.color;
      
    const createdById: number | null = dto.createdById === undefined 
      ? null 
      : dto.createdById;

    return {
      id: dto.id ?? 0,
      make: dto.make,
      model: dto.model,
      year: dto.year,
      color: color,
      createdById: createdById,
    };
  }

  postGetAllLogic = async (cars: CarDTO[]): Promise<CarDTO[]> => {
    for (const car of cars) {
      if (car.createdById) {
        const createdBy: UserDTO | null = await new UserService().getSingle(car.createdById);
        
        if (createdBy) {
          car.createdBy = createdBy;
        }
      }
    }

    return cars;
  }

  postGetLogic = async (car: CarDTO): Promise<CarDTO> => {
    if (car.createdById) {
      const createdBy: UserDTO | null = await new UserService().getSingle(car.createdById);
      
      if (createdBy) {
        car.createdBy = createdBy;
      }
    }

    return car;
  }

  getForUser = async (id: number): Promise<CarDTO[] | null> => {
    const cars = await this.repository.getAll();

    if (!cars) {
      return null;
    }

    const dtos = cars.filter(c => c.createdById == id);
    return dtos.map(this.mapModelToDTO);
  }
}