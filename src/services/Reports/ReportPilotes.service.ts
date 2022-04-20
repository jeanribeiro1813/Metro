import { getCustomRepository } from 'typeorm';
import Reportes_Pilote from '../../typeorm/entities/Reportes_Pilote';
import Reportes_PiloteRepositoy from '../../typeorm/repositories/ReportesPilotesRepository';

class ReportePilotesService {

    public async show(): Promise<Reportes_Pilote[] | undefined> {

        const loadService = getCustomRepository(Reportes_PiloteRepositoy);
        
        const cargoRepo = await loadService.find();
        
        this.Tratamento(cargoRepo)

        return cargoRepo;
    }

    public async showId(id: string): Promise<Reportes_Pilote | undefined> {
        const loadService = getCustomRepository(Reportes_PiloteRepositoy);

        const cargoRepo = await loadService.findById(id);

        this.Tratamento([cargoRepo])

        return cargoRepo;
    }

   public async showfilter( fim_perfu:string): Promise<Reportes_Pilote[] | undefined> {
        const loadService = getCustomRepository(Reportes_PiloteRepositoy);

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
                            "id": key,
                            "vazio": obj['vazio'][idx],
                            "cls": obj['cls'][idx],
                            "observaciones": obj['observaciones'][idx],
                            "actividade_area":'' ,
                            "manha": obj['manha'][idx],
                            "tarde": obj['tarde'][idx],
                            "noche": obj['noche'][idx],
                            "img_1": obj['img_1'][idx],
                            "img_2": obj['img_2'][idx],
                            "img_3": obj['img_3'][idx],
                        }
                    );
                  

                });

            }


            else if (typeof (obj['locali']) === 'string') {

                obj['locali'] = [
                    {
                        "id": obj['id'],
                        "vazio": obj['vazio'],
                        "cls": obj['cls'],
                        "observaciones": obj['observaciones'],
                        "actividade_area":obj['actividade_area'],
                        "manha": obj['manha'],
                        "tarde": obj['tarde'],
                        "noche": obj['noche'],
                        "img_1": obj['img_1'],
                        "img_2": obj['img_2'],
                        "img_3": obj['img_3'],
                    }
                ];

            }

            delete obj['actividade_area']
            delete obj['id']
            delete obj['img_1']
            delete obj['img_2']
            delete obj['img_3']
            delete obj['manha']
            delete obj['tarde']
            delete obj['noche']
            delete obj['vazio']
            delete obj['cls']
            delete obj['observaciones']
        });
    }

}

export default ReportePilotesService;
