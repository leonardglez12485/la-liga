import { IsBoolean, IsEnum, IsInt, IsString, Max, Min, MinLength } from "class-validator";
import { Division } from "../entities/club.entity";


export class CreateClubDto {
    
    @IsString()
    @MinLength(3)
    nombre: string;

    @Min(28)
    @Max(35)
    cantJugadores: number;
    
    @IsEnum(Division)
    division: Division;
    
    @IsBoolean()
    champions: boolean;
}
