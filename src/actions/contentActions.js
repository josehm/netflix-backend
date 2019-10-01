import {ContentModel} from '../database/models'

export const createContent = async (contentData) => {
    try {
        return await ContentModel.create(contentData)
    } catch (error) {
        return null;
    }
}


export const getContents = async () => {
    try {
      return await ContentModel.find();
    } catch (error) {
      return null;
    }
}


export const getContent = async (filter) => {
  try {
    return await ContentModel.findOne(filter)
  } catch (error) {
    console.log(error)
    return null
  }
}

export const updateContent = async (filter, update) => {
  try {
    return await ContentModel.findOneAndUpdate(filter, update, { new: true });
  } catch (error) {
    return error;
  }
}