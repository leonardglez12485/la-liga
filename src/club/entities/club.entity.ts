import { Document} from 'mongoose'
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"



export enum Division {
    PRIMERA='PRIMERA',
    SEGUNDA='SEGUNDA',
    SEGUNDA_B ='SEGUNDA_B' 
}

@Schema()
export class Club extends Document{

    @Prop({
        unique: true,
       })
    nombre: string;

    @Prop({
        
       })
    cantJugadores: number;
   
    @Prop({
        
       })
    division: Division;
    
    @Prop({
        
       })
    champions: boolean;
}

export const ClubSchema = SchemaFactory.createForClass(Club);
