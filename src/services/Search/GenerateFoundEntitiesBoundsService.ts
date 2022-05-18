import { getManager } from 'typeorm'


interface IRequestDTO {
    geomFromText: string[];
}

interface IResponse {
    bounds: number[][];
    x?: string;
    y?: string;
}

class GenerateFoundEntitiesBoundsService{
    public async execute ({geomFromText}:IRequestDTO): Promise<IResponse | undefined> {

        const query = `
            SELECT Box2D(
                ST_Collect(
                    ARRAY[${geomFromText.toString()}]
                )   
            ) As box, St_X(${geomFromText[0].toString()}) as x, St_Y(${geomFromText[0].toString()}) as y;
        `;

        const result = await getManager().query(query);
        
        
        if(result.length){

            let {box} = result[0];
            let {x} = result[0];
            let {y} = result[0];

            box = box.replace("BOX(","");
            box = box.replace(")","");
            box = box.replace(","," ");
            
            const coords = box.split(" ");
    
            const bounds = [
                [Number(coords[0]), Number(coords[1])],
                [Number(coords[2]), Number(coords[3])]
            ]

            return {bounds, y, x};
        }else{
            return undefined;
        }
    }
}

export default GenerateFoundEntitiesBoundsService;