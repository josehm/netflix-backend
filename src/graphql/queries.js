import { getTags } from '../actions/tagActions';
import { getContents, getContent } from '../actions/contentActions';
import { getMedias, getMedia } from '../actions/mediaActions';
import { getCategories } from '../actions/categoryActions';

module.exports = {
  getTags: async (parent, args, context, info) => {
      try {
        return await getTags();
      } catch (error) {
        return null;
      }
  },
  getContents: async (parent, args, context, info) => {
      try {
        return await getContents();
      } catch (error) {
        return null;
      }
  },
  getContent: async (parent, {contentID}, context, info) => {
    try {
      const filter = { _id: contentID }
      return await getContent(filter)
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  getMedias: async (parent, args, context, info) => {
      try {
        return await getMedias();
      } catch (error) {
        return null;
      }
  },
  getMedia: async (parent, { mediaID }, context, info) => {
    try {
      const filter = { _id: mediaID }
      return await getMedia(filter);
    } catch (error) {
      return null;
    }
  },
  getCategories: async (parent, args, context, info) => {
      try {
        return await getCategories();
      } catch (error) {
        return null;
      }
  },
}