import { getCustomRepository } from 'typeorm';
import Reportes from '../../typeorm/entities/Reportes';
import ReportesRepositoy from '../../typeorm/repositories/ReportesRepository';

class ReportService {

    public async show(): Promise<Reportes[] | undefined> {

        const loadService = getCustomRepository(ReportesRepositoy);
        
        const cargoRepo = await loadService.find();
        
        this.Tratamento(cargoRepo)

        return cargoRepo;
    }

    public async showId(id: string): Promise<Reportes | undefined> {
        const loadService = getCustomRepository(ReportesRepositoy);

        const cargoRepo = await loadService.findById(id);

        this.Tratamento([cargoRepo])

        return cargoRepo;
    }

   public async showfilter( fin:string): Promise<Reportes[] | undefined> {
        const loadService = getCustomRepository(ReportesRepositoy);

        const cargoRepo = await loadService.createQueryBuilder().select()
        .where(' fin :: text  ilike :fin', {fin: `%${fin}%`}).getMany();

	
        this.Tratamento(cargoRepo);

        return cargoRepo;
    }

    private Tratamento(dados: any) {

        dados.forEach(function (obj: any) {
            Object.keys(obj).forEach(function (key) {

                if (obj[key] === null || obj[key] === undefined || obj[key] === 'null' || obj[key] === 'undefined') {
                    obj[key] = "";
                }

                
                const arr = obj[key].toString().split('|');
                obj[key] = arr;


                if (obj[key].length === 1) {
                    obj[key] = obj[key][0]
                }

            })

            // obj['actividade_area'] = [];
            // obj['condiciones_climaticas'] = [];
           

            if (typeof (obj['locali']) === 'object') {

                obj['locali'].forEach(function (key: any, idx: string | number) {
                 

                    obj['locali'].push(
                        {
                            "id": obj['locali'][idx],
                            "vaciado": obj['vaciado'][idx],
                            "csl": obj['csl'][idx],
                            "observaciones": obj['observaciones'][idx],
                            "actividad":obj['actividad'][idx] ,
                            "img_1": obj['img_1'],
                            "img_1_obs": obj['img_1_obs'],
                            "img_2": obj['img_2'],
                            "img_2_obs": obj['img_2_obs'],
                            "img_3": obj['img_3'],
                            "img_3_obs": obj['img_3_obs'],
                        }
                    );
                  

                });

            }


            else if (typeof (obj['locali']) === 'string') {

                obj['locali'] = [
                    {
                        "id": obj['locali'],
                        "vaciado": obj['vaciado'],
                        "csl": obj['csl'],
                        "observaciones": obj['observaciones'],
                        "actividad":obj['actividad'],
                        "img_1": obj['img_1'],
                        "img_1_obs": obj['img_1_obs'],
                        "img_2": obj['img_2'],
                        "img_2_obs": obj['img_2_obs'],
                        "img_3": obj['img_3'],
                        "img_3_obs": obj['img_3_obs'],
                    }
                ];

            }

            delete obj['actividad']
            delete obj['id']
            delete obj['img_1']
            delete obj['img_2']
            delete obj['img_3']
            delete obj['img_1_obs']
            delete obj['img_2_obs']
            delete obj['img_3_obs']
            delete obj['vaciado']
            delete obj['csl']
            delete obj['observaciones']
        });
    }

}

export default ReportService;
