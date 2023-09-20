import { Module } from '@nestjs/common';
import { ClubService } from './club.service';
import { ClubController } from './club.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Club, ClubSchema } from './entities/club.entity';

@Module({
  controllers: [ClubController],
  providers: [ClubService],
  imports:[
    MongooseModule.forFeature([
      {
       name: Club.name,
       schema: ClubSchema,
      }
    ]),
  ],
  exports:[
    MongooseModule,
  ],
})
export class ClubModule {}
