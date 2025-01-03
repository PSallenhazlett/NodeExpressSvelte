import { DTOBase } from "./base.dto";
import { UserDTO } from "./user.dto";

export interface CarDTO extends DTOBase {
  make: string;
  model: string;
  year: number;
  color?: string;
  createdById?: number;
  createdBy?: UserDTO;
}
