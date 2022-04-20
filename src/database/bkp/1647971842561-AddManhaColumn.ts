import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddManhaColumn1647971842561 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('condicoes_climaticas', new TableColumn({
            name: 'manha',
            type: 'varchar',
            isNullable: true,
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('manha','condicoes_climaticas');
    }

}