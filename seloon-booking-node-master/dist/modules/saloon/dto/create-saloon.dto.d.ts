export declare class CreateSaloonDto {
    name: string;
    city: string;
    place: string;
    latitude?: string;
    longitude?: string;
    password: string;
    email: string;
}
export declare class PaginationDto {
    page: number;
    limit: number;
    isActive: boolean;
    search?: string;
    saloonId?: string;
}
export declare class AddSaloonEmployeeDto {
    name: string;
    email: string;
    password: string;
    specialization: string[];
    workHistory?: string;
    image?: string;
    openingTimes?: string;
    isActive?: boolean;
}
