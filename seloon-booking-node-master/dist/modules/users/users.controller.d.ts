import { UsersService } from './users.service';
import { CreateUserDto, PaginationDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(req: any, createUserDto: CreateUserDto, avatar: Express.Multer.File): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas/user.schema").User, {}> & import("../../schemas/user.schema").User & Required<{
            _id: string;
        }> & {
            __v: number;
        }, {}> & import("mongoose").Document<unknown, {}, import("../../schemas/user.schema").User, {}> & import("../../schemas/user.schema").User & Required<{
            _id: string;
        }> & {
            __v: number;
        };
    }>;
    getUsers(req: any, query: PaginationDto): Promise<{
        message: string;
        data: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("../../schemas/user.schema").User, {}> & import("../../schemas/user.schema").User & Required<{
            _id: string;
        }> & {
            __v: number;
        }> & Required<{
            _id: string;
        }>)[];
        total: number;
    }>;
    getUser(req: any, userId: string): Promise<{
        message: string;
        data: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("../../schemas/user.schema").User, {}> & import("../../schemas/user.schema").User & Required<{
            _id: string;
        }> & {
            __v: number;
        }> & Required<{
            _id: string;
        }>) | null;
    }>;
    profileView(req: any, userId: string): Promise<{
        message: string;
        data: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("../../schemas/user.schema").User, {}> & import("../../schemas/user.schema").User & Required<{
            _id: string;
        }> & {
            __v: number;
        }> & Required<{
            _id: string;
        }>) | null;
    }>;
    updateUser(req: any, userId: string, updateUserDto: UpdateUserDto, avatar: Express.Multer.File): Promise<{
        message: string;
        data: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("../../schemas/user.schema").User, {}> & import("../../schemas/user.schema").User & Required<{
            _id: string;
        }> & {
            __v: number;
        }> & Required<{
            _id: string;
        }>) | null;
    }>;
    deleteUser(req: any, userId: string): Promise<{
        message: string;
    }>;
    deactivateUser(req: any, userId: string): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas/user.schema").User, {}> & import("../../schemas/user.schema").User & Required<{
            _id: string;
        }> & {
            __v: number;
        }, {}> & import("mongoose").Document<unknown, {}, import("../../schemas/user.schema").User, {}> & import("../../schemas/user.schema").User & Required<{
            _id: string;
        }> & {
            __v: number;
        };
    }>;
    signup(createUserDto: CreateUserDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas/user.schema").User, {}> & import("../../schemas/user.schema").User & Required<{
            _id: string;
        }> & {
            __v: number;
        }, {}> & import("mongoose").Document<unknown, {}, import("../../schemas/user.schema").User, {}> & import("../../schemas/user.schema").User & Required<{
            _id: string;
        }> & {
            __v: number;
        };
    }>;
}
