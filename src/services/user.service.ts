import { User } from "@prisma/client";
import { BaseService } from "./base.service";
import { UserDTO } from "../dtos/user.dto";
import { UserRepository } from "../repository/user.repository";
import { LoginDTO } from "../dtos/login.dto";
import bcrypt from 'bcrypt';

export class UserService extends BaseService<User, UserDTO> {
  repository: UserRepository = new UserRepository();

  public mapModelToDTO = (model: User): UserDTO => {
    const name: string | undefined = model.name === null 
      ? undefined 
      : model.name;

    return {
      id: model.id,
      email: model.email,
      name: name
    };
  }

  mapDTOToModel = (dto: UserDTO): User => {
    const name: string | null = dto.name === undefined 
        ? null 
        : dto.name;

    return {
      id: dto.id ?? 0,
      email: dto.email,
      name: name,
      password: dto.password ?? "",
    };
  }

  public async login(dto: LoginDTO): Promise<boolean> {
    const user = await this.repository.getByEmail(dto.email);

    if (user == null) {
      return false;
    }

    return await bcrypt.compare(dto.password, user.password)
  }
}