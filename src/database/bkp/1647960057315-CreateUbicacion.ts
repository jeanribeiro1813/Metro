import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class CreateUbicacion1647960057315 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(

                {
                    name: 'ubicacion',
                    columns: [
                        {
                            name: 'id',
                            type: 'uuid',
                            isPrimary: true,
                            generationStrategy: 'uuid',
                            default: 'uuid_generate_v4()',
                        },
                        {
                            name: 'cod_ubicacion',
                            type: 'varchar',
                            isNullable:true
                        },
                        {
                            name: 'ubicacion',
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
        await queryRunner.dropTable('ubicacion');

    }

}