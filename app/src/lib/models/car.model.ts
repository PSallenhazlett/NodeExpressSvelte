import type { ModelBase } from "./base.model";
import type { User } from "./user.model";

export interface Car extends ModelBase {
  make: string;
  model: string;
  year: number;
  color?: string;
  createdById?: number;
  createdBy?: User;
}
