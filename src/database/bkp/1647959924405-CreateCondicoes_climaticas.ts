import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class CreateCondicoesClimaticas1647959924405 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(

                {
                    name: 'condicoes_climaticas',
                    columns: [
                        {
                            name: 'id',
                            type: 'uuid',
                            isPrimary: true,
                            generationStrategy: 'uuid',
                            default: 'uuid_generate_v4()',
                        },
                        {
                            name: 'cod_climas',
                            type: 'varchar',
                            isNullable:true
                        },
                        {
                            name: 'condicoes_climaticas',
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
        await queryRunner.dropTable('condicoes_climaticas');

    }

}
