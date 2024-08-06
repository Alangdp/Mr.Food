import { RequestHandler } from 'express';
import { errorResponse, response } from '../utils/responses.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import { isValidExtrasStructure } from '../utils/validExtraOptions.js';
import Company from '../models/Company.js';
import { parseFormData } from '../utils/parseFormData.js';
import { unlinkSync } from 'fs';

const index: RequestHandler = async (req, res) => {
  try {
    const { id: companyId } = req.body;
    if (!companyId) {
      return response(res, {
        errors: [{ message: 'companyId is required' }],
        status: 400,
      });
    }
    const products = await Product.findAll({ where: { companyId } });
    return response(res, { data: products, status: 200 });
  } catch (error) {
    return errorResponse(res, error);
  }
};

const indexActives: RequestHandler = async (req, res) => {
  try {
    const { id: companyId } = req.body;
    if (!companyId) {
      return response(res, {
        errors: [{ message: 'companyId is required' }],
        status: 400,
      });
    }
    const products = await Product.findAll({
      where: { companyId, active: true },
    });
    return response(res, { data: products, status: 200 });
  } catch (error) {
    return errorResponse(res, error);
  }
};

const store: RequestHandler = async (req, res) => {
  try {
    const { id: companyId, categoryId } = req.body;
    const requiredFields = ['name', 'price', 'extras', 'description'];
    if (!companyId) {
      return response(res, {
        errors: [{ message: 'companyId and categoryId are required' }],
        status: 400,
      });
    }
    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length) {
      return response(res, {
        errors: missingFields.map(field => ({
          message: `${field} is required`,
        })),
        status: 400,
      });
    }

    const isValidExtrasStructureData = isValidExtrasStructure(req.body.extras);
    if (!isValidExtrasStructureData.isValid) {
      return response(res, {
        errors: [{ message: 'Invalid extras structure' }],
        status: 400,
      });
    }

    const categorys: Category[] = [];
    if (isValidExtrasStructureData.categories) {
      for (const category of isValidExtrasStructureData.categories) {
        const newCategory = await Category.create({
          companyId: companyId,
          name: category.name,
          min: category.min,
          max: category.max,
          obrigatory: category.obrigatory,
          type: 'PRODUCT',
        });
        categorys.push(newCategory);
      }
    }
    if (
      categoryId &&
      !(await Category.categoryBelongsToCompany(categoryId, companyId))
    ) {
      return response(res, {
        errors: [{ message: 'Category does not belong to company' }],
        status: 400,
      });
    }

    delete req.body.id;
    const product = await Product.create({
      companyId: companyId,
      categoryId: req.body.category,
      discountPercent: req.body.discount || 0,
      ...req.body,
    });

    return response(res, { data: product, status: 201 });
  } catch (error) {
    return errorResponse(res, error);
  }
};

const storePhoto: RequestHandler = async (req, res) => {
  try {
    const { id: companyId, categoryId } = req.body;
    const requiredFields = ['name', 'price', 'extras', 'describe'];
    if (!companyId) {
      return response(res, {
        errors: [{ message: 'companyId and categoryId are required' }],
        status: 400,
      });
    }

    const parsedData = parseFormData(req.body);
    console.log(parsedData);
    if (!parsedData.extras) parsedData.extras = [];
    const missingFields = requiredFields.filter(field => {
      return !parsedData[field];
    });

    if (missingFields.length) {
      return response(res, {
        errors: missingFields.map(field => ({
          message: `${field} is required`,
        })),
        status: 400,
      });
    }

    const isValidExtrasStructureData = isValidExtrasStructure(
      parsedData.extras,
    );
    if (!isValidExtrasStructureData.isValid) {
      throw new Error('Invalid extras structure');
    }

    if (
      categoryId &&
      !(await Category.categoryBelongsToCompany(categoryId, companyId))
    ) {
      return response(res, {
        errors: [{ message: 'Category does not belong to company' }],
        status: 400,
      });
    }

    delete req.body.id;
    delete parsedData.id;
    const toBuild = {
      companyId: companyId,
      categoryId: parsedData.category,
      discountPercent: parsedData.discount || 0,
      ...parsedData,
    };

    const product = await Product.create(toBuild);

    return response(res, { data: product, status: 201 });
  } catch (error) {
    if (req.files) {
      const files = req.files as Express.Multer.File[];
      for (const file of files) {
        console.log(file);
        unlinkSync(file.path);
      }
    }

    return errorResponse(res, error);
  }
};

const destroy: RequestHandler = async (req, res) => {
  try {
    const { id: companyId, productId } = req.body;
    if (!companyId) {
      return response(res, {
        errors: [{ message: 'companyId is required' }],
        status: 400,
      });
    }
    if (!productId) {
      return response(res, {
        errors: [{ message: 'productId is required' }],
        status: 400,
      });
    }
    const product = await Product.findByPk(productId);
    await product?.destroy();
    return response(res, { status: 204 });
  } catch (error) {
    return errorResponse(res, error);
  }
};

const update: RequestHandler = async (req, res) => {
  try {
    const { id: companyId, productId, categoryId } = req.body;
    if (!companyId || !productId) {
      return response(res, {
        errors: [{ message: 'companyId and productId are required' }],
        status: 400,
      });
    }
    if (
      categoryId &&
      !(await Category.categoryBelongsToCompany(categoryId, companyId))
    ) {
      return response(res, {
        errors: [{ message: 'Category does not belong to company' }],
        status: 400,
      });
    }
    const product = await Product.findByPk(productId);
    if (!product) {
      return response(res, {
        errors: [{ message: 'Product not found' }],
        status: 404,
      });
    }
    if (!isValidExtrasStructure(req.body.extras)) {
      return response(res, {
        errors: [{ message: 'Invalid extras structure' }],
        status: 400,
      });
    }
    delete req.body.id;
    const updatedProduct = await product.update({
      companyId: companyId,
      categoryId,
      ...req.body,
    });
    await product.save();
    return response(res, { data: updatedProduct, status: 200 });
  } catch (error) {
    return errorResponse(res, error);
  }
};

const indexById: RequestHandler = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findByPk(productId);
    if (!product) throw new Error('Product not found');
    const company = await Company.findByPk(product.companyId);
    if (!company) throw new Error('Company not found');

    return response(res, {
      data: {
        product: product.dataValues,
        company: {
          id: company.id,
          name: company.name,
          logo: '',
          phone: company.phone,
          orderMinimum: company.orderMinimum,
          deliveryOptions: company.deliveryOptions,
        },
      },
      status: 200,
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

const changeActive: RequestHandler = async (req, res) => {
  try {
    const { id: companyId } = req.body;
    const { productId } = req.params;
    if (!companyId || !productId) {
      return response(res, {
        errors: [{ message: 'companyId and productId are required' }],
        status: 400,
      });
    }
    const product = await Product.findByPk(productId);
    if (!product) {
      return response(res, {
        errors: [{ message: 'Product not found' }],
        status: 404,
      });
    }
    const updatedProduct = await product.update({
      active: !product.active,
    });
    await product.save();
    return response(res, { data: updatedProduct, status: 200 });
  } catch (error) {
    return errorResponse(res, error);
  }
};

const indexAllWithCompany: RequestHandler = async (req, res) => {
  try {
    const { companyId } = req.body;
    const products = await Product.findAll({
      where: {
        companyId,
      },
    });
    const categories = await Category.findAll({ where: { companyId } });
    const company = await Company.findByPk(companyId);
    if (!company) {
      return response(res, {
        errors: [{ message: 'Company not found' }],
        status: 404,
      });
    }
    return response(res, {
      status: 200,
      data: {
        company: {
          id: company.id,
          name: company.name,
          logo: '',
          phone: company.phone,
          orderMinimum: company.orderMinimum,
          deliveryOptions: company.deliveryOptions,
        },
        products,
        categories: categories.filter(category => category.type === 'CATEGORY'),
      },
    });
  } catch (error) {
    console.log(error);
    return errorResponse(res, error);
  }
};

export {
  store,
  destroy,
  update,
  index,
  indexActives,
  indexById,
  changeActive,
  indexAllWithCompany,
  storePhoto,
};
