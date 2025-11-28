import { ClassStatus } from '../../domain/entities/Class';

export enum ClassServiceTokens {
  Service = 'CLASS_SERVICE',
}

export interface CreateClassDTO {
  name: string;
  location: string;
  startAt: string | Date;
  closeAt: string | Date;
}

export interface UpdateClassDTO {
  name?: string;
  location?: string;
  startAt?: string | Date;
  closeAt?: string | Date;
}

export interface UpdateScheduleDTO {
  fromHour: number;
  toHour: number;
}

export interface UpdateStudentCountDTO {
  studentCount: number;
}

export interface AssignTeacherDTO {
  teacher: string;
}

export interface ClassResponseDTO {
  id: number;
  name: string;
  location: string;
  teacher: string | null;
  studentCount: number;
  startAt: Date;
  closeAt: Date;
  fromHour: number | null;
  toHour: number | null;
  status: ClassStatus;
}

export interface IClassesService {
  getAllClasses(): Promise<ClassResponseDTO[]>;
  getClassById(id: number): Promise<ClassResponseDTO>;
  createClass(dto: CreateClassDTO): Promise<ClassResponseDTO>;
  updateClass(id: number, dto: UpdateClassDTO): Promise<ClassResponseDTO>;
  deleteClass(id: number): Promise<void>;
  updateSchedule(id: number, dto: UpdateScheduleDTO): Promise<ClassResponseDTO>;
  updateStudentCount(id: number, dto: UpdateStudentCountDTO): Promise<ClassResponseDTO>;
  assignTeacher(id: number, dto: AssignTeacherDTO): Promise<ClassResponseDTO>;
  approveShortage(id: number): Promise<ClassResponseDTO>;
}

