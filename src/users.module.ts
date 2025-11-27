import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './Infrastructure/web/users.controller';
import { UsersService } from './Application/services/users.service';
import { UsersMongoDao } from './Infrastructure/persistence/users.repository';
import { UserRepositoryAdapter } from './Adapters/user.repository.adapter';
import { UserRepositoryTokens } from './domain/ports/user.repository.port';
import { UserServiceTokens } from './Application/dtos/user.dto';
import { UserModel, UserSchema } from './Infrastructure/persistence/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [
    // DAO thuần làm việc với Mongo
    UsersMongoDao,
    // Adapter implement Port, dùng DAO phía trên
    { provide: UserRepositoryTokens.Repository, useClass: UserRepositoryAdapter },
    // Application service
    { provide: UserServiceTokens.Service, useClass: UsersService },
  ],
})
export class UsersModule {}

