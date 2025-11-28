import { Class } from '../entities/Class';

export interface ClassUpdatePayload {
  name?: string;
  location?: string;
  teacher?: string | null;
  startAt?: Date;
  closeAt?: Date;
  status?: string;
  studentCount?: number;
  fromHour?: number | null;
  toHour?: number | null;
}

export interface IClassRepositoryPort {
  findAll(): Promise<Class[]>;
  findById(id: number): Promise<Class | null>;
  create(classEntity: Class): Promise<Class>;
  update(id: number, updatedFields: ClassUpdatePayload): Promise<Class | null>;
  delete(id: number): Promise<boolean>;
}

export enum ClassRepositoryTokens {
  Repository = 'CLASS_REPOSITORY_PORT',
}

