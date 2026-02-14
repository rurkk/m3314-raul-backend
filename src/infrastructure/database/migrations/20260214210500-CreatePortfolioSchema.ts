import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { DATABASE_SCHEMA } from '../database.constants';

export class CreatePortfolioSchema20260214210500
  implements MigrationInterface
{
  name = 'CreatePortfolioSchema20260214210500';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createSchema(DATABASE_SCHEMA, true);

    await queryRunner.createTable(
      new Table({
        schema: DATABASE_SCHEMA,
        name: 'portfolio_owners',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'display_name',
            type: 'varchar',
            length: '120',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        schema: DATABASE_SCHEMA,
        name: 'owner_profiles',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'owner_id',
            type: 'int',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'headline',
            type: 'varchar',
            length: '160',
            isNullable: false,
          },
          {
            name: 'bio',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'city',
            type: 'varchar',
            length: '120',
            isNullable: true,
          },
          {
            name: 'avatar_url',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['owner_id'],
            referencedSchema: DATABASE_SCHEMA,
            referencedTableName: 'portfolio_owners',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        schema: DATABASE_SCHEMA,
        name: 'projects',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'owner_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'title',
            type: 'varchar',
            length: '180',
            isNullable: false,
          },
          {
            name: 'slug',
            type: 'varchar',
            length: '200',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'summary',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'repository_url',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'is_published',
            type: 'boolean',
            default: false,
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['owner_id'],
            referencedSchema: DATABASE_SCHEMA,
            referencedTableName: 'portfolio_owners',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        schema: DATABASE_SCHEMA,
        name: 'skills',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'owner_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '120',
            isNullable: false,
          },
          {
            name: 'category',
            type: 'varchar',
            length: '80',
            isNullable: false,
          },
          {
            name: 'level',
            type: 'smallint',
            isNullable: false,
            default: 1,
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['owner_id'],
            referencedSchema: DATABASE_SCHEMA,
            referencedTableName: 'portfolio_owners',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
        uniques: [
          {
            name: 'UQ_skill_owner_name',
            columnNames: ['owner_id', 'name'],
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        schema: DATABASE_SCHEMA,
        name: 'project_skills',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'project_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'skill_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'emphasis',
            type: 'smallint',
            isNullable: false,
            default: 1,
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['project_id'],
            referencedSchema: DATABASE_SCHEMA,
            referencedTableName: 'projects',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['skill_id'],
            referencedSchema: DATABASE_SCHEMA,
            referencedTableName: 'skills',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
        uniques: [
          {
            name: 'UQ_project_skill_link',
            columnNames: ['project_id', 'skill_id'],
          },
        ],
      }),
      true,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(`${DATABASE_SCHEMA}.project_skills`, true, true, true);
    await queryRunner.dropTable(`${DATABASE_SCHEMA}.skills`, true, true, true);
    await queryRunner.dropTable(`${DATABASE_SCHEMA}.projects`, true, true, true);
    await queryRunner.dropTable(`${DATABASE_SCHEMA}.owner_profiles`, true, true, true);
    await queryRunner.dropTable(`${DATABASE_SCHEMA}.portfolio_owners`, true, true, true);

    await queryRunner.dropSchema(DATABASE_SCHEMA, true, true);
  }
}
