import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class AddObsColumnsToPilotes1646619321666 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('controle_pilha', new TableColumn({
            name: 'img_1_obs',
            type: 'varchar',
            isNullable: true,
        }))    
        await queryRunner.addColumn('controle_pilha', new TableColumn({
            name: 'img_2_obs',
            type: 'varchar',
            isNullable: true,
        }))    
        await queryRunner.addColumn('controle_pilha', new TableColumn({
            name: 'img_3_obs',
            type: 'varchar',
            isNullable: true,
        }))  
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('controle_pilha','img_1_obs');
        await queryRunner.dropColumn('controle_pilha','img_2_obs');
        await queryRunner.dropColumn('controle_pilha','img_3_obs');
    }

}
