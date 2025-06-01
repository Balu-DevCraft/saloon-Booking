import { CreateUserDto, PaginationDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { S3Service } from '../common/services/s3.service';
export declare class UsersService {
    private userModel;
    private readonly s3Service;
    private permissionsFile;
    private permissions;
    constructor(userModel: Model<UserDocument>, s3Service: S3Service);
    getPermissions(orgId: string): Promise<{
        message: string;
        data: any[];
    }>;
    createUser(userId: string, orgId: string, createUserDto: CreateUserDto, avatar: Express.Multer.File): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
            _id: string;
        }> & {
            __v: number;
        }, {}> & import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
            _id: string;
        }> & {
            __v: number;
        };
    }>;
    getUsers(orgId: string, query: PaginationDto): Promise<{
        message: string;
        data: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
            _id: string;
        }> & {
            __v: number;
        }> & Required<{
            _id: string;
        }>)[];
        total: number;
    }>;
    getUser(orgId: string, userId: string): Promise<{
        message: string;
        data: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
            _id: string;
        }> & {
            __v: number;
        }> & Required<{
            _id: string;
        }>) | null;
    }>;
    profileView(orgId: string, userId: string): Promise<{
        message: string;
        data: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
            _id: string;
        }> & {
            __v: number;
        }> & Required<{
            _id: string;
        }>) | null;
    }>;
    updateUser(loginUserId: string, orgId: string, userId: string, updateUserDto: UpdateUserDto, avatar: Express.Multer.File): Promise<{
        message: string;
        data: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
            _id: string;
        }> & {
            __v: number;
        }> & Required<{
            _id: string;
        }>) | null;
    }>;
    deleteUser(loginUserId: string, orgId: string, userId: string): Promise<{
        message: string;
    }>;
    deactivateUser(loginUserId: string, orgId: string, userId: string): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
            _id: string;
        }> & {
            __v: number;
        }, {}> & import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
            _id: string;
        }> & {
            __v: number;
        };
    }>;
    userSignup(CreateUserDto: CreateUserDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
            _id: string;
        }> & {
            __v: number;
        }, {}> & import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
            _id: string;
        }> & {
            __v: number;
        };
    }>;
}
