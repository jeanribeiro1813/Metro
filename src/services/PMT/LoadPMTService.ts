import { getCustomRepository, getRepository } from 'typeorm';

import PMT from '../../typeorm/entities/PMT'
import PMTRepository from '../../typeorm/repositories/PMTRepository'

interface IResponseDTO {
    summary: IDescItemOfSummary[];
}

interface IDescItemOfSummary {

    id:string,
    user:string,
    ubicacion:string;
    e:string;
    n:string;
    fecha:string
    atividades:string;
    inconsistencia:string;
    acciones:string;
    categoria:string;
    imagen1:string;
    descrimg1:string;
    imagen2: string;
    descrimg2:string;
    imagen3:string;
    descrimg3:string;
    imagen4:string;
    descrimg4:string;
    imagen5:string;
    descrimg5:string;
    imagen6 :string;
    descrimg6: string;
    imagen7:string;
    descrimg7:string;
    imagen8:string;
    descrimg8:string;

}

class LoadPMTService{

    public async execute (): Promise< PMT[] | undefined> {
        
        const pmtRepository = getRepository(PMT);

        const pmt = await pmtRepository.find({});
        
        const summary = pmt.map((use) =>{
            const DescItemOfSummary = {

                id: use?.id,
                user: use?.user,
                ubicacion: use?.ubicacion,
                e: use?.e,
                n: use?.n,
                fecha: use?.fecha,
                atividades: use?.atividades,
                inconsistencia: use?.inconsistencia,
                acciones: use?.acciones,
                categoria:use?.categoria,
                imagen1: use?.imagen1,
                descrimg1: use?.descrimg1,
                imagen2: use?.imagen2,
                descrimg2: use?.descrimg2,
                imagen3: use?.imagen3,
                descrimg4: use?.descrimg4,
                imagen5: use?.imagen5,
                descrimg5: use?.descrimg5,
                imagen6: use?.imagen6,
                descrimg6: use?.descrimg6,
                imagen7: use?.imagen7,
                descrimg7: use?.descrimg7,
                imagen8: use?.imagen8,
                descrimg8: use?.descrimg8,



            }
            return DescItemOfSummary;
            }

        )

        const responseDTO = {
            summary,
        };

        return responseDTO.summary;
    }
}

export default LoadPMTService;