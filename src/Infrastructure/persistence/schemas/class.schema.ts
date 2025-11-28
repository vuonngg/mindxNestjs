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
  location!: string;

  @Prop({ type: String, trim: true, default: null })
  teacher!: string | null;

  @Prop({ required: true, min: 0, default: 0 })
  studentCount!: number;

  @Prop({ type: Number, min: 0, max: 23, default: null })
  fromHour!: number | null;

  @Prop({ type: Number, min: 0, max: 23, default: null })
  toHour!: number | null;

  @Prop({ required: true })
  startAt!: Date;

  @Prop({ required: true })
  closeAt!: Date;

  @Prop({ required: true, enum: Object.values(ClassStatus) })
  status!: ClassStatus;
}

export type ClassDocument = HydratedDocument<ClassModel>;
export const ClassSchema = SchemaFactory.createForClass(ClassModel);

