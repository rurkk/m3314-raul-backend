import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DATABASE_SCHEMA } from '../../infrastructure/database/database.constants';
import { PortfolioOwnerEntity } from './portfolio-owner.entity';
import { ProjectSkillEntity } from './project-skill.entity';

@Entity({ schema: DATABASE_SCHEMA, name: 'projects' })
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'owner_id', type: 'int' })
  ownerId: number;

  @Column({ type: 'varchar', length: 180 })
  title: string;

  @Column({ type: 'varchar', length: 200, unique: true })
  slug: string;

  @Column({ type: 'text' })
  summary: string;

  @Column({ name: 'repository_url', type: 'varchar', length: 255, nullable: true })
  repositoryUrl: string | null;

  @Column({ name: 'is_published', type: 'boolean', default: false })
  isPublished: boolean;

  @ManyToOne(() => PortfolioOwnerEntity, (owner) => owner.projects, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'owner_id' })
  owner: PortfolioOwnerEntity;

  @OneToMany(() => ProjectSkillEntity, (projectSkill) => projectSkill.project)
  projectSkills: ProjectSkillEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
