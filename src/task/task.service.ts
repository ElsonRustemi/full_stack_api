import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly repo: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, user: User) {
    const task = new Task();
    task.userId = user.id;

    Object.assign(task, createTaskDto);
    return await this.repo.save(task);

    // return await this.repo.insert(createTaskDto);
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
