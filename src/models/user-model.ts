import type { DocumentData } from "firebase/firestore";
import { formatCurrency } from "../utils/currency-format";

export class UserModel {
  public id: string;
  public name: string;
  public salary: string;
  public role: string;

  constructor(id: string, name: string, salary: number, role: string) {
    this.id = id;
    this.name = name;
    this.salary = formatCurrency(salary);
    this.role = role;
  }

  static fromSnapshot = (snapshot: DocumentData): UserModel => {
    const { name, salary, role } = snapshot.data();
    return new UserModel(snapshot.id, name, salary, role);
  };

  toMap = (): { [key: string]: any } => {
    return {
      name: this.name,
      salary: this.salary,
      role: this.role,
    };
  };
}
