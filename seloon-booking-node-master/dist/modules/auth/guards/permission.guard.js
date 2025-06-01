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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("mongoose");
let PermissionGuard = class PermissionGuard {
    reflector;
    jwtService;
    constructor(reflector, jwtService) {
        this.reflector = reflector;
        this.jwtService = jwtService;
    }
    matchPermissions = (permissions, userPermissions, request, decodedToken) => {
        for (const permission of permissions) {
            const userPermission = userPermissions.find(p => p.startsWith(permission));
            if (userPermission) {
                if (userPermission.endsWith('.any')) {
                    return true;
                }
                else if (userPermission.endsWith('.own')) {
                    request.ownedBy = new mongoose_1.Types.ObjectId(decodedToken.sub);
                    return true;
                }
            }
        }
        return false;
    };
    canActivate(context) {
        const permissions = this.reflector.get('permissions', context.getHandler());
        if (!permissions) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];
        if (!token) {
            return false;
        }
        const decodedToken = this.jwtService.decode(token);
        const userPermissions = decodedToken['permissions'] || [];
        return this.matchPermissions(permissions, userPermissions, request, decodedToken);
    }
};
exports.PermissionGuard = PermissionGuard;
exports.PermissionGuard = PermissionGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector, jwt_1.JwtService])
], PermissionGuard);
//# sourceMappingURL=permission.guard.js.map