import { Class } from '../entities/Class';

export interface ClassUpdatePayload {
  name?: string;
  teacher?: string;
  startAt?: Date;
  closeAt?: Date;
  status?: string;
  studentCount?: number;
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

