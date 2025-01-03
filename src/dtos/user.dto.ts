import { DTOBase } from "./base.dto";

export interface UserDTO extends DTOBase {
  email: string;
  name?: string;
  password?: string;
}