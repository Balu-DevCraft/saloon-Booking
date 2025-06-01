"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSaloonEmployeeDto = exports.PaginationDto = exports.CreateSaloonDto = void 0;
const openapi = require("@nestjs/swagger");
class CreateSaloonDto {
    name;
    city;
    place;
    latitude;
    longitude;
    password;
    email;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, city: { required: true, type: () => String }, place: { required: true, type: () => String }, latitude: { required: false, type: () => String }, longitude: { required: false, type: () => String }, password: { required: true, type: () => String }, email: { required: true, type: () => String } };
    }
}
exports.CreateSaloonDto = CreateSaloonDto;
class PaginationDto {
    page;
    limit;
    isActive;
    search;
    saloonId;
    static _OPENAPI_METADATA_FACTORY() {
        return { page: { required: true, type: () => Number }, limit: { required: true, type: () => Number }, isActive: { required: true, type: () => Boolean }, search: { required: false, type: () => String }, saloonId: { required: false, type: () => String } };
    }
}
exports.PaginationDto = PaginationDto;
class AddSaloonEmployeeDto {
    name;
    email;
    password;
    specialization;
    workHistory;
    image;
    openingTimes;
    isActive;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: true, type: () => String }, specialization: { required: true, type: () => [String] }, workHistory: { required: false, type: () => String }, image: { required: false, type: () => String }, openingTimes: { required: false, type: () => String }, isActive: { required: false, type: () => Boolean } };
    }
}
exports.AddSaloonEmployeeDto = AddSaloonEmployeeDto;
//# sourceMappingURL=create-saloon.dto.js.map