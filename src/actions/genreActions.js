import {GenreModel} from '../database/models'

export const createGenre = async (genreData) => {
    try {
        return await GenreModel.create(genreData)
    } catch (error) {
        return null;
    }
}

export const getGenres = async () => {
    try {
      return await GenreModel.find();
    } catch (error) {
      return null;
    }
}