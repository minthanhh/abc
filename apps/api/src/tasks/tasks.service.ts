import { Injectable } from '@nestjs/common';
import { Prisma, Task } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.prisma.task.create({ data: createTaskDto });
  }

  findAll(where: Pick<Prisma.TaskWhereInput, 'completed'>): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: { ...where },
      orderBy: {
        title: 'asc',
      },
    });
  }

  findOne(id: string): Promise<Task> {
    return this.prisma.task.findUniqueOrThrow({ where: { id } });
  }

  async update(id: string, updateArticleDto: UpdateTaskDto): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  async remove(id: string): Promise<Task> {
    return this.prisma.task.delete({ where: { id } });
  }
}
