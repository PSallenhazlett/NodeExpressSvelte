import { User } from "@prisma/client";
import { BaseRepository } from "./base.repository";

export class UserRepository extends BaseRepository<User> {
  public getAll = async (): Promise<User[] | null> => {
    try {
      await this.client.$connect();

      const users = await this.client.user.findMany();
      await this.client.$disconnect();

      return users;
    } catch (e: any) {
      console.error(e);
      return null;
    }
  }

  public getSingle = async (id: number): Promise<User | null> => {
    try {
      await this.client.$connect();

      const user = await this.client.user.findFirst({
        where: {
          id: id
        }
      });

      await this.client.$disconnect();

      return user;
    } catch (e: any) {
      console.error(e);
      return null;
    }
  }

  public create = async (user: User): Promise<User | null> => {
    try {
      await this.client.$connect();

      const newUser = await this.client.user.create({
        data: user
      });
      await this.client.$disconnect();

      return newUser;
    } catch (e: any) {
      console.error(e);
      return null;
    }
  }

  public update = async (user: User): Promise<User | null> => {
    try{
      await this.client.$connect();

      const updatedUser = await this.client.user.update({
        data: user,
        where: {
          id: user.id
        }
      });
      await this.client.$disconnect();

      return updatedUser;
    } catch (e: any) {
      console.error(e);
      return null;
    }
  }

  public delete = async (id: number): Promise<boolean> => {
    try {
      await this.client.$connect();

      const deletedUser = await this.client.user.delete({
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

  public getByEmail = async (email: string): Promise<User | null> => {
    try {
      await this.client.$connect();

      const user = await this.client.user.findFirst({
        where: {
          email: email
        }
      });

      await this.client.$disconnect();

      return user;
    } catch (e: any) {
      console.error(e);
      return null;
    }
  }
}