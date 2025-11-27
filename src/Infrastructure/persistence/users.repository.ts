import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, UserModel } from './schemas/user.schema';


@Injectable()
export class UsersMongoDao {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findById(userId: number): Promise<UserDocument | null> {
    return this.userModel.findOne({ userId }).exec();
  }

  async create(payload: {
    name: string;
    age: number;
    gender: string;
  }): Promise<UserDocument> {
    const nextId = await this.getNextId();
    return this.userModel.create({
      userId: nextId,
      name: payload.name,
      age: payload.age,
      gender: payload.gender,
    });
  }

  async update(
    userId: number,
    updatedFields: Partial<{ name: string; age: number; gender: string }>,
  ): Promise<UserDocument | null> {
    return this.userModel
      .findOneAndUpdate(
        { userId },
        { $set: updatedFields },
        { new: true },
      )
      .exec();
  }

  async delete(userId: number): Promise<boolean> {
    const result = await this.userModel.deleteOne({ userId }).exec();
    return result.deletedCount !== undefined && result.deletedCount > 0;
  }

  private async getNextId(): Promise<number> {
    const latest = await this.userModel.findOne().sort({ userId: -1 }).exec();
    return latest ? latest.userId + 1 : 1;
  }
}

