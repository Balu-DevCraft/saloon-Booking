import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { JwtPayload } from '../strategies/access-token.strategy';
declare const RefreshTokenStrategy_base: new (...args: any) => any;
export declare class RefreshTokenStrategy extends RefreshTokenStrategy_base {
    constructor(configService: ConfigService);
    validate(req: Request, payload: JwtPayload): Promise<JwtPayload>;
}
export {};
