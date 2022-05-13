import { getRepository } from 'typeorm';

import SSOMAPMT from '../../typeorm/entities/SSOMAPMT'

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

class LoadSSOMAPMTService{

    public async execute (): Promise< SSOMAPMT[] | undefined> {
        
        const repository = getRepository(SSOMAPMT);

        const dados = await repository.find({});
        
        const summary = dados.map((obj) =>{
            const DescItemOfSummary = {

                id: obj?.id,
                user: obj?.user,
                ubicacion: obj?.ubicacion,
                e: obj?.e,
                n: obj?.n,
                fecha: obj?.fecha,
                atividades: obj?.atividades,
                inconsistencia: obj?.inconsistencia,
                acciones: obj?.acciones,
                categoria:obj?.categoria,
                imagen1: obj?.imagen1,
                descrimg1: obj?.descrimg1,
                imagen2: obj?.imagen2,
                descrimg2: obj?.descrimg2,
                imagen3: obj?.imagen3,
                descrimg4: obj?.descrimg4,
                imagen5: obj?.imagen5,
                descrimg5: obj?.descrimg5,
                imagen6: obj?.imagen6,
                descrimg6: obj?.descrimg6,
                imagen7: obj?.imagen7,
                descrimg7: obj?.descrimg7,
                imagen8: obj?.imagen8,
                descrimg8: obj?.descrimg8,

            }
            return DescItemOfSummary;
            }

        )

        const responseDTO : any= {
            summary,
        };

        return responseDTO.summary;
    }
}

export default LoadSSOMAPMTService;