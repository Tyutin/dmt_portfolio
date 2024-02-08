import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('profile')
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  registerAt: Date;
}
