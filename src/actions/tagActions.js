import {TagModel} from '../database/models'

export const createTag = async (tagData) => {
    try {
        return await TagModel.create(tagData)
    } catch (error) {
        return null;
    }
}

export const updateTag = async (filter, update) => {
  try {
    return await TagModel.findOneAndUpdate(filter, update, { new: true });
  } catch (error) {
    return error;
  }
}

export const deleteTag = async (filter) => {
  try {
    return await TagModel.findOneAndRemove(filter);
  } catch (error) {
    return error;
  }
}

export const getTags = async () => {
    try {
      return await TagModel.find();
    } catch (error) {
      return null;
    }
}