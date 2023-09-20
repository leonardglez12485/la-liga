import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CreateJugadorDto } from './dto/create-jugador.dto';
import { UpdateJugadorDto } from './dto/update-jugador.dto';
import { Jugador } from './entities/jugador.entity';
import { Club } from 'src/club/entities/club.entity';


@Injectable()
export class JugadorService {

  constructor(
    @InjectModel(Jugador.name)  //inyectamos el modelo al servicio
    private readonly jugadorModel: Model<Jugador>,
   // private readonly clubModel: Model<Club>,
  ){}

  //================
  //Crear un Jugador
  //================
  async create(createJugadorDto: CreateJugadorDto) {
    createJugadorDto.nombre = createJugadorDto.nombre.toLocaleLowerCase();
    const jug = await this.isUniqueDorsal(createJugadorDto)
    if(jug.length>0){
      throw new BadRequestException('ya existe un dorsal asigando en ese equipo')
    }
    else{
      const jugador = await this.jugadorModel.create(createJugadorDto); 
      console.log(jugador); 
    }
   
   // try {
       
          
        
      //  } catch (error) {
      //    this.hadleException(error); 
      //  }    
  }

  findAll() {
    return this.jugadorModel.find();
  }

 async findOne(term: string) {
      let jugadores: Jugador;
  
      //busqueda por ID
      if(isValidObjectId(term)){
        jugadores = await this.jugadorModel.findById(term);
      } 

      //busqueda por nombre
      if(!jugadores){
        jugadores = await this.jugadorModel.findOne({nombre: term.toLocaleLowerCase().trim()});  
      }

      //Si no esta 
      if(!jugadores){
       throw new NotFoundException(`Jugador whit Id or Name "${term}" not found`); 
      }
      return jugadores;
    }

  async update(term: string, updateJugadorDto: UpdateJugadorDto) {
    const jugador = await this.findOne(term);
    if(updateJugadorDto.nombre){
      updateJugadorDto.nombre = updateJugadorDto.nombre.toLocaleLowerCase();
    }
     try {
       await jugador.updateOne(updateJugadorDto);
       return {...jugador.toJSON(), ...updateJugadorDto};
     } catch (error) {
      this.hadleException(error)
     }
  }

  remove(id: number) {
    return `This action removes a #${id} jugador`;
  }

  //========================================================
  //Validando que el dorsal no sew repita en el mismo equipo
  //========================================================
  private async  isUniqueDorsal(createJugadorDto:CreateJugadorDto){
    const dorsal = createJugadorDto.dorsal;
    const club = createJugadorDto.club;
    const jug =  await this.jugadorModel.find({dorsal, club});
    return jug;
   }

  
  //======================
  //Manejando Los Errores
  //======================
  private hadleException(error:any){
    if(error.code === 11000){
      throw new BadRequestException(`Jugador ${ JSON.stringify(error.keyValue )} asignado a un equipo, utilice la opcion de Actualizar`);
    }
    console.log({error});
    throw new InternalServerErrorException(`Can't create Jugador - Check server logs `);
  }
}
