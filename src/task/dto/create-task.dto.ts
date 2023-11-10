import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  taskSubject: string;
  @IsNotEmpty()
  @IsString()
  taskPriority: string;
  @IsNotEmpty()
  @IsString()
  department: string;
  @IsNotEmpty()
  @IsString()
  assignedTo: string;
  @IsNotEmpty()
  @IsString()
  taskStatus: string;
}
