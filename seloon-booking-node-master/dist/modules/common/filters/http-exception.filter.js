"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AllExceptionsFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
let AllExceptionsFilter = AllExceptionsFilter_1 = class AllExceptionsFilter {
    logger = new common_1.Logger(AllExceptionsFilter_1.name);
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        this.logger.error(`Exception: ${exception.message}`, exception.stack);
        if (exception instanceof mongodb_1.MongoError && exception.code === 11000) {
            const duplicatedKeys = Object.keys(exception['keyValue'] || {});
            response.status(common_1.HttpStatus.CONFLICT).json({
                statusCode: common_1.HttpStatus.CONFLICT,
                message: `Duplicate key error for fields: ${duplicatedKeys.join(', ')}`,
                timestamp: new Date().toISOString(),
                path: request.url,
                ...(process.env.NODE_ENV !== 'production' && {
                    details: exception['keyValue']
                }),
            });
            return;
        }
        if (exception instanceof common_1.HttpException) {
            const status = exception.getStatus();
            const exceptionResponse = exception.getResponse();
            let message = typeof exceptionResponse === 'object'
                ? exceptionResponse.message
                : exceptionResponse;
            if (Array.isArray(message)) {
                message = message;
            }
            response.status(status).json({
                statusCode: status,
                message,
                timestamp: new Date().toISOString(),
                path: request.url,
                ...(process.env.NODE_ENV !== 'production' && {
                    stack: exception.stack
                }),
            });
            return;
        }
        response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            message: process.env.NODE_ENV === 'production'
                ? 'Internal server error'
                : exception.message || 'Unexpected error occurred',
            timestamp: new Date().toISOString(),
            path: request.url,
            ...(process.env.NODE_ENV !== 'production' && {
                stack: exception.stack
            }),
        });
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = AllExceptionsFilter_1 = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
//# sourceMappingURL=http-exception.filter.js.map