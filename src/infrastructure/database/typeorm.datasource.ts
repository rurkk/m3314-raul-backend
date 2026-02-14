import 'dotenv/config';
import { DataSource } from 'typeorm';
import { OwnerProfileEntity } from '../../portfolio/entities/owner-profile.entity';
import { PortfolioOwnerEntity } from '../../portfolio/entities/portfolio-owner.entity';
import { ProjectEntity } from '../../portfolio/entities/project.entity';
import { ProjectSkillEntity } from '../../portfolio/entities/project-skill.entity';
import { SkillEntity } from '../../portfolio/entities/skill.entity';
import { DATABASE_SCHEMA } from './database.constants';
import { buildPostgresConnectionOptions } from './typeorm-connection-options.util';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set');
}

const dataSource = new DataSource({
  ...buildPostgresConnectionOptions(databaseUrl),
  schema: DATABASE_SCHEMA,
  synchronize: false,
  entities: [
    PortfolioOwnerEntity,
    OwnerProfileEntity,
    ProjectEntity,
    SkillEntity,
    ProjectSkillEntity,
  ],
  migrations: ['src/infrastructure/database/migrations/*{.ts,.js}'],
});

export default dataSource;
