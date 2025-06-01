import { ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
import { MongoError } from 'mongodb';
export declare class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger;
    catch(exception: Error | HttpException | MongoError, host: ArgumentsHost): void;
}
