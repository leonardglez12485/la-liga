import { IsEnum, IsInt, IsMongoId, IsPositive, IsString, Max, Min, MinLength } from "class-validator";
import { Position } from "../entities/jugador.entity";


export class CreateJugadorDto {
   
    @IsString()
    @MinLength(2)
    nombre: string; 

    @IsMongoId()
    club: string;
    
    @Min(1)
    @Max(99)
    dorsal: number;
    
    @IsEnum(Position)
    position: Position;

}
