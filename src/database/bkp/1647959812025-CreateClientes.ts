import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class CreateClientes1647959812025 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(

                {
                    name: 'clientes',
                    columns: [
                        {
                            name: 'id',
                            type: 'uuid',
                            isPrimary: true,
                            generationStrategy: 'uuid',
                            default: 'uuid_generate_v4()',
                        },
                        {
                            name: 'cod_cliente',
                            type: 'varchar',
                            isNullable:true
                        },
                        {
                            name: 'cliente',
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
                        }
                    ]
                }
            )
        )
    

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('clientes');

    }

}
