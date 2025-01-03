import { Express, Request, Response } from "express";
import { ControllerBase } from "./base.controller";
import { UserService } from "../services/user.service";
import { User } from "@prisma/client";
import { UserDTO } from "../dtos/user.dto";
import { LoginDTO } from "../dtos/login.dto";
import { CarService } from "../services/car.service";

export class UserController extends ControllerBase<User, UserDTO> {
  path = "User";
  service: UserService;

  constructor(app: Express) {
    super(app);
    this.service = new UserService();

    this.login = this.login.bind(this);
    this.carsForUser = this.carsForUser.bind(this);
  }

  public async login(req: Request, res: Response) {
    const dto = req.body as LoginDTO;
    const loginSuccess = await this.service.login(dto);

    this.setCORSHeaders(res);

    if (loginSuccess) {
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  }

  public async carsForUser(req: Request, res: Response) {
    const id = Number(req.params["id"]);
    
    this.setCORSHeaders(res);

    const cars = await new CarService().getForUser(id);

    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(cars));
  }

  public register(): void {
    super.register();

    this.app.post(`/${this.path}/login`, this.login);
    this.app.get(`/${this.path}/:id/cars`, this.carsForUser);
  }
}