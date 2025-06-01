import { ConfigService } from '@nestjs/config';
export declare class S3Service {
    private configService;
    private region;
    private s3;
    private logger;
    constructor(configService: ConfigService);
    uploadFile(file: Express.Multer.File, folder: string, fileName: string): Promise<string>;
}
