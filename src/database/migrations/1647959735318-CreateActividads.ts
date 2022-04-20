import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class CreateActividads1647959735318 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table(

                {
                    name: 'actividads',
                    columns: [
                        {
                            name: 'id_actividad',
                            type: 'uuid',
                            isPrimary: true,
                            generationStrategy: 'uuid',
                            default: 'uuid_generate_v4()',
                        },
                        {
                            name: 'cod_actividad',
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
                        }
                    ]
                }
            )
        )
    

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('actividads');

    }

}
