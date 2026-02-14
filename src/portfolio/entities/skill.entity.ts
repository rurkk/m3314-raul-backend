import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { DATABASE_SCHEMA } from '../../infrastructure/database/database.constants';
import { PortfolioOwnerEntity } from './portfolio-owner.entity';
import { ProjectSkillEntity } from './project-skill.entity';

@Entity({ schema: DATABASE_SCHEMA, name: 'skills' })
@Unique('UQ_skill_owner_name', ['ownerId', 'name'])
export class SkillEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'owner_id', type: 'int' })
  ownerId: number;

  @Column({ type: 'varchar', length: 120 })
  name: string;

  @Column({ type: 'varchar', length: 80 })
  category: string;

  @Column({ type: 'smallint', default: 1 })
  level: number;

  @ManyToOne(() => PortfolioOwnerEntity, (owner) => owner.skills, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'owner_id' })
  owner: PortfolioOwnerEntity;

  @OneToMany(() => ProjectSkillEntity, (projectSkill) => projectSkill.skill)
  projectSkills: ProjectSkillEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
