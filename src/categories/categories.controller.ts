import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, Request, Res, ParseBoolPipe, DefaultValuePipe } from '@nestjs/common';
import { Response } from 'express';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('v1/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto, @Request() request) {
    return this.categoriesService.create(createCategoryDto, request.user.sub, request.user.role);
  }

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('relations', new DefaultValuePipe(false), ParseBoolPipe) relations: boolean
  ) {
    return this.categoriesService.findAll(page, limit, relations);
  }

  @Get(':id')
  findOne(
    @Param('id') id: number,
    @Query('relations', new DefaultValuePipe(false), ParseBoolPipe) relations: boolean
  ) {
    return this.categoriesService.findOne(id, relations);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto, @Request() request) {
    return this.categoriesService.update(id, updateCategoryDto, request.user.sub, request.user.role);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(
    @Param('id') id: number,
    @Query('cascade', new DefaultValuePipe(false), ParseBoolPipe) cascade: boolean,
    @Res() response: Response,
    @Request() request
  ) {
    await this.categoriesService.remove(id, cascade, request.user.role);
    response.sendStatus(204);
  }

  @Get(':id/movies')
  findMovies(@Param('id') id: number) {
    return this.categoriesService.findMovies(id);
  }
}
