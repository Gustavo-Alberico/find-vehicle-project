import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reservation } from './Reservation';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  model: string;

  @Column({ type: 'varchar', length: 8 })
  plate: string;

  @Column({ type: 'varchar', length: 4 })
  year: string;

  @Column({ type: 'int' })
  status: number;

  @OneToMany(() => Reservation, (reservation) => reservation.vehicle)
  reservations: Reservation[];
}
