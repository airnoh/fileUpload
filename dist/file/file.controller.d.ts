export declare class FileController {
    uploadMultipleFiles(files: any): Promise<any[]>;
    seeUploadedFile(image: any, res: any): any;
    deleteImg(image: any, req: any, res: any): Promise<string>;
}
