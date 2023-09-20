import { Types, Document} from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Club } from "src/club/entities/club.entity";



export enum Position {
    ARQUERO='ARQUERO',
    DEFENSA='DEFENSA',
    MEDIOCAMPO ='MEDIOCAMPO',
    ATACANTE ='ATACANTE',
}

@Schema()
export class Jugador extends Document{

    @Prop({
       unique: true, 
    })
    nombre: string; 
    
    @Prop({ type: Types.ObjectId, ref: Club.name})
    club: string;

    @Prop()
    dorsal: number;

    @Prop()
    position: Position;

}

export const JugadorSchema = SchemaFactory.createForClass(Jugador);