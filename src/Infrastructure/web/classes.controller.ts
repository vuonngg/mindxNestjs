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
  AssignTeacherDTO,
  CreateClassDTO,
  IClassesService,
  UpdateClassDTO,
  UpdateScheduleDTO,
  UpdateStudentCountDTO,
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

  @Put(':id/schedule')
  updateSchedule(@Param('id') id: string, @Body() dto: UpdateScheduleDTO) {
    return this.classesService.updateSchedule(+id, dto);
  }

  @Put(':id/student-count')
  updateStudentCount(
    @Param('id') id: string,
    @Body() dto: UpdateStudentCountDTO,
  ) {
    return this.classesService.updateStudentCount(+id, dto);
  }

  @Put(':id/teacher')
  assignTeacher(@Param('id') id: string, @Body() dto: AssignTeacherDTO) {
    return this.classesService.assignTeacher(+id, dto);
  }

  @Post(':id/approve-shortage')
  approveShortage(@Param('id') id: string) {
    return this.classesService.approveShortage(+id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.classesService.deleteClass(+id);
  }
}

