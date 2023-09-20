import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ClubService } from './club.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';

@Controller('club')
export class ClubController {
  constructor(
    private readonly clubService: ClubService
    ) {}

  @HttpCode( HttpStatus.CREATED) //configuracion adicional para configurar el codigo del status
  @Post()
  create(@Body() createClubDto: CreateClubDto) {
    return this.clubService.create(createClubDto);
  }

  @Get()
  findAll() {
    return this.clubService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.clubService.findOne(term);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updateClubDto: UpdateClubDto) {
    return this.clubService.update(term, updateClubDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clubService.remove(id);
  }
}
