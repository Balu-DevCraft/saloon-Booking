import { IsString, IsEmail, IsOptional, IsArray, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class CreateSaloonDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    city: string;

    @ApiProperty()
    @IsString()
    place: string; // Place or area within the city

    @ApiProperty()
    @IsString()
    latitude: string;

    @ApiProperty()
    @IsString()
    longitude: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    password: string;
}

export class PaginationDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    page?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    limit?: number;

    @ApiProperty({ 
        required: false,
        type: Boolean,
        description: 'Filter by active status (true/false)'
    })
    @IsOptional()
    @Transform(({ value }) => {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return value;
    })
    @IsBoolean()
    isActive?: boolean;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    saloonId?: string;
}

export class AddSaloonEmployeeDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsOptional()
    @IsArray()
    specialization?: string[];

    @ApiProperty()
    @IsOptional()
    @IsString()
    workHistory?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    openingTimes?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    image?: string; // Base64 encoded image data
}