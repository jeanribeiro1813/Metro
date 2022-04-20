import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateEstaciones1643510806599 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: 'ubicacion_estaciones_aeb',
                    columns: [
                        {
                            name: 'id',
                            type: 'uuid',
                            isPrimary: true,
                            generationStrategy: 'uuid',
                            default: 'uuid_generate_v4()',
                        },
                        {
                            name: 'este',
                            type: 'varchar',
                        },
                        {
                            name: 'norte',
                            type: 'varchar',
                        },        
                        {
                            name: 'estacion',
                            type: 'varchar',
                        },                                                                                                                                                                                                           
                        {
                            name: 'created_at',
                            type: 'timestamp',
                            default: 'now()',
                        },
                        {
                            name: 'updated_at',
                            type: 'timestamp',
                            default: 'now()',
                        },
                        {
                            name: 'sigla',
                            type: 'varchar',
                            
                        },
                    ]
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('ubicacion_estaciones_aeb');
    }

}
