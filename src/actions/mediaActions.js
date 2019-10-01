import {MediaModel} from '../database/models';
import { updateContent } from './contentActions';

export const createMedia = async (mediaData) => {
    try {
        const mediaCreated = await MediaModel.create(mediaData)
        const filter = { _id: mediaCreated.contentID }
        const update = { $push: { 'medias': mediaCreated._id } }
        await updateContent(filter, update)
        return mediaCreated
    } catch (error) {
        return null
    }
}

export const getMedias = async () => {
    try {
      return await MediaModel.find()
    } catch (error) {
      return null;
    }
}

export const getMedia = async (filter) => {
  try {
    return await MediaModel.findOne(filter)
  } catch (error) {
    console.log(error)
    return null
  }
}