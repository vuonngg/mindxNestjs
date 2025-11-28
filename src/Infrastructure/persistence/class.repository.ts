import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClassDocument, ClassModel } from './schemas/class.schema';

@Injectable()
export class ClassesMongoDao {
  constructor(
    @InjectModel(ClassModel.name)
    private readonly classModel: Model<ClassDocument>,
  ) {}

  async findAll(): Promise<ClassDocument[]> {
    return this.classModel.find().exec();
  }

  async findById(classId: number): Promise<ClassDocument | null> {
    return this.classModel.findOne({ classId }).exec();
  }

  async create(payload: {
    name: string;
    teacher: string;
    studentCount: number;
    startAt: Date;
    closeAt: Date;
    status: string;
  }): Promise<ClassDocument> {
    const nextId = await this.getNextId();
    return this.classModel.create({
      classId: nextId,
      ...payload,
    });
  }

  async update(
    classId: number,
    updatedFields: Partial<{
      name: string;
      teacher: string;
      startAt: Date;
      closeAt: Date;
      status: string;
      studentCount: number;
    }>,
  ): Promise<ClassDocument | null> {
    return this.classModel
      .findOneAndUpdate(
        { classId },
        { $set: updatedFields },
        { new: true },
      )
      .exec();
  }

  async delete(classId: number): Promise<boolean> {
    const result = await this.classModel.deleteOne({ classId }).exec();
    return result.deletedCount !== undefined && result.deletedCount > 0;
  }

  private async getNextId(): Promise<number> {
    const latest = await this.classModel.findOne().sort({ classId: -1 }).exec();
    return latest ? latest.classId + 1 : 1;
  }
}
