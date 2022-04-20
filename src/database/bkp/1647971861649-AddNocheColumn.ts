import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddNocheColumn1647971861649 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('condicoes_climaticas', new TableColumn({
            name: 'noche',
            type: 'varchar',
            isNullable: true,
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('noche','condicoes_climaticas');
    }

}