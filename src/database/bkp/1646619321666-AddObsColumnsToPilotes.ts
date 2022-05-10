import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class AddObsColumnsToSupervision1646619321666 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('supervision', new TableColumn({
            name: 'img_1_obs',
            type: 'varchar',
            isNullable: true,
        }))    
        await queryRunner.addColumn('supervision', new TableColumn({
            name: 'img_2_obs',
            type: 'varchar',
            isNullable: true,
        }))    
        await queryRunner.addColumn('supervision', new TableColumn({
            name: 'img_3_obs',
            type: 'varchar',
            isNullable: true,
        }))  
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('supervision','img_1_obs');
        await queryRunner.dropColumn('supervision','img_2_obs');
        await queryRunner.dropColumn('supervision','img_3_obs');
    }

}
