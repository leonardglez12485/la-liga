import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Model, isValidObjectId } from 'mongoose';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { Club } from './entities/club.entity';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class ClubService {
  defaultLimit: any;
  
  constructor(
    @InjectModel( Club.name)  //inyectamos el modelo al servicio
    private readonly clubModel: Model<Club>,
  ){}

  //================
  //Crear Nuevo Club
  //================
  async create(createClubDto: CreateClubDto) {
    createClubDto.nombre = createClubDto.nombre.toLocaleLowerCase();
    try {
      const club = await this.clubModel.create(createClubDto);
      return club;
    } catch (error) {
      this.hadleException(error)
    }
  }

  //=========================
  //Retornar todos los Clubes
  //=========================
  findAll() {
   // const {limit= this.defaultLimit, offset=0} = paginationDto;
    return this.clubModel.find()
          //  .limit(limit)
          //  .skip(offset)
          //  .sort({
          //   no:1
          //  })
          //  .select('-__v')
  }

  //================
  //Retornar un Club
  //================
  async findOne(term: string) {
    let club: Club;

    //busqueda por ID
    if(isValidObjectId(term)){
      club = await this.clubModel.findById(term);
    } 

    //busqueda por nombre
    if(!club){
      club = await this.clubModel.findOne({nombre: term.toLocaleLowerCase().trim()});  
    }
   
    //Si no esta 
    if(!club){
     throw new NotFoundException(`Club whit Id or Name "${term}" not found`); 
    }

    return club;
  }

   //=========================
  //Actualizar un CLub
  //=========================
  async update(term: string, updateClubDto: UpdateClubDto) {
     
    const club = await this.findOne(term);
    if(updateClubDto.nombre){
      updateClubDto.nombre = updateClubDto.nombre.toLocaleLowerCase();
    }
     try {
       await club.updateOne(updateClubDto);
       return {...club.toJSON(), ...updateClubDto};
     } catch (error) {
      this.hadleException(error)
     }
 }  

  //======================
  //Eliminar Club
  //======================
  async remove(id: string) {
  const {deletedCount} = await this.clubModel.deleteOne({_id:id});
  if(deletedCount ===0){
    throw new BadRequestException(`Club whit ID: ${id} not Found !!!!`);
  }
  return;
  }

  //======================
  //Manejando Los Errores
  //======================
  private hadleException(error:any){
    if(error.code === 11000){
      throw new BadRequestException(`Club exists in DB ${ JSON.stringify(error.keyValue )}`);
    }
    console.log({error});
    throw new InternalServerErrorException(`Can't create Club - Check server logs `);
    
  }
}
