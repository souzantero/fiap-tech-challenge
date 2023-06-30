export type Customer = {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  name: string;
  email: string;
  document: string;
};
