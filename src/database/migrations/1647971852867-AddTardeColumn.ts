import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddTardeColumn1647971852867 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('condicoes_climaticas', new TableColumn({
            name: 'tarde',
            type: 'varchar',
            isNullable: true,
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('tarde','condicoes_climaticas');
    }

}