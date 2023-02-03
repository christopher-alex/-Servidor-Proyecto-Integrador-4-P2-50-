import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/products.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  /**
   * getMovies - Obtiene una lista de películas
   *
   * @returns {Promise<Movie[]>} Promise con un arreglo de películas
   */
  async getProducts(): Promise<Product[]> {
    const products = this.productModel.find();
    return products;
  }

  /**
   * getMovie - Obtiene una película por su ID
   *
   * @param {string} productID ID de la película a obtener
   * @returns {Promise<Movie>} Promise con la película obtenida
   */
  async getProduct(productID: string): Promise<Product> {
    const product = this.productModel.findById(productID);
    return product;
  }

  /**
   * createMovie - Crea una nueva película
   *
   * @param {CreateMovieDto} createProductDto Datos de la nueva película
   * @returns {Promise<Movie>} Promise con la película creada
   */
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  /**
   * updateMovie - Actualiza una película
   *
   * @param {string} productID ID de la película a actualizar
   * @param {CreateMovieDto} createProductDTO Datos actualizados de la película
   * @returns {Promise<Movie>} Promise con la película actualizada
   */
  async updateProduct(
    productID: string,
    createProductDTO: CreateProductDto,
  ): Promise<Product> {
    const updatedProduct = this.productModel.findByIdAndUpdate(
      productID,
      createProductDTO,
      { new: true },
    );
    return updatedProduct;
  }

  /**
   * deleteMovie - Elimina una película por su ID
   *
   * @param {string} productID ID de la película a eliminar
   * @returns {Promise<any>} Promise con la respuesta de la operación
   */
  async deleteProduct(productID: string): Promise<any> {
    const deletedProduct = this.productModel.findByIdAndDelete(productID);
    return deletedProduct;
  }
}
