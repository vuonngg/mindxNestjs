import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassesController } from './Infrastructure/web/classes.controller';
import { ClassesServiceProvider } from './Application/services/classes.service';
import { ClassModel, ClassSchema } from './Infrastructure/persistence/schemas/class.schema';
import { ClassesMongoDao } from './Infrastructure/persistence/class.repository';
import { ClassRepositoryAdapter } from './Adapters/class.repository.adapter';
import { ClassRepositoryTokens } from './domain/ports/class.repository.port';

@Module({
  imports: [MongooseModule.forFeature([{ name: ClassModel.name, schema: ClassSchema }])],
  controllers: [ClassesController],
  providers: [
    ClassesMongoDao,
    { provide: ClassRepositoryTokens.Repository, useClass: ClassRepositoryAdapter },
    ClassesServiceProvider,
  ],
})
export class ClassesModule {}

