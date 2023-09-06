import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileModule } from './file/file.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [FileModule, 
    MulterModule.register({
      dest: './src/files',
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
