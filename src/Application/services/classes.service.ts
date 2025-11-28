import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Class } from '../../domain/entities/Class';
import { ClassRepositoryTokens } from '../../domain/ports/class.repository.port';
import type {
  IClassRepositoryPort,
  ClassUpdatePayload,
} from '../../domain/ports/class.repository.port';
import {
  AssignTeacherDTO,
  ClassResponseDTO,
  CreateClassDTO,
  UpdateClassDTO,
  UpdateScheduleDTO,
  UpdateStudentCountDTO,
  IClassesService,
  ClassServiceTokens,
} from '../dtos/class.dto';

@Injectable()
export class ClassesService implements IClassesService {
  constructor(
    @Inject(ClassRepositoryTokens.Repository)
    private readonly classRepository: IClassRepositoryPort,
  ) {}

  async getAllClasses(): Promise<ClassResponseDTO[]> {
    const classes = await this.classRepository.findAll();
    return classes.map(cls => this.toDTO(cls));
  }

  async getClassById(id: number): Promise<ClassResponseDTO> {
    const classEntity = await this.findOrThrow(id);
    return this.toDTO(classEntity);
  }

  async createClass(dto: CreateClassDTO): Promise<ClassResponseDTO> {
    const classEntity = Class.create({
      name: dto.name,
      location: dto.location,
      startAt: this.toDate(dto.startAt),
      closeAt: this.toDate(dto.closeAt),
    });
    const saved = await this.classRepository.create(classEntity);
    return this.toDTO(saved);
  }

  async updateClass(id: number, dto: UpdateClassDTO): Promise<ClassResponseDTO> {
    const classEntity = await this.findOrThrow(id);
    classEntity.updateBasicInfo({
      name: dto.name,
      location: dto.location,
      startAt: dto.startAt ? this.toDate(dto.startAt) : undefined,
      closeAt: dto.closeAt ? this.toDate(dto.closeAt) : undefined,
    });
    const updated = await this.persistEntity(classEntity);
    return this.toDTO(updated);
  }

  async deleteClass(id: number): Promise<void> {
    await this.classRepository.delete(id);
  }

  async updateSchedule(id: number, dto: UpdateScheduleDTO): Promise<ClassResponseDTO> {
    const classEntity = await this.findOrThrow(id);
    classEntity.updateSchedule(dto.fromHour, dto.toHour);
    const updated = await this.persistEntity(classEntity);
    return this.toDTO(updated);
  }

  async updateStudentCount(
    id: number,
    dto: UpdateStudentCountDTO,
  ): Promise<ClassResponseDTO> {
    const classEntity = await this.findOrThrow(id);
    classEntity.updateStudentCount(dto.studentCount);
    const updated = await this.persistEntity(classEntity);
    return this.toDTO(updated);
  }

  async assignTeacher(id: number, dto: AssignTeacherDTO): Promise<ClassResponseDTO> {
    const classEntity = await this.findOrThrow(id);
    classEntity.assignTeacher(dto.teacher);
    const updated = await this.persistEntity(classEntity);
    return this.toDTO(updated);
  }

  async approveShortage(id: number): Promise<ClassResponseDTO> {
    const classEntity = await this.findOrThrow(id);
    classEntity.approveShortage();
    const updated = await this.persistEntity(classEntity);
    return this.toDTO(updated);
  }

  private async findOrThrow(id: number): Promise<Class> {
    const classEntity = await this.classRepository.findById(id);
    if (!classEntity) {
      throw new NotFoundException(`Class with id ${id} not found`);
    }
    return classEntity;
  }

  private async persistEntity(classEntity: Class): Promise<Class> {
    const payload: ClassUpdatePayload = {
      name: classEntity.name,
      location: classEntity.location,
      teacher: classEntity.teacher,
      startAt: classEntity.startAt,
      closeAt: classEntity.closeAt,
      status: classEntity.status,
      studentCount: classEntity.studentCount,
      fromHour: classEntity.fromHour,
      toHour: classEntity.toHour,
    };
    const updated = await this.classRepository.update(classEntity.id, payload);
    if (!updated) {
      throw new NotFoundException(`Class with id ${classEntity.id} not found`);
    }
    return updated;
  }

  private toDTO(classEntity: Class): ClassResponseDTO {
    return {
      id: classEntity.id,
      name: classEntity.name,
      location: classEntity.location,
      teacher: classEntity.teacher,
      studentCount: classEntity.studentCount,
      startAt: classEntity.startAt,
      closeAt: classEntity.closeAt,
      fromHour: classEntity.fromHour,
      toHour: classEntity.toHour,
      status: classEntity.status,
    };
  }

  private toDate(value: string | Date): Date {
    if (value instanceof Date) {
      return value;
    }
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      throw new Error('Invalid date value');
    }
    return parsed;
  }
}

export const ClassesServiceProvider = {
  provide: ClassServiceTokens.Service,
  useClass: ClassesService,
};

