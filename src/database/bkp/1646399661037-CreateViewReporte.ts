import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateViewReporte1646399661037 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        //Mudar Apenas o local de criação que esta como prod
        await queryRunner.query("CREATE OR REPLACE VIEW public.reportes\
        AS\
        SELECT max(split_part(supervision.fim_perfu::text, ' '::text, 1)) AS fim_perfu,\
           min(split_part(supervision.inicio_perfu::text, ' '::text, 2)) AS inicio,\
           max(split_part(supervision.fim_perfu::text, ' '::text, 2)) AS fin,\
           string_agg(supervision.subcontra::text, '| '::text) AS subcontra,\
           string_agg(supervision.locali::text, '| '::text) AS locali,\
           string_agg(supervision.ensaio_csl::text, '| '::text) AS ensayos,\
           string_agg(supervision.descri::text, '| '::text) AS observaciones,\
           string_agg(supervision.img_1::text, '| '::text) AS img_1,\
           string_agg(supervision.img_2::text, '| '::text) AS img_2,\
           string_agg(supervision.img_3::text, '| '::text) AS img_3,\
           string_agg(\
               CASE\
                   WHEN supervision.vazio::text = supervision.fim_perfu::text THEN 'SIM'::text\
                   ELSE 'NÃO'::text\
               END, '| '::text) AS vazio,\
           string_agg(\
               CASE\
                   WHEN supervision.cls IS NOT NULL THEN 'SIM'::text\
                   ELSE 'NÃO'::text\
               END, '| '::text) AS cls,\
           string_agg(DISTINCT supervision.obs::text, '| '::text) AS obs\
          FROM supervision\
         GROUP BY supervision.fim_perfu;\
       ")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropView('reportes')
    }

}
