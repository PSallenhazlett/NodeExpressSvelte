import type { ModelBase } from "./base.model";

export interface User extends ModelBase {
  email: string;
  name?: string;
  password?: string;
}