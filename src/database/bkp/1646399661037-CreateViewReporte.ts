import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateViewReporte1646399661037 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        //Mudar Apenas o local de criação que esta como prod
        await queryRunner.query("CREATE OR REPLACE VIEW public.reportes\
        AS\
        SELECT max(split_part(controle_pilha.fim_perfu::text, ' '::text, 1)) AS fim_perfu,\
           min(split_part(controle_pilha.inicio_perfu::text, ' '::text, 2)) AS inicio,\
           max(split_part(controle_pilha.fim_perfu::text, ' '::text, 2)) AS fin,\
           string_agg(controle_pilha.subcontra::text, '| '::text) AS subcontra,\
           string_agg(controle_pilha.locali::text, '| '::text) AS locali,\
           string_agg(controle_pilha.ensaio_csl::text, '| '::text) AS ensayos,\
           string_agg(controle_pilha.descri::text, '| '::text) AS observaciones,\
           string_agg(controle_pilha.img_1::text, '| '::text) AS img_1,\
           string_agg(controle_pilha.img_2::text, '| '::text) AS img_2,\
           string_agg(controle_pilha.img_3::text, '| '::text) AS img_3,\
           string_agg(\
               CASE\
                   WHEN controle_pilha.vazio::text = controle_pilha.fim_perfu::text THEN 'SIM'::text\
                   ELSE 'NÃO'::text\
               END, '| '::text) AS vazio,\
           string_agg(\
               CASE\
                   WHEN controle_pilha.cls IS NOT NULL THEN 'SIM'::text\
                   ELSE 'NÃO'::text\
               END, '| '::text) AS cls,\
           string_agg(DISTINCT controle_pilha.obs::text, '| '::text) AS obs\
          FROM controle_pilha\
         GROUP BY controle_pilha.fim_perfu;\
       ")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropView('reportes')
    }

}
