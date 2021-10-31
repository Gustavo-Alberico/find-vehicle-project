import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { Vehicle } from './Vehicle';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ type: 'int' })
  status: number;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.reservations)
  vehicle: Vehicle;
}
