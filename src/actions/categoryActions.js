import {CategoryModel} from '../database/models'

export const createCategory = async (contentData) => {
	try {
		return await CategoryModel.create(contentData)
	} catch (error) {
		return null;
	}
}

export const getCategories = async () => {
	try {
		return await CategoryModel.find();
	} catch (error) {
		return null;
	}
}

export const updateCategory = async (filter, update) => {
	try {
		return await CategoryModel.findOneAndUpdate(filter, update, { new: true });
	} catch (error) {
		return error;
	}
}