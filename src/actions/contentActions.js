import {ContentModel, GenreModel, MediaModel, SeasonModel} from '../database/models'
import { ObjectID } from 'mongodb'

export const createContent = async (contentData) => {
    try {
        return await ContentModel.create(contentData)
    } catch (error) {
        return error
    }
}

export const getContents = async () => {
    try {
      return await ContentModel.find()
    } catch (error) {
      return error
    }
}

export const getContent = async (filter) => {
  try {
    return await ContentModel.findOne(filter)
  } catch (error) {
    console.log(error)
    return error
  }
}

export const updateContent = async (filter, update) => {
  try {
    return await ContentModel.findOneAndUpdate(filter, update, { new: true })
  } catch (error) {
    return error
  }
}

export const addGenreToContent = async (contentID, genreID) => {
  try {
    const course = await ContentModel.findById(contentID)
    const genre  = await GenreModel.findById(genreID)

    if (!course || !genre) throw new Error("Course or Genre doesn't exist")

    await ContentModel.findByIdAndUpdate(
      contentID, 
      { $addToSet: { genres: ObjectID(genreID) }}, 
      { new: true })
    return course
  } catch (error) {
    return error
  }
}

export const getGenres = async (genres) => {
  try {
    const ids = genres ? genres.map(id => ObjectID(id)) : []
    const genresData = ids.length > 0
      ? await GenreModel.find(
        { _id: { $in: ids } }
      )
      : []
    return genresData
  } catch (error) {
    console.log(error)
    return error
  }
}

export const getMedias = async (medias) => {
  try {
    const ids = medias ? medias.map(id => ObjectID(id)) : []
    const mediasData = ids.length > 0
      ? await MediaModel.find(
        { _id: { $in: ids } }
      ).sort({ order: 'asc'})
      : []
    return mediasData
  } catch (error) {
    console.log(error)
    return error
  }
}

export const getSeasons = async (contentID) => {
  try {
    const seassonData = await SeasonModel.find(
      { contentID: contentID }
    ).sort({ order: 'asc'})
    return seassonData
  } catch(error) {

  }
}