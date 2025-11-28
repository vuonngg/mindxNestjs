import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import type {
  CreateClassDTO,
  IClassesService,
  UpdateClassDTO,
} from '../../Application/dtos/class.dto';
import { ClassServiceTokens } from '../../Application/dtos/class.dto';
@Controller('/api/classes')
export class ClassesController {
  constructor(
    @Inject(ClassServiceTokens.Service)
    private readonly classesService: IClassesService,
  ) {}

  @Get()
  getAll() {
    return this.classesService.getAllClasses();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.classesService.getClassById(+id);
  }

  @Post()
  create(@Body() dto: CreateClassDTO) {
    return this.classesService.createClass(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateClassDTO) {
    return this.classesService.updateClass(+id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.classesService.deleteClass(+id);
  }

  @Post(':id/request-open')
  requestOpen(@Param('id') id: string) {
    return this.classesService.requestOpen(+id);
  }

  @Post(':id/approve-open')
  approveOpen(@Param('id') id: string) {
    return this.classesService.approveOpen(+id);
  }

  @Post(':id/pause')
  pause(@Param('id') id: string) {
    return this.classesService.pauseClass(+id);
  }

  @Post(':id/resume')
  resume(@Param('id') id: string) {
    return this.classesService.resumeClass(+id);
  }

  @Post(':id/finish')
  finish(@Param('id') id: string) {
    return this.classesService.finishClass(+id);
  }
}

