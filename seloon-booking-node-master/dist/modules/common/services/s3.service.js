"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var S3Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const config_1 = require("@nestjs/config");
let S3Service = S3Service_1 = class S3Service {
    configService;
    region;
    s3;
    logger = new common_1.Logger(S3Service_1.name);
    constructor(configService) {
        this.configService = configService;
        this.region = this.configService.get('AWS_REGION');
        this.s3 = new client_s3_1.S3Client({
            region: this.configService.get('AWS_REGION'),
        });
    }
    async uploadFile(file, folder, fileName) {
        const bucket = this.configService.get('AWS_BUCKET_NAME');
        const key = `${folder}/${fileName}`;
        const input = {
            Body: file.buffer,
            Bucket: bucket,
            Key: key,
            ContentType: file.mimetype,
        };
        try {
            const response = await this.s3.send(new client_s3_1.PutObjectCommand(input));
            if (response.$metadata.httpStatusCode === 200) {
                return `https://${bucket}.s3.${this.region}.amazonaws.com/${key}`;
            }
            throw new Error('File not saved in S3!');
        }
        catch (err) {
            this.logger.error('Cannot save file to S3:', err);
            throw err;
        }
    }
};
exports.S3Service = S3Service;
exports.S3Service = S3Service = S3Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], S3Service);
//# sourceMappingURL=s3.service.js.map