import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class AddImgColumnsToUbicaciones1646585111507 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('ubicacion_estaciones_aeb', new TableColumn({
            name: 'img_1',
            type: 'varchar',
            isNullable: true,
        }))    
        await queryRunner.addColumn('ubicacion_estaciones_aeb', new TableColumn({
            name: 'img_2',
            type: 'varchar',
            isNullable: true,
        }))    
        await queryRunner.addColumn('ubicacion_estaciones_aeb', new TableColumn({
            name: 'img_3',
            type: 'varchar',
            isNullable: true,
        }))        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('ubicacion_estaciones_aeb','img_1');
        await queryRunner.dropColumn('ubicacion_estaciones_aeb','img_2');
        await queryRunner.dropColumn('ubicacion_estaciones_aeb','img_3');

    }

}
