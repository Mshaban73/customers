import { Role, User, Customer, Transaction } from './types.ts';

// In a real app, you would not hardcode passwords or sensitive data.
// This is for demonstration purposes. The "passwordHash" is just the plain password.
// We are keeping only the admin user to allow initial login.
export const INITIAL_USERS: User[] = [
  { id: 'user-1', username: 'احمد', passwordHash: '44492444', role: Role.ADMIN },
];

// Start with empty data for customers and transactions
export const INITIAL_CUSTOMERS: Customer[] = [];

export const INITIAL_TRANSACTIONS: Transaction[] = [];