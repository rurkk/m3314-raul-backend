import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DATABASE_SCHEMA } from '../../infrastructure/database/database.constants';
import { PortfolioOwnerEntity } from './portfolio-owner.entity';

@Entity({ schema: DATABASE_SCHEMA, name: 'owner_profiles' })
export class OwnerProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'owner_id', type: 'int', unique: true })
  ownerId: number;

  @Column({ type: 'varchar', length: 160 })
  headline: string;

  @Column({ type: 'text', nullable: true })
  bio: string | null;

  @Column({ type: 'varchar', length: 120, nullable: true })
  city: string | null;

  @Column({ name: 'avatar_url', type: 'varchar', length: 255, nullable: true })
  avatarUrl: string | null;

  @OneToOne(() => PortfolioOwnerEntity, (owner) => owner.profile, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'owner_id' })
  owner: PortfolioOwnerEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
