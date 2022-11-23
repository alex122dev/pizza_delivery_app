import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { FilteredProductsDto } from './dto/filteredProducts.dto';
import { ProductDto } from './dto/product.dto';
import { ProductsSearchQueryDto } from './dto/productsSearchQuery.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getAll(
    @Query() query: ProductsSearchQueryDto,
  ): Promise<FilteredProductsDto> {
    return this.productsService.getAll(query);
  }

  @Get(':id')
  async getOneById(@Param('id') id: number): Promise<ProductDto> {
    return this.productsService.getById(id);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: ProductsService.imageFileTypes,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    image: Express.Multer.File,
  ): Promise<ProductDto> {
    return this.productsService.create(createProductDto, image);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: ProductsService.imageFileTypes,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          fileIsRequired: false,
        }),
    )
    image: Express.Multer.File,
  ): Promise<ProductDto> {
    return this.productsService.update(id, updateProductDto, image);
  }
}
