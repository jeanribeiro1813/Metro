import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class CreateProyectos1647959741893 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(

                {
                    name: 'proyectos',
                    columns: [
                        {
                            name: 'id_proyecto',
                            type: 'uuid',
                            isPrimary: true,
                            generationStrategy: 'uuid',
                            default: 'uuid_generate_v4()',
                        },
                        {
                            name: 'cod_proyecto',
                            type: 'varchar',
                            isNullable:true
                        },
                        {
                            name: 'proyecto',
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
        await queryRunner.dropTable('proyectos');

    }

}
