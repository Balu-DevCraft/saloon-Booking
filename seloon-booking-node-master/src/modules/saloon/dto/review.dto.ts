import { IsNotEmpty, IsNumber, IsString, Max, Min, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateReviewDto {
    @IsNotEmpty()
    @IsString()
    @Matches(/^[0-9a-fA-F]{24}$/, {
        message: 'bookingId must be a valid MongoDB ObjectId'
    })
    bookingId: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^[0-9a-fA-F]{24}$/, {
        message: 'stylistId must be a valid MongoDB ObjectId'
    })
    stylistId: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^[0-9a-fA-F]{24}$/, {
        message: 'saloonId must be a valid MongoDB ObjectId'
    })
    saloonId: string;

    @IsNotEmpty()
    @Transform(({ value }) => Number(value))
    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number;

    @IsNotEmpty()
    @IsString()
    comment: string;

    @IsNotEmpty()
    @Transform(({ value }) => Number(value))
    @IsNumber()
    @Min(1)
    @Max(5)
    stylistRating: number;

    @IsNotEmpty()
    @IsString()
    stylistComment: string;
} 