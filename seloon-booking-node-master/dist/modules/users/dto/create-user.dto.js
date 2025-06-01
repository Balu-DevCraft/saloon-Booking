"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationDto = exports.CreateDesignationDto = exports.CreateDepartmentDto = exports.CreateUserDto = void 0;
const openapi = require("@nestjs/swagger");
class CreateUserDto {
    name;
    email;
    password;
    isActive;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: true, type: () => String }, isActive: { required: true, type: () => Boolean } };
    }
}
exports.CreateUserDto = CreateUserDto;
class CreateDepartmentDto {
    name;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String } };
    }
}
exports.CreateDepartmentDto = CreateDepartmentDto;
class CreateDesignationDto {
    name;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String } };
    }
}
exports.CreateDesignationDto = CreateDesignationDto;
class PaginationDto {
    page;
    limit;
    isActive;
    static _OPENAPI_METADATA_FACTORY() {
        return { page: { required: true, type: () => Number }, limit: { required: true, type: () => Number }, isActive: { required: true, type: () => Boolean } };
    }
}
exports.PaginationDto = PaginationDto;
//# sourceMappingURL=create-user.dto.js.map