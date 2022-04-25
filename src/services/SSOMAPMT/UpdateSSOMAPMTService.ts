import { getCustomRepository } from 'typeorm'
import SSOMAPMT from '../../typeorm/entities/SSOMAPMT'
import SSOMAPMTRepository from '../../typeorm/repositories/SSOMAPMTRepository'

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

class UpdateSSOMAPMTService{
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
    categoria,
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
    ): Promise<SSOMAPMT | undefined>
    {
        const ssomapmtRepository = getCustomRepository(SSOMAPMTRepository);

        const SSOMAPMT = await ssomapmtRepository.findById(id);

        if(!SSOMAPMT){
            throw new AppError('SSOMAPMT does not exists!'); 
        }

        SSOMAPMT.user = user ? user : SSOMAPMT.user;
        SSOMAPMT.ubicacion = ubicacion ? ubicacion : SSOMAPMT.ubicacion
        SSOMAPMT.e = e ? e : SSOMAPMT.e;
        SSOMAPMT.n = n ? n : SSOMAPMT.n;
        SSOMAPMT.fecha = fecha? fecha: SSOMAPMT.fecha;
        SSOMAPMT.atividades  = atividades ? atividades : SSOMAPMT.atividades;
        SSOMAPMT.inconsistencia = inconsistencia ? inconsistencia : SSOMAPMT.inconsistencia;
        SSOMAPMT.acciones = acciones ? acciones : SSOMAPMT.acciones;
        SSOMAPMT.categoria = categoria ? categoria : SSOMAPMT.categoria;
        SSOMAPMT.imagen1 = imagen1 ? imagen1 : SSOMAPMT.imagen1;
        SSOMAPMT.descrimg1 = descrimg1 ? descrimg1 : SSOMAPMT.descrimg1;
        SSOMAPMT.imagen2 = imagen2 ? imagen2 : SSOMAPMT.imagen2;
        SSOMAPMT.descrimg2 = descrimg2 ? descrimg2 : SSOMAPMT.descrimg2;
        SSOMAPMT.imagen3 = imagen3 ? imagen3 : SSOMAPMT.imagen3;
        SSOMAPMT.descrimg3 = descrimg3 ? descrimg3 : SSOMAPMT.descrimg3;
        SSOMAPMT.imagen4 = imagen4 ? imagen4 : SSOMAPMT.imagen4;
        SSOMAPMT.descrimg4 = descrimg4 ? descrimg4 : SSOMAPMT.descrimg4;
        SSOMAPMT.imagen5 = imagen5 ? imagen5 : SSOMAPMT.imagen5;
        SSOMAPMT.descrimg5 = descrimg5 ? descrimg5 : SSOMAPMT.descrimg5;
        SSOMAPMT.imagen6 = imagen6 ? imagen6 : SSOMAPMT.imagen6;
        SSOMAPMT.descrimg6 = descrimg6 ? descrimg6 : SSOMAPMT.descrimg6;
        SSOMAPMT.imagen7 = imagen7 ? imagen7 : SSOMAPMT.imagen7;
        SSOMAPMT.descrimg7 = descrimg7 ? descrimg7 : SSOMAPMT.descrimg7;
        SSOMAPMT.imagen8 = imagen8 ? imagen8 : SSOMAPMT.imagen8;
        SSOMAPMT.descrimg8 = descrimg8 ? descrimg8 : SSOMAPMT.descrimg8;
        
        await ssomapmtRepository.save(SSOMAPMT);

        return SSOMAPMT;
     
    }
}


export default UpdateSSOMAPMTService;

