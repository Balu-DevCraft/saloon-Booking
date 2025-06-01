import { ConfigService } from '@nestjs/config';
export type JwtPayload = {
    sub: string;
    email: string;
    role: string;
    organizationId: string;
};
declare const AccessTokenStrategy_base: new (...args: any) => any;
export declare class AccessTokenStrategy extends AccessTokenStrategy_base {
    constructor(configService: ConfigService);
    validate(payload: JwtPayload): Promise<JwtPayload>;
}
export {};
