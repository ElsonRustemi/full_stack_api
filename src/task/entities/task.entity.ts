import { User } from 'src/auth/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  taskSubject: string;
  @Column()
  taskPriority: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  startDate: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  finishDate: Date;
  @Column()
  department: string;
  @Column()
  assignedTo: string;
  @Column()
  taskStatus: string;
  @Column()
  userId: number;
  @ManyToOne(() => User, (user: User) => user.tasks, { eager: true })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;
}
