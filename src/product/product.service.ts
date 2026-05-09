import { Injectable } from '@nestjs/common';
import { returnProductObject } from './return-product.object';
import { CategoryService } from 'src/category/category.service';
import { ProductDto } from './dto/product.dto';
import { PrismaService } from 'src/prisma.service';
import generateSlug from 'src/utisl/generate-slug';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService, private categoryService: CategoryService){}
    
        async bySlug(slug: string){
            const product = await this.prisma.product.findUnique({
                where: {
                    slug
                },
                select: returnProductObject
            })
    
            if(!product) throw new Error('Product not found')
    
            return product    
        }

        async byCategory(categorySlug: string){
            const products = await this.prisma.product.findMany({
                where: {
                    category: {
                        slug: categorySlug
                    }
                },
                select: returnProductObject
            })
    
            if(!products) throw new Error('Products not found')
    
            return products    
        }
    
        async create() {
            return this.prisma.product.create({
                data: {
                    name: '',
                    slug: '',
                    image: '',
                    description: '',
                    price: 0
                }
            })
        }
    
        async update(id: string, dto: ProductDto) {
            const {name, description, price, categoryId, image} = dto

            await this.categoryService.byId(categoryId)

            return this.prisma.product.update({
                where: {
                    id
                },
                data: {
                    name,
                    description,
                    price,
                    slug: generateSlug(name),
                    category: {
                        connect: {
                            id: categoryId
                        }
                    }
                }
            })
        }
    
        async delete(id: string) {
            return this.prisma.product.delete({
                where: {
                    id
                }
            })
        }
}
