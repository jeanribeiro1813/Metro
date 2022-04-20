import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateUsers1643505863687 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: 'users',
                    columns: [
                        {
                            name: 'id',
                            type: 'uuid',
                            isPrimary: true,
                            generationStrategy: 'uuid',
                            default: 'uuid_generate_v4()',
                        },
                        {
                            name: 'nombre',
                            type: 'varchar',
                        },
                        {
                            name: 'profesion',
                            type: 'varchar',
                        },
                        {
                            name: 'email',
                            type: 'varchar',
                            isUnique: true,
                        },
                        {
                            name: 'acesso',
                            type: 'varchar',
                        },
                        {
                            name: 'contrasena',
                            type: 'varchar',
                        },
                        {
                            name: 'user_situa',
                            type: 'varchar',
                        },
                        {
                            name: 'contacto',
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
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
