
export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface User {
  id: string;
  username: string;
  passwordHash: string; // In a real app, this would be a hash
  role: Role;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
  responsiblePerson: string;
  previousBalance: number;
}

export interface Transaction {
  id: string;
  customerId: string;
  date: string;
  purchases: number;
  payments: number;
  notes: string;
}
