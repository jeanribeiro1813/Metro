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

   public async showfilter( fim_perfu:string): Promise<Reportes[] | undefined> {
        const loadService = getCustomRepository(ReportesRepositoy);

        const cargoRepo = await loadService.createQueryBuilder().select()
        .where(' fim_perfu :: text  ilike :fim_perfu', {fim_perfu: `%${fim_perfu}%`}).getMany();

	
        this.Tratamento(cargoRepo);

        return cargoRepo;
    }

    private Tratamento(dados: any) {

        dados.forEach(function (obj: any) {
            Object.keys(obj).forEach(function (key) {

                if (obj[key] === null || obj[key] === undefined || obj[key] === 'null' || obj[key] === 'undefined') {
                    obj[key] = "";
                }

                const arr = obj[key].split('|');
                obj[key] = arr;



                if (obj[key].length === 1) {
                    obj[key] = obj[key][0]
                }

            })

            // obj['actividade_area'] = [];
            // obj['condiciones_climaticas'] = [];
            obj['actividade_area'] = '';

            if (typeof (obj['locali']) === 'object') {

                obj['locali'].forEach(function (key: any, idx: string | number) {
                 

                    obj['locali'].push(
                        {
                            "id": obj['locali'][idx],
                            "vazio": obj['vazio'][idx],
                            "cls": obj['cls'][idx],
                            "observaciones": obj['observaciones'][idx],
                            "actividade_area":'' ,
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
                        "vazio": obj['vazio'],
                        "cls": obj['cls'],
                        "observaciones": obj['observaciones'],
                        "actividade_area":obj['actividade_area'],
                        "img_1": obj['img_1'],
                        "img_1_obs": obj['img_1_obs'],
                        "img_2": obj['img_2'],
                        "img_2_obs": obj['img_2_obs'],
                        "img_3": obj['img_3'],
                        "img_3_obs": obj['img_3_obs'],
                    }
                ];

            }

            delete obj['actividade_area']
            delete obj['id']
            delete obj['img_1']
            delete obj['img_2']
            delete obj['img_3']
            delete obj['img_1_obs']
            delete obj['img_2_obs']
            delete obj['img_3_obs']
            delete obj['vazio']
            delete obj['cls']
            delete obj['observaciones']
        });
    }

}

export default ReportService;
