import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { DATABASE_SCHEMA } from '../../infrastructure/database/database.constants';
import { ProjectEntity } from './project.entity';
import { SkillEntity } from './skill.entity';

@Entity({ schema: DATABASE_SCHEMA, name: 'project_skills' })
@Unique('UQ_project_skill_link', ['projectId', 'skillId'])
export class ProjectSkillEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'project_id', type: 'int' })
  projectId: number;

  @Column({ name: 'skill_id', type: 'int' })
  skillId: number;

  @Column({ type: 'smallint', default: 1 })
  emphasis: number;

  @ManyToOne(() => ProjectEntity, (project) => project.projectSkills, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  project: ProjectEntity;

  @ManyToOne(() => SkillEntity, (skill) => skill.projectSkills, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'skill_id' })
  skill: SkillEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
