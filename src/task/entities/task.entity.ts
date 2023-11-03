import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
