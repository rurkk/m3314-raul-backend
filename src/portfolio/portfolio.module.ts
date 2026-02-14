import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerProfileEntity } from './entities/owner-profile.entity';
import { PortfolioOwnerEntity } from './entities/portfolio-owner.entity';
import { ProjectEntity } from './entities/project.entity';
import { ProjectSkillEntity } from './entities/project-skill.entity';
import { SkillEntity } from './entities/skill.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PortfolioOwnerEntity,
      OwnerProfileEntity,
      ProjectEntity,
      SkillEntity,
      ProjectSkillEntity,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class PortfolioModule {}
