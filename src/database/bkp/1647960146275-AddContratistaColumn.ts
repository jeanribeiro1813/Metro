import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddContratistaColumn1647960146275 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('supervision', new TableColumn({
            name: 'contratista',
            type: 'varchar',
            isNullable: true,
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('contratista','supervision');
    }

}