import { Injectable } from '@nestjs/common';
import { Class, ClassStatus } from '../domain/entities/Class';
import {
  ClassUpdatePayload,
  IClassRepositoryPort,
} from '../domain/ports/class.repository.port';
import { ClassesMongoDao } from '../Infrastructure/persistence/class.repository';
import { ClassDocument } from '../Infrastructure/persistence/schemas/class.schema';

@Injectable()
export class ClassRepositoryAdapter implements IClassRepositoryPort {
  constructor(private readonly classDao: ClassesMongoDao) {}

  async findAll(): Promise<Class[]> {
    const docs = await this.classDao.findAll();
    return docs.map(doc => this.toDomain(doc));
  }

  async findById(id: number): Promise<Class | null> {
    const doc = await this.classDao.findById(id);
    return doc ? this.toDomain(doc) : null;
  }

  async create(classEntity: Class): Promise<Class> {
    const created = await this.classDao.create({
      name: classEntity.name,
      location: classEntity.location,
      teacher: classEntity.teacher,
      studentCount: classEntity.studentCount,
      fromHour: classEntity.fromHour,
      toHour: classEntity.toHour,
      startAt: classEntity.startAt,
      closeAt: classEntity.closeAt,
      status: classEntity.status,
    });
    return this.toDomain(created);
  }

  async update(id: number, updatedFields: ClassUpdatePayload): Promise<Class | null> {
    const doc = await this.classDao.update(id, {
      name: updatedFields.name,
      location: updatedFields.location,
      teacher: updatedFields.teacher,
      startAt: updatedFields.startAt,
      closeAt: updatedFields.closeAt,
      status: updatedFields.status,
      studentCount: updatedFields.studentCount,
      fromHour: updatedFields.fromHour ?? null,
      toHour: updatedFields.toHour ?? null,
    });
    return doc ? this.toDomain(doc) : null;
  }

  async delete(id: number): Promise<boolean> {
    return this.classDao.delete(id);
  }

  private toDomain(doc: ClassDocument): Class {
    return Class.reconstitute({
      id: doc.classId,
      name: doc.name,
      location: doc.location,
      teacher: doc.teacher ?? null,
      studentCount: doc.studentCount,
      fromHour: doc.fromHour ?? null,
      toHour: doc.toHour ?? null,
      startAt: doc.startAt,
      closeAt: doc.closeAt,
      status: doc.status as ClassStatus,
    });
  }
}