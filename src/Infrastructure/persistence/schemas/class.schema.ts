import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ClassStatus } from '../../../domain/entities/Class';

@Schema({ collection: 'classes', timestamps: true })
export class ClassModel {
  @Prop({ required: true, unique: true, index: true })
  classId!: number;

  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ required: true, trim: true })
  teacher!: string;

  @Prop({ required: true, min: 0 })
  studentCount!: number;

  @Prop({ required: true })
  startAt!: Date;

  @Prop({ required: true })
  closeAt!: Date;

  @Prop({ required: true, enum: Object.values(ClassStatus) })
  status!: ClassStatus;
}

export type ClassDocument = HydratedDocument<ClassModel>;
export const ClassSchema = SchemaFactory.createForClass(ClassModel);

