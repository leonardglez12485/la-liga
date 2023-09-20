import { Module, Get } from '@nestjs/common';
import { HttpModule, HttpService} from '@nestjs/axios'
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ClubModule } from './club/club.module';
import { JugadorModule } from './jugador/jugador.module';
import { lastValueFrom } from 'rxjs';



@Module({
  imports: [
    HttpModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/nest-laliga'),
    ClubModule,
    JugadorModule,
  ],
  controllers: [],
  providers: [
    {
      provide:'Task',
      useFactory: async (http: HttpService)=>{
       const request = http.get('https://jsonplaceholder.typicode.com/todos');
       const task = await lastValueFrom(request);
       //console.log(task.data)
       return task.data;
      },
      inject:[HttpService],
    }
  ],
})
export class AppModule {}
