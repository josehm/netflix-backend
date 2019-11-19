'use strict'

import { getGenres, getMedias } from '../actions/contentActions'

module.exports = {
  Content: {
    genres: async ({ genres }) => {
      try {
        return await getGenres(genres)
      } catch (error) {
        return error
      }
    },
    medias: async ({medias}) => {
      try {
        return await getMedias(medias)
      } catch (error) {
        return error
      }
    },
    tags: async ({tags}) => {
      return []
    },
    categories: async (categories) => {
      return []
    }
  }
}