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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaloonController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const saloon_service_1 = require("./saloon.service");
const create_saloon_dto_1 = require("./dto/create-saloon.dto");
const access_token_guard_1 = require("../auth/guards/access-token.guard");
const book_saloon_dto_1 = require("./dto/book-saloon.dto");
const swagger_1 = require("@nestjs/swagger");
const review_dto_1 = require("./dto/review.dto");
let SaloonController = class SaloonController {
    saloonService;
    constructor(saloonService) {
        this.saloonService = saloonService;
    }
    async createSaloon(createSaloonDto) {
        return this.saloonService.createSaloon(createSaloonDto);
    }
    async getAllSaloons(paginationDto) {
        return this.saloonService.getAllSaloons(paginationDto);
    }
    async getSaloonsByLocation(city, place, latitude, longitude) {
        return this.saloonService.getSaloonsByLocation(city, place, latitude, longitude);
    }
    async getSalonById(id) {
        return this.saloonService.getSalonById(id);
    }
    async addSaloonEmployee(req, addSaloonEmployeeDto) {
        return this.saloonService.addSaloonEmployee(req.user.sub, addSaloonEmployeeDto);
    }
    async getSaloonEmployees(req, paginationDto) {
        return this.saloonService.getAllEmployees(req.user.sub, paginationDto);
    }
    async bookSaloon(req, body) {
        return this.saloonService.bookSaloon(req.user.sub, body);
    }
    async getMyBookings(req, paginationDto) {
        return this.saloonService.getMyBookings(req.user.sub, paginationDto);
    }
    async getMyBookingsByEmployee(req, paginationDto) {
        return this.saloonService.getMyBookingsByEmployee(req.user.sub, paginationDto);
    }
    async updateBookingStatus(req, body) {
        return this.saloonService.updateBookingStatus(req.user.sub, req.params.bookingId, body.status);
    }
    async deleteSaloon(req, saloonId) {
        return this.saloonService.deleteSaloon(saloonId);
    }
    async deleteEmployee(req, employeeId) {
        return this.saloonService.deleteEmployee(employeeId);
    }
    async addReview(req, createReviewDto) {
        return this.saloonService.addReview(req.user.sub, createReviewDto);
    }
    async getReview(req, bookingId) {
        return this.saloonService.getReview(req.user.sub, bookingId);
    }
    async getSalonReviews(req, salonId) {
        return this.saloonService.getSalonReviews(salonId);
    }
    async getStylistReviews(req, stylistId) {
        return this.saloonService.getStylistReviews(stylistId);
    }
};
exports.SaloonController = SaloonController;
__decorate([
    (0, common_1.Post)('create'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_saloon_dto_1.CreateSaloonDto]),
    __metadata("design:returntype", Promise)
], SaloonController.prototype, "createSaloon", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Get)('get-all-saloons'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_saloon_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], SaloonController.prototype, "getAllSaloons", null);
__decorate([
    (0, common_1.Get)('by-location'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('city')),
    __param(1, (0, common_1.Query)('place')),
    __param(2, (0, common_1.Query)('latitude')),
    __param(3, (0, common_1.Query)('longitude')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], SaloonController.prototype, "getSaloonsByLocation", null);
__decorate([
    (0, common_1.Get)('get-salon/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SaloonController.prototype, "getSalonById", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Post)('add-saloon-employee'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_saloon_dto_1.AddSaloonEmployeeDto]),
    __metadata("design:returntype", Promise)
], SaloonController.prototype, "addSaloonEmployee", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Get)('get-saloon-employees'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_saloon_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], SaloonController.prototype, "getSaloonEmployees", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Post)('book-saloon'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, book_saloon_dto_1.CreateBookSaloonDto]),
    __metadata("design:returntype", Promise)
], SaloonController.prototype, "bookSaloon", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Get)('get-my-bookings'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_saloon_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], SaloonController.prototype, "getMyBookings", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Get)('get-saloon-bookings-employees'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_saloon_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], SaloonController.prototype, "getMyBookingsByEmployee", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Patch)('update-booking-status/:bookingId'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SaloonController.prototype, "updateBookingStatus", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Delete)('saloon/:saloonId'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('saloonId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SaloonController.prototype, "deleteSaloon", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Delete)('employee/:employeeId'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SaloonController.prototype, "deleteEmployee", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Post)('add-review'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, review_dto_1.CreateReviewDto]),
    __metadata("design:returntype", Promise)
], SaloonController.prototype, "addReview", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Get)('get-review/:bookingId'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('bookingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SaloonController.prototype, "getReview", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Get)('get-salon-reviews/:salonId'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('salonId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SaloonController.prototype, "getSalonReviews", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Get)('get-stylist-reviews/:stylistId'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('stylistId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SaloonController.prototype, "getStylistReviews", null);
exports.SaloonController = SaloonController = __decorate([
    (0, swagger_1.ApiBearerAuth)('defaultBearerAuth'),
    (0, common_1.Controller)('saloon'),
    __metadata("design:paramtypes", [saloon_service_1.SaloonService])
], SaloonController);
//# sourceMappingURL=saloon.controller.js.map