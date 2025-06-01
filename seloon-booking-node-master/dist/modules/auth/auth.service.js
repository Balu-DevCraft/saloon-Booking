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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../../schemas/user.schema");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    jwtService;
    userModel;
    constructor(jwtService, userModel) {
        this.jwtService = jwtService;
        this.userModel = userModel;
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.userModel.findOne({ email }).select('+password');
        if (!user)
            throw new common_1.BadRequestException('Invalid credentials');
        if (!user.isActive)
            throw new common_1.UnauthorizedException('User is not active');
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            throw new common_1.BadRequestException('Invalid credentials');
        const userPermissions = [];
        const tokens = this.generateTokens(user, userPermissions);
        return { tokens, user };
    }
    async me(userId) {
        const user = await this.userModel.findById(userId)
            .lean();
        return {
            message: 'User fetched successfully',
            data: user
        };
    }
    generateTokens(user, permissions) {
        const payload = {
            sub: user._id,
            email: user.email,
            permissions
        };
        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: process.env.JWT_ACCESS_EXPIRATION,
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: process.env.JWT_REFRESH_EXPIRATION,
        });
        return { accessToken, refreshToken };
    }
    generateAccessToken(user) {
        const payload = {
            sub: user._id,
            email: user.email
        };
        return this.jwtService.sign(payload, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: process.env.JWT_ACCESS_EXPIRATION,
        });
    }
    async resetPassword(userId, resetPasswordDto) {
        const { oldPassword, newPassword } = resetPasswordDto;
        const user = await this.userModel.findById(userId).select('+password');
        if (!user)
            throw new common_1.BadRequestException('User not found');
        if (!user.isActive)
            throw new common_1.UnauthorizedException('User is not active');
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Old password is incorrect');
        }
        user.password = newPassword;
        await user.save();
        return { message: 'Password successfully updated' };
    }
    async logout(userId) {
        await this.userModel.updateOne({ _id: userId }, { $set: { refreshToken: null } });
        return { message: 'Logout successfully' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        mongoose_2.Model])
], AuthService);
//# sourceMappingURL=auth.service.js.map