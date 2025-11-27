import { User } from '../entities/User';

export interface IUserRepositoryPort {
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  create(user: User): Promise<User>;
  update(id: number, updatedFields: Partial<Pick<User, 'name' | 'age' | 'gender'>>): Promise<User | null>;
  delete(id: number): Promise<boolean>;
}

export enum UserRepositoryTokens {
  Repository = 'USER_REPOSITORY_PORT',
}

