import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateGenre1625001150389 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table(
          {
          name: "genre",
          columns: [
            {
            name: 'id',
            type: 'uuid',
            },
            {
              name: "description",
              type: "varchar",
            },
            {
              name: "created_at",
              type: "timestamp",
              default: "now()"
            },
            {
              name: "udpdated_at",
              type: "timestamp",
              default: "now()"
            }
        ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('genres')
    }

}
