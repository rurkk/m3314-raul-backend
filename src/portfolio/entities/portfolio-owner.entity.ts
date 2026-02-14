import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DATABASE_SCHEMA } from '../../infrastructure/database/database.constants';
import { OwnerProfileEntity } from './owner-profile.entity';
import { ProjectEntity } from './project.entity';
import { SkillEntity } from './skill.entity';

@Entity({ schema: DATABASE_SCHEMA, name: 'portfolio_owners' })
export class PortfolioOwnerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ name: 'display_name', type: 'varchar', length: 120 })
  displayName: string;

  @OneToOne(() => OwnerProfileEntity, (profile) => profile.owner)
  profile: OwnerProfileEntity;

  @OneToMany(() => ProjectEntity, (project) => project.owner)
  projects: ProjectEntity[];

  @OneToMany(() => SkillEntity, (skill) => skill.owner)
  skills: SkillEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
