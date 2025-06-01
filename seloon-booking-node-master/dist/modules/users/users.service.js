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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../schemas/user.schema");
const fs = require("fs");
const s3_service_1 = require("../common/services/s3.service");
let UsersService = class UsersService {
    userModel;
    s3Service;
    permissionsFile = './src/modules/auth/permissions/permissions.json';
    permissions;
    constructor(userModel, s3Service) {
        this.userModel = userModel;
        this.s3Service = s3Service;
        try {
            const fileContent = fs.readFileSync(this.permissionsFile, 'utf8');
            this.permissions = JSON.parse(fileContent);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getPermissions(orgId) {
        return {
            message: 'Permissions fetched successfully',
            data: this.permissions
        };
    }
    async createUser(userId, orgId, createUserDto, avatar) {
        let avatarUrl = null;
        if (avatar != null && avatar && avatar?.size > 0) {
            const timestamp = Date.now();
            const originalFileName = avatar.originalname;
            const FileName = `${timestamp}_${originalFileName}`;
            const folder = `avatars/${orgId}`;
            avatarUrl = await this.s3Service.uploadFile(avatar, folder, FileName);
        }
        const user = await this.userModel.create({
            ...createUserDto,
            createdBy: new mongoose_2.Types.ObjectId(userId),
            orgId: new mongoose_2.Types.ObjectId(orgId),
            avatarUrl: avatarUrl
        });
        return {
            message: 'User created successfully',
            data: user
        };
    }
    async getUsers(orgId, query) {
        const page = query.page || 1;
        const limit = query.limit || 10;
        const skip = (page - 1) * limit;
        const users = await this.userModel.find({ orgId: new mongoose_2.Types.ObjectId(orgId), isActive: query.isActive }).select('id name email avatarUrl').skip(skip).limit(limit).lean();
        const total = await this.userModel.countDocuments({ orgId: new mongoose_2.Types.ObjectId(orgId), isActive: query.isActive });
        return {
            message: 'Users fetched successfully',
            data: users,
            total,
        };
    }
    async getUser(orgId, userId) {
        const user = await this.userModel.findOne({ _id: new mongoose_2.Types.ObjectId(userId), orgId: new mongoose_2.Types.ObjectId(orgId) }).lean();
        return {
            message: 'User fetched successfully',
            data: user
        };
    }
    async profileView(orgId, userId) {
        const user = await this.userModel.findOne({
            _id: new mongoose_2.Types.ObjectId(userId), orgId: new mongoose_2.Types.ObjectId(orgId)
        })
            .select('_id name avatarUrl isActive email employeeId lastActiveAt')
            .populate('roleId', 'name _id').lean();
        return {
            message: 'User fetched successfully',
            data: user
        };
    }
    async updateUser(loginUserId, orgId, userId, updateUserDto, avatar) {
        const user = await this.userModel.findOne({ _id: new mongoose_2.Types.ObjectId(userId), orgId: new mongoose_2.Types.ObjectId(orgId) });
        if (!user) {
            throw new Error('User not found');
        }
        if (avatar != null && avatar && avatar?.size > 0) {
            const timestamp = Date.now();
            const originalFileName = avatar.originalname;
            const FileName = `${timestamp}_${originalFileName}`;
            const folder = `avatars/${orgId}`;
            user.avatarUrl = await this.s3Service.uploadFile(avatar, folder, FileName);
        }
        const updatedValue = await this.userModel.findOneAndUpdate({ _id: new mongoose_2.Types.ObjectId(userId), orgId: new mongoose_2.Types.ObjectId(orgId) }, { ...updateUserDto, avatarUrl: user.avatarUrl }, { new: true }).lean();
        return {
            message: 'User updated successfully',
            data: updatedValue
        };
    }
    async deleteUser(loginUserId, orgId, userId) {
        const user = await this.userModel.findOne({ _id: new mongoose_2.Types.ObjectId(userId), orgId: new mongoose_2.Types.ObjectId(orgId) });
        if (!user) {
            throw new Error('User not found');
        }
        user.isActive = true;
        user.isDeleted = true;
        user.updatedBy = new mongoose_2.Types.ObjectId(loginUserId);
        await user.save();
        return {
            message: 'User deleted successfully',
        };
    }
    async deactivateUser(loginUserId, orgId, userId) {
        const user = await this.userModel.findOne({ _id: new mongoose_2.Types.ObjectId(userId), orgId: new mongoose_2.Types.ObjectId(orgId) });
        if (!user) {
            throw new Error('User not found');
        }
        user.isActive = false;
        user.updatedBy = new mongoose_2.Types.ObjectId(loginUserId);
        await user.save();
        return {
            message: 'User deactivated successfully',
            data: user
        };
    }
    async userSignup(CreateUserDto) {
        const existEmail = await this.userModel.findOne({ email: CreateUserDto.email });
        if (existEmail) {
            throw new Error('Email already exists');
        }
        const user = await this.userModel.create({ ...CreateUserDto, userType: user_schema_1.UserType.USER });
        return {
            message: 'User created successfully',
            data: user
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        s3_service_1.S3Service])
], UsersService);
//# sourceMappingURL=users.service.js.map