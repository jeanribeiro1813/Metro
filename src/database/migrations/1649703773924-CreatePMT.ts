import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePMT1649703773924 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:'PMT',
                columns:[
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'user',
                        type: 'varchar',
                    },
                    {
                        name: 'atividades',
                        type: 'varchar',
                    },
                    
                    {
                        name: 'inconsistencia',
                        type: 'varchar',
                    },
                    {
                        name: 'acciones',
                        type: 'varchar',
                    },
                    {
                        name: 'imagen1',
                        type: 'varchar',
                    },
                    {
                        name: 'descrimg1',
                        type: 'varchar',
                    },
                    {
                        name: 'imagen2',
                        type: 'varchar',
                    },
                    {
                        name: 'descrimg2',
                        type: 'varchar',
                    },
                    {
                        name: 'imagen3',
                        type: 'varchar',
                    },
                    {
                        name: 'descrimg3',
                        type: 'varchar',
                    },
                    {
                        name: 'imagen4',
                        type: 'varchar',
                    },
                    {
                        name: 'descrimg4',
                        type: 'varchar',
                    },
                    {
                        name: 'imagen5',
                        type: 'varchar',
                    },
                    {
                        name: 'descrimg5',
                        type: 'varchar',
                    },
                    {
                        name: 'imagen6',
                        type: 'varchar',
                    },
                    {
                        name: 'descrimg6',
                        type: 'varchar',
                    },
                    {
                        name: 'imagen7',
                        type: 'varchar',
                    },
                    {
                        name: 'descrimg7',
                        type: 'varchar',
                    },
                    {
                        name: 'imagen8',
                        type: 'varchar',
                    },
                    {
                        name: 'descrimg8',
                        type: 'varchar',
                    },
              
                    {
                        name: 'e',
                        type: 'varchar',
                    },
                    {
                        name: 'n',
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
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('PMT');

    }

}
