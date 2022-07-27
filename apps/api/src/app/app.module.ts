import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TasksModule } from '../tasks/tasks.module';
import { AppController } from './app.controller';

@Module({
  imports: [PrismaModule, TasksModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
