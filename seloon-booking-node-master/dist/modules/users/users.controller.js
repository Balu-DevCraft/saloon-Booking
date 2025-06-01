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
exports.UsersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const access_token_guard_1 = require("../auth/guards/access-token.guard");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async createUser(req, createUserDto, avatar) {
        return this.usersService.createUser(req.user.sub, req.user.orgId, createUserDto, avatar);
    }
    async getUsers(req, query) {
        return this.usersService.getUsers(req.user.orgId, query);
    }
    async getUser(req, userId) {
        return this.usersService.getUser(req.user.orgId, userId);
    }
    async profileView(req, userId) {
        return this.usersService.profileView(req.user.orgId, userId);
    }
    async updateUser(req, userId, updateUserDto, avatar) {
        return this.usersService.updateUser(req.user.sub, req.user.orgId, userId, updateUserDto, avatar);
    }
    async deleteUser(req, userId) {
        return this.usersService.deleteUser(req.user.sub, req.user.orgId, userId);
    }
    async deactivateUser(req, userId) {
        return this.usersService.deactivateUser(req.user.sub, req.user.orgId, userId);
    }
    async signup(createUserDto) {
        return this.usersService.userSignup(createUserDto);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Post)('create-user'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new user with avatar' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                email: { type: 'string' },
                employeeId: { type: 'string' },
                officeLocationId: { type: 'string' },
                departmentId: { type: 'string' },
                designationId: { type: 'string' },
                roleId: { type: 'string' },
                isActive: { type: 'boolean' },
                avatar: {
                    type: 'string',
                    format: 'binary',
                    description: 'User avatar image'
                }
            }
        }
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar')),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Get)('get-users'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_user_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Get)('get-user/:userId'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUser", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Get)('profile/:userId'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "profileView", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Patch)('update-user/:userId'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new user with avatar' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                email: { type: 'string' },
                employeeId: { type: 'string' },
                officeLocationId: { type: 'string' },
                departmentId: { type: 'string' },
                designationId: { type: 'string' },
                roleId: { type: 'string' },
                isActive: { type: 'boolean' },
                avatar: {
                    type: 'string',
                    format: 'binary',
                    description: 'User avatar image'
                }
            }
        }
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar')),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Delete)('delete-user/:userId'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Patch)('deactivate-user/:userId'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deactivateUser", null);
__decorate([
    (0, common_1.Post)('signup'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signup", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiBearerAuth)('defaultBearerAuth'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map