"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const http_exception_filter_1 = require("./modules/common/filters/http-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('nex-projects API')
        .setDescription('nex-projects API documentation')
        .setVersion('0.0.101')
        .addTag('projects')
        .addBearerAuth({
        description: 'Default JWT Authorization',
        type: 'http',
        in: 'header',
        scheme: 'bearer',
        bearerFormat: 'JWT',
    }, 'defaultBearerAuth')
        .setContact('sreesayanth', 'https://dataguardnxt.com/', 'sree@dataguardnxt.com')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.enableCors();
    app.useGlobalFilters(new http_exception_filter_1.AllExceptionsFilter());
    await app.listen(process.env.PORT ?? 3000);
    common_1.Logger.log(`🚀 Server started on port ${process.env.PORT || 3000} `, 'Bootstrap');
}
bootstrap();
//# sourceMappingURL=main.js.map