import { getCustomRepository } from 'typeorm'
import PMT from '../../typeorm/entities/PMT'
import PMTRepository from '../../typeorm/repositories/PMTRepository'

import AppError from '../../errors/AppError';

interface IRequestDTO {

    id:string,
  user:string,
  ubicacion:string;
  e:string;
  n:string;
  fecha:string
  atividades:string;
  inconsistencia:string;
  acciones:string;
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

class UpdatePMTService{
    public async execute(
        {
            id,
    user,
    ubicacion,
    e,
    n,
    fecha,
    atividades,
    inconsistencia,
    acciones,
    imagen1,
    descrimg1,
    imagen2,
    descrimg2,
    imagen3,
    descrimg3,
    imagen4,
    descrimg4,
    imagen5,
    descrimg5,
    imagen6 ,
    descrimg6,
    imagen7,
    descrimg7,
    imagen8,
    descrimg8,

        }:IRequestDTO
    ): Promise<PMT | undefined>
    {
        const pmtRepository = getCustomRepository(PMTRepository);

        const pmt = await pmtRepository.findById(id);

        if(!pmt){
            throw new AppError('pmt does not exists!'); 
        }

        pmt.user = user ? user : pmt.user;
        pmt.ubicacion = ubicacion ? ubicacion : pmt.ubicacion
        pmt.e = e ? e : pmt.e;
        pmt.n = n ? n : pmt.n;
        pmt.fecha = fecha? fecha: pmt.fecha;
        pmt.atividades  = atividades ? atividades : pmt.atividades;
        pmt.inconsistencia = inconsistencia ? inconsistencia : pmt.inconsistencia;
        pmt.acciones = acciones ? acciones : pmt.acciones;
        pmt.imagen1 = imagen1 ? imagen1 : pmt.imagen1;
        pmt.descrimg1 = descrimg1 ? descrimg1 : pmt.descrimg1;
        pmt.imagen2 = imagen2 ? imagen2 : pmt.imagen2;
        pmt.descrimg2 = descrimg2 ? descrimg2 : pmt.descrimg2;
        pmt.imagen3 = imagen3 ? imagen3 : pmt.imagen3;
        pmt.descrimg3 = descrimg3 ? descrimg3 : pmt.descrimg3;
        pmt.imagen4 = imagen4 ? imagen4 : pmt.imagen4;
        pmt.descrimg4 = descrimg4 ? descrimg4 : pmt.descrimg4;
        pmt.imagen5 = imagen5 ? imagen5 : pmt.imagen5;
        pmt.descrimg5 = descrimg5 ? descrimg5 : pmt.descrimg5;
        pmt.imagen6 = imagen6 ? imagen6 : pmt.imagen6;
        pmt.descrimg6 = descrimg6 ? descrimg6 : pmt.descrimg6;
        pmt.imagen7 = imagen7 ? imagen7 : pmt.imagen7;
        pmt.descrimg7 = descrimg7 ? descrimg7 : pmt.descrimg7;
        pmt.imagen8 = imagen8 ? imagen8 : pmt.imagen8;
        pmt.descrimg8 = descrimg8 ? descrimg8 : pmt.descrimg8;
        
        await pmtRepository.save(pmt);

        return pmt;
     
    }
}


export default UpdatePMTService;

