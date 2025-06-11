import { Body, Controller, Get, Post, UseGuards, Request, Query, Patch, Delete, Param } from '@nestjs/common';
import { SaloonService } from './saloon.service';
import { AddSaloonEmployeeDto, CreateSaloonDto, PaginationDto } from './dto/create-saloon.dto';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { CreateBookSaloonDto } from './dto/book-saloon.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateReviewDto } from './dto/review.dto';

@ApiBearerAuth('defaultBearerAuth')
@Controller('saloon')
export class SaloonController {
  constructor(private readonly saloonService: SaloonService) { }

  // 
  @Post('create')
  async createSaloon(@Body() createSaloonDto: CreateSaloonDto) {
    return this.saloonService.createSaloon(createSaloonDto);
  }


  @UseGuards(AccessTokenGuard)
  @Get('get-all-saloons')
  async getAllSaloons(@Query() paginationDto: PaginationDto) {
    return this.saloonService.getAllSaloons(paginationDto);
  }

  @Get('by-location')
  async getSaloonsByLocation(
    @Query('city') city: string,
    @Query('place') place: string,
    @Query('latitude') latitude: string,
    @Query('longitude') longitude: string,
  ) {
    return this.saloonService.getSaloonsByLocation(city, place, latitude, longitude);
  }

  @Get('get-salon/:id')
  async getSalonById(@Param('id') id: string) {
    return this.saloonService.getSalonById(id);
  }

  @UseGuards(AccessTokenGuard)
  @Post('add-saloon-employee')
  async addSaloonEmployee(@Request() req, @Body() addSaloonEmployeeDto: AddSaloonEmployeeDto) {
    return this.saloonService.addSaloonEmployee(req.user.sub, addSaloonEmployeeDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get('get-saloon-employees')
  async getSaloonEmployees(@Request() req, @Query() paginationDto: PaginationDto) {
    return this.saloonService.getAllEmployees(req.user.sub, paginationDto);
  }

  @UseGuards(AccessTokenGuard)
  @Post('book-saloon')
  async bookSaloon(@Request() req, @Body() body: CreateBookSaloonDto) {
    return this.saloonService.bookSaloon(req.user.sub, body);
  }

  @UseGuards(AccessTokenGuard)
  @Get('get-my-bookings')
  async getMyBookings(@Request() req, @Query() paginationDto: PaginationDto) {
    return this.saloonService.getMyBookings(req.user.sub, paginationDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get('get-saloon-bookings-employees')
  async getMyBookingsByEmployee(@Request() req, @Query() paginationDto: PaginationDto) {
    return this.saloonService.getMyBookingsByEmployee(req.user.sub, paginationDto);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('update-booking-status/:bookingId')
  async updateBookingStatus(@Request() req, @Body() body: { status: string }) {
    return this.saloonService.updateBookingStatus(req.user.sub, req.params.bookingId, body.status);

  }


  @UseGuards(AccessTokenGuard)
  @Delete('saloon/:saloonId')
  async deleteSaloon(@Request() req, @Param('saloonId') saloonId: string) {
    return this.saloonService.deleteSaloon(saloonId);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('employee/:employeeId')
  async deleteEmployee(@Request() req, @Param('employeeId') employeeId: string) {
    return this.saloonService.deleteEmployee(employeeId);
  }

  @UseGuards(AccessTokenGuard)
  @Post('add-review')
  async addReview(@Request() req, @Body() createReviewDto: CreateReviewDto) {
    return this.saloonService.addReview(req.user.sub, createReviewDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get('get-review/:bookingId')
  async getReview(@Request() req, @Param('bookingId') bookingId: string) {
    return this.saloonService.getReview(req.user.sub, bookingId);
  }

  @UseGuards(AccessTokenGuard)
  @Get('get-salon-reviews/:salonId')
  async getSalonReviews(@Request() req, @Param('salonId') salonId: string) {
    return this.saloonService.getSalonReviews(salonId);
  }

  @UseGuards(AccessTokenGuard)
  @Get('get-stylist-reviews/:stylistId')
  async getStylistReviews(@Request() req, @Param('stylistId') stylistId: string) {
    return this.saloonService.getStylistReviews(stylistId);
  }
}
