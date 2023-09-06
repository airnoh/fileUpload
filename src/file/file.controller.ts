import { Controller, Delete, FileTypeValidator, Get, HttpException, MaxFileSizeValidator, Param, ParseFilePipe, Post, Req, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './utils';
import * as fs from 'fs';
import { error } from 'console';

@Controller('file')
export class FileController {

  // @Post()
  // @UseInterceptors(
  //   FileInterceptor('image'),
  // )
  // async uploadedFile(@UploadedFile() file) {
  //     const response = {
  //       originalname: file.originalname,
  //       filename: file.filename,
  //     };
  //     return response;
  // }


  @Post('multiple')
@UseInterceptors(
  FilesInterceptor('image', 3, {
    storage: diskStorage({
      destination: './src/files',
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  }),
)
async uploadMultipleFiles(@UploadedFiles() files) {
  const response = [];
  files.forEach(file => {
    const fileReponse = {
      originalname: file.originalname,
      filename: file.filename,
    };
   
    response.push(fileReponse);
  });
  return response;
}


@Get(':imgpath')
seeUploadedFile(@Param('imgpath') image, @Res() res) {
  return res.sendFile(image, { root: './src/files' });
}


@Delete(':imgpath')
  deleteImg(@Param('imgpath') image, @Req()req, @Res() res):Promise<string>{
    
      fs.rm('./src/files/' + image, (err) => {
   
        if (err) {
         throw err;
        }
    });
    return res.end(`Successfully deleted ${image}`) 
   
  }
}
