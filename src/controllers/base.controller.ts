
import { Express, Request, Response } from "express";
import { BaseService } from "../services/base.service";
import { DTOBase } from "../dtos/base.dto";

export abstract class ControllerBase<T, TDTO extends DTOBase> {
  public abstract path: string;
  public abstract service: BaseService<T, TDTO>;

  constructor(public app: Express) {
  }

  public setCORSHeaders(res: Response): Response {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Header", "*");
    res.header("Access-Control-Allow-Method", "*");

    return res;
  }

  protected registerDefaultMethods() {
    this.app.get(`/${this.path}`, this.getAll);
    this.app.get(`/${this.path}/:id`, this.getSingle);
    this.app.post(`/${this.path}`, this.post);
    this.app.put(`/${this.path}/:id`, this.put);
    this.app.delete(`/${this.path}/:id`, this.delete);
  }

  public register() {
    this.registerDefaultMethods();
  }
  
  public getAll = async (req: Request, res: Response) => {
    const models = await this.service.getAll();
    
    this.setCORSHeaders(res);

    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(models));
  }

  public getSingle = async (req: Request, res: Response) => {
    const id = Number(req.params["id"]);
    const model = await this.service.getSingle(id);
    
    this.setCORSHeaders(res);

    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(model));
  }

  public post = async (req: Request, res: Response) => {
    const dto: TDTO = req.body;
    var model = await this.service.create(dto);
    
    this.setCORSHeaders(res);

    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(model));
  }

  public put = async (req: Request, res: Response) => {
    const id = Number(req.params["id"]);
    const dto: TDTO = req.body;

    dto.id = id;

    var model = await this.service.update(dto);
    
    this.setCORSHeaders(res);
    
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(model));
  }

  public delete = async (req: Request, res: Response) => {
    const id = Number(req.params["id"]);

    const didDelete = await this.service.delete(id);
    
    this.setCORSHeaders(res);

    if (didDelete) {
      res.sendStatus(204);
    } else {
      res.sendStatus(400);
    }
  }
}