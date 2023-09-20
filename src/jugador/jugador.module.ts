import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JugadorService } from './jugador.service';
import { JugadorController } from './jugador.controller';
import { Jugador, JugadorSchema } from './entities/jugador.entity';

@Module({
  controllers: [JugadorController],
  providers: [JugadorService],
  imports:[
    MongooseModule.forFeature([{
      name: Jugador.name,
      schema: JugadorSchema,
    }]),
  ],
  exports:[
    MongooseModule,
  ],
})
export class JugadorModule {}
