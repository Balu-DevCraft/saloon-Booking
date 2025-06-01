import { LoginDto } from './dto/login.dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    private userModel;
    constructor(jwtService: JwtService, userModel: Model<UserDocument>);
    login(loginDto: LoginDto): Promise<{
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
        user: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
            _id: string;
        }> & {
            __v: number;
        }, {}> & import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
            _id: string;
        }> & {
            __v: number;
        };
    }>;
    me(userId: string): Promise<{
        message: string;
        data: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
            _id: string;
        }> & {
            __v: number;
        }> & Required<{
            _id: string;
        }>) | null;
    }>;
    private generateTokens;
    generateAccessToken(user: UserDocument): string;
    resetPassword(userId: string, resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    logout(userId: string): Promise<{
        message: string;
    }>;
}
