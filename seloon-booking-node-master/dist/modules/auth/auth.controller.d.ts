import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
        user: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas/user.schema").User, {}> & import("../../schemas/user.schema").User & Required<{
            _id: string;
        }> & {
            __v: number;
        }, {}> & import("mongoose").Document<unknown, {}, import("../../schemas/user.schema").User, {}> & import("../../schemas/user.schema").User & Required<{
            _id: string;
        }> & {
            __v: number;
        };
    }>;
    me(req: any): Promise<{
        message: string;
        data: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("../../schemas/user.schema").User, {}> & import("../../schemas/user.schema").User & Required<{
            _id: string;
        }> & {
            __v: number;
        }> & Required<{
            _id: string;
        }>) | null;
    }>;
    refreshToken(req: any): Promise<string>;
    resetPassword(req: any, resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    logout(req: any): Promise<{
        message: string;
    }>;
}
