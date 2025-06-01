import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
export declare class PermissionGuard implements CanActivate {
    private readonly reflector;
    private readonly jwtService;
    constructor(reflector: Reflector, jwtService: JwtService);
    private matchPermissions;
    canActivate(context: ExecutionContext): boolean;
}
