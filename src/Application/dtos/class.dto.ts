import { ClassStatus } from '../../domain/entities/Class';

export enum ClassServiceTokens {
  Service = 'CLASS_SERVICE',
}

export interface CreateClassDTO {
  name: string;
  teacher: string;
  startAt: string | Date;
  closeAt: string | Date;
  studentCount?: number;
}

export interface UpdateClassDTO {
  name?: string;
  teacher?: string;
  startAt?: string | Date;
  closeAt?: string | Date;
  studentCount?: number;
}

export interface ClassResponseDTO {
  id: number;
  name: string;
  teacher: string;
  studentCount: number;
  startAt: Date;
  closeAt: Date;
  status: ClassStatus;
}

export interface IClassesService {
  getAllClasses(): Promise<ClassResponseDTO[]>;
  getClassById(id: number): Promise<ClassResponseDTO>;
  createClass(dto: CreateClassDTO): Promise<ClassResponseDTO>;
  updateClass(id: number, dto: UpdateClassDTO): Promise<ClassResponseDTO>;
  deleteClass(id: number): Promise<void>;
  requestOpen(id: number): Promise<ClassResponseDTO>;
  approveOpen(id: number): Promise<ClassResponseDTO>;
  pauseClass(id: number): Promise<ClassResponseDTO>;
  resumeClass(id: number): Promise<ClassResponseDTO>;
  finishClass(id: number): Promise<ClassResponseDTO>;
}

