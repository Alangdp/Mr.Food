import { RequestHandler } from 'express';
import { errorResponse, response } from '../utils/responses.js';
import Category from '../models/Category.js';

const store: RequestHandler = async (req, res) => {
  try {
    const { name, id: companyId } = req.body;
    if (!name)
      return response(res, {
        errors: [{ message: 'Name is required' }],
        status: 400,
      });
    let category = await Category.findByNameAndCompanyId(name, companyId);
    if (category)
      return response(res, {
        errors: [{ message: 'Category already exists', data: [] }],
        status: 400,
      });
    category = await Category.create({
      name,
      companyId,
    });
    return response(res, { data: category, status: 201 });
  } catch (error) {
    return errorResponse(res, error);
  }
};

const index: RequestHandler = async (req, res) => {
  try {
    const { id: companyId } = req.body;
    const categories = await Category.findByCompanyId(companyId);
    return response(res, { data: categories, status: 200 });
  } catch (error) {
    return errorResponse(res, error);
  }
};

const deleteCategory: RequestHandler = async (req, res) => {
  try {
    const { id: compnayId, categoryId } = req.body;
    const category = await Category.findByPk(categoryId);
    if (!category || (category && category.companyId !== compnayId))
      return response(res, {
        errors: [{ message: 'Category not found' }],
        status: 404,
      });
    await category.destroy();
    return response(res, { data: [], status: 204 });
  } catch (error) {
    return errorResponse(res, error);
  }
};

export { store, index, deleteCategory };
