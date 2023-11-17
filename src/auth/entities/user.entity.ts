import { Task } from 'src/task/entities/task.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bycrypt from 'bcryptjs';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstname: string;
  @Column()
  lastname: string;
  @Column()
  email: string;
  @Column({ select: false })
  password: string;
  @OneToMany(() => Task, (task: Task) => task.user)
  tasks: Task[];

  @BeforeInsert()
  hashPassword() {
    this.password = bycrypt.hashSync(this.password, 10);
  }
}
