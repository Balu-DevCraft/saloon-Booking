"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBookSaloonDto = void 0;
const openapi = require("@nestjs/swagger");
class CreateBookSaloonDto {
    saloonId;
    employeeId;
    bookingDate;
    name;
    phoneNumber;
    email;
    service;
    notes;
    static _OPENAPI_METADATA_FACTORY() {
        return { saloonId: { required: true, type: () => Object }, employeeId: { required: true, type: () => Object }, bookingDate: { required: true, type: () => Date }, name: { required: true, type: () => String }, phoneNumber: { required: true, type: () => String }, email: { required: true, type: () => String }, service: { required: true, type: () => String }, notes: { required: true, type: () => String } };
    }
}
exports.CreateBookSaloonDto = CreateBookSaloonDto;
//# sourceMappingURL=book-saloon.dto.js.map