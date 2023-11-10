import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly repo: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    return await this.repo.insert(createTaskDto);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    const task = await this.repo.findOne({ where: { id: id } });
    if (!task) {
      throw new BadRequestException('Task not found');
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return await this.repo.update(id, updateTaskDto);
  }

  async remove(id: number) {
    return await this.repo.delete(id);
  }
}
