import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class AddObsColumnsToUbicaciones1646619530695 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('ubicacion_ubicaciones_aeb', new TableColumn({
            name: 'img_1_obs',
            type: 'varchar',
            isNullable: true,
        }))    
        await queryRunner.addColumn('ubicacion_ubicaciones_aeb', new TableColumn({
            name: 'img_2_obs',
            type: 'varchar',
            isNullable: true,
        }))    
        await queryRunner.addColumn('ubicacion_ubicaciones_aeb', new TableColumn({
            name: 'img_3_obs',
            type: 'varchar',
            isNullable: true,
        }))  
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('ubicacion_ubicaciones_aeb','img_1_obs');
        await queryRunner.dropColumn('ubicacion_ubicaciones_aeb','img_2_obs');
        await queryRunner.dropColumn('ubicacion_ubicaciones_aeb','img_3_obs');
    }

}
