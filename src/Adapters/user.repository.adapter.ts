import { Injectable } from '@nestjs/common';
import { IUserRepositoryPort } from '../domain/ports/user.repository.port';
import { User } from '../domain/entities/User';
import { UsersMongoDao } from '../Infrastructure/persistence/users.repository';
import type { UserDocument } from '../Infrastructure/persistence/schemas/user.schema';


@Injectable()
export class UserRepositoryAdapter implements IUserRepositoryPort {
  constructor(private readonly usersDao: UsersMongoDao) {}

  async findAll(): Promise<User[]> {
    const docs = await this.usersDao.findAll();
    return docs.map((doc) => this.toDomain(doc));
  }

  async findById(id: number): Promise<User | null> {
    const doc = await this.usersDao.findById(id);
    return doc ? this.toDomain(doc) : null;
  }

  async create(user: User): Promise<User> {
    const created = await this.usersDao.create({
      name: user.name,
      age: user.age,
      gender: user.gender,
    });
    return this.toDomain(created);
  }

  async update(
    id: number,
    updatedFields: Partial<Pick<User, 'name' | 'age' | 'gender'>>,
  ): Promise<User | null> {
    const doc = await this.usersDao.update(id, {
      name: updatedFields.name,
      age: updatedFields.age,
      gender: updatedFields.gender,
    });
    return doc ? this.toDomain(doc) : null;
  }

  async delete(id: number): Promise<boolean> {
    return this.usersDao.delete(id);
  }

  private toDomain(doc: UserDocument): User {
    return User.reconstitute(doc.userId, doc.name, doc.age, doc.gender);
  }
}


