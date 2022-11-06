import type { DocumentData } from "firebase/firestore";

export interface User {
  name: string;
  salary: number;
  role: string;
}

export class UserModel {
  public id: string;
  public name: string;
  public salary: number;
  public role: string;

  constructor(id: string, name: string, salary: number, role: string) {
    this.id = id;
    this.name = name;
    this.salary = salary;
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
