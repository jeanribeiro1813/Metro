import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreatePilotes1643510378521 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: 'controle_pilha',
                    columns: [
                        {
                            name: 'id',
                            type: 'uuid',
                            isPrimary: true,
                            generationStrategy: 'uuid',
                            default: 'uuid_generate_v4()',
                        },
                        {
                            name: 'ordem_serv',
                            type: 'varchar',
                            isNullable:true
                        },
                        {
                            name: 'mod_viaduto',
                            type: 'varchar',
                            isNullable:true
                        },
                        {
                            name: 'locali',
                            type: 'varchar',
                            isNullable:true
                        },
                        {
                            name: 'descri',
                            type: 'varchar',
                            isNullable:true
                        },
                        {
                            name: 'tipologia',
                            type: 'varchar',
                            isNullable:true
                        },
                        {
                            name: 'pilha',
                            type: 'varchar',
                            isNullable:true
                        },
                        {
                            name: 'e',
                            type: 'varchar',
                            isNullable:true
                        },
                        {
                            name: 'n',
                            type: 'varchar',
                            isNullable:true
                        },
                        {
                            name: 'subcontra',
                            type: 'varchar',
                            isNullable:true
                        },
                        {
                            name: 'parede_guia',
                            type: 'varchar',
                            isNullable:true
                        },
                        {
                            name: 'inicio_perfu',
                            type: 'varchar',
                            isNullable:true
                        },
                        {
                            name: 'fim_perfu',
                            type: 'varchar',
                            isNullable:true
                        },
                        {
                            name: 'vazio',
                            type: 'varchar',
                            isNullable:true
                        },
                        {
                            name: 'cls',
                            type: 'varchar',
                            isNullable:true
                        },
                        {
                            name: 'long_metro',
                            type: 'varchar',
                            isNullable:true
                        },
                        {
                            name: 'diam',
                            type: 'varchar',
                            isNullable:true
                        },
                        {
                            name: 'rend_metro_dia',
                            type: 'varchar',
                            isNullable:true
                        },   
                        {
                            name: 'status',
                            type: 'varchar',
                            isNullable:true
                        }, 
                        {
                            name: 'maquina',
                            type: 'varchar',
                            isNullable:true
                        }, 
                        {
                            name: 'ensaio_csl',
                            type: 'varchar',
                            isNullable:true
                        }, 
                        {
                            name: 'obs',
                            type: 'varchar',
                            isNullable:true
                        }, 
                        {
                            name: 'img_1',
                            type: 'varchar',
                            isNullable:true
                        },    
                        {
                            name: 'img_2',
                            type: 'varchar',
                            isNullable:true
                        },
                        {
                            name: 'img_3',
                            type: 'varchar',
                            isNullable:true
                        },                         
                        {
                            name: 'actividad',
                            type: 'varchar',
                            isNullable:true
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
                            name: 'geom',
                            type: 'varchar',
                        },
                    ]
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('controle_pilha');
    }

}
