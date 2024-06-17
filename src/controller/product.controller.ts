import { RequestHandler } from "express";
import { errorResponse, response } from "../utils/responses.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
// FUNCTIONS

function isValidExtrasStructure(extras: any) {
  try {
    if (typeof extras !== 'object' || extras === null) {
      return false;
    }
    for (const extraName in extras) {
      const extra = extras[extraName];
      if (!Array.isArray(extra.options)) {
        return false;
      }
      if (typeof extra.maxQuantity !== 'number' || isNaN(extra.maxQuantity)) {
        return false;
      }
      for (const option of extra.options) {
        if (typeof option.name !== 'string' || typeof option.price !== 'number' || isNaN(option.price)) {
          return false;
        }
      }
    }
    return true;
  } catch (error) {
    return false;
  }
}

const index: RequestHandler = async (req, res) => {
  try {
    const { id: companyId } = req.body;
    if(!companyId) {
      return response(res, {errors: [{message: "companyId is required"}], status: 400});
    }
    const products = await Product.findAll({where: { companyId }});
    return response(res, {data: products, status: 200});
  } catch (error) {
    return errorResponse(res, error);
  }
};

const indexActives: RequestHandler = async (req, res) => {
  try {
    const { id: companyId } = req.body;
    if(!companyId) {
      return response(res, {errors: [{message: "companyId is required"}], status: 400});
    }
    const products = await Product.findAll({where: { companyId, active: true }});
    return response(res, {data: products, status: 200});
  } catch (error) {
    return errorResponse(res, error);
  }

};

const store: RequestHandler = async (req, res) => {
  try {
    const { id: companyId, categoryId} = req.body;
    const requiredFields = [
      "name",
      "price",
      "extras",
      "description"
    ];
    if(!companyId) {
      return response(res, {errors: [{message: "companyId and categoryId are required"}], status: 400});
    }
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length) {
      return response(res, {errors: missingFields.map((field) => ({message: `${field} is required`})), status: 400});
    }
    if(!isValidExtrasStructure(req.body.extras)) {
      return response(res, {errors: [{message: "Invalid extras structure"}], status: 400});
    }
    if(categoryId && !await Category.categoryBelongsToCompany(categoryId, companyId)) {
      return response(res, {errors: [{message: "Category does not belong to company"}], status: 400});
    }

    delete req.body.id;
    const product = await Product.create({
      companyId: companyId,
      categoryId,
      ...req.body,
    });

    return response(res, {data: product, status: 201});
  } catch (error) {
    return errorResponse(res, error);
  }
};

const destroy: RequestHandler = async (req, res) => {
  try {
    const { id: companyId, productId} = req.body;
    if(!companyId) {
      return response(res, {errors: [{message: "companyId is required"}], status: 400});
    }
    if(!productId) {
      return response(res, {errors: [{message: "productId is required"}], status: 400});
    }
    const product = await Product.findByPk(productId);
    await product?.destroy();
    return response(res, {status: 204});
  } catch (error) {
    return errorResponse(res, error);
  }
};

const update: RequestHandler = async (req, res) => {
  try {
    const { id: companyId, productId, categoryId} = req.body;
    if(!companyId || !productId) {
      return response(res, {errors: [{message: "companyId and productId are required"}], status: 400});
    }
    if(categoryId && !await Category.categoryBelongsToCompany(categoryId, companyId)) {
      return response(res, {errors: [{message: "Category does not belong to company"}], status: 400});
    }
    const product = await Product.findByPk(productId);
    if(!product) {
      return response(res, {errors: [{message: "Product not found"}], status: 404});
    }
    if(!isValidExtrasStructure(req.body.extras)) {
      return response(res, {errors: [{message: "Invalid extras structure"}], status: 400});
    }
    delete req.body.id;
    const updatedProduct = await product.update({
      companyId: companyId,
      categoryId,
      ...req.body,
    });
    await product.save();
    return response(res, {data: updatedProduct, status: 200});
  } catch( error ) {
    return errorResponse(res, error);
  }
};

export { store, destroy, update, index, indexActives };
