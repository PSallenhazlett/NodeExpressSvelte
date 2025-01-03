import { Car } from "@prisma/client";
import { BaseRepository } from "./base.repository";

export class CarRepository extends BaseRepository<Car> {
  public getAll = async (): Promise<Car[] | null> => {
    try {
      await this.client.$connect();

      const cars = await this.client.car.findMany();
      await this.client.$disconnect();

      return cars;
    } catch (e: any) {
      console.error(e);
      return null;
    }
  }

  public getSingle = async (id: number): Promise<Car | null> => {
    try {
      await this.client.$connect();

      const car = await this.client.car.findFirst({
        where: {
          id: id
        }
      });
      await this.client.$disconnect();

      return car;
    } catch (e: any) {
      console.error(e);
      return null;
    }
  }

  public create = async (car: Car): Promise<Car | null> => {
    try {
      await this.client.$connect();

      const newCar = await this.client.car.create({
        data: car
      });
      await this.client.$disconnect();

      return newCar;
    } catch (e: any) {
      console.error(e);
      return null;
    }
  }

  public update = async (car: Car): Promise<Car | null> => {
    try{
      await this.client.$connect();

      const updatedCar = await this.client.car.update({
        data: car,
        where: {
          id: car.id
        }
      });
      await this.client.$disconnect();

      return updatedCar;
    } catch (e: any) {
      console.error(e);
      return null;
    }
  }

  public delete = async (id: number): Promise<boolean> => {
    try {
      await this.client.$connect();

      const deletedCar = await this.client.car.delete({
        where: {
          id: id
        }
      });
      await this.client.$disconnect();

      return true;
    } catch (e: any) {
      return false
    }
  }
}