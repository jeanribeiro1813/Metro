import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableActividades1650479328821 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> { 
       
        await queryRunner.createTable(
            new Table ({

                name:'actividades_bkg',
                columns:[

                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'descripcion',
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
                    }
            
            ]

            })
        )
    }
    

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable('actividades_bkg');

    }

}
