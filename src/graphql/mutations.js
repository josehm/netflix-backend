import { createGenre} from '../actions/genreActions'
import { createTag, updateTag, deleteTag } from '../actions/tagActions'
import { createContent, updateContent, addGenreToContent } from '../actions/contentActions'
import { createMedia } from '../actions/mediaActions'
import { createSeason } from '../actions/seasonActions'
import { createCategory } from '../actions/categoryActions'
import {createUser, doLogin} from '../actions/userActions'
import { storeUpload } from '../utils/uploader'

module.exports = {
    addGenre: async (parent, data, context, info) => await createGenre(data),
    addGenreToContet: async (parent, {contentID, genreID}, context, info) => {
      try {
        return await addGenreToContent(contentID, genreID)
      } catch (error) {
        return error
      }
    },

    addTag: async (parent, {data}, context, info) => await createTag(data),
    updateTag: async (parent, { data, tagID }, context, info) => {
      try {
        const filter = { _id: tagID };
        const update = { $set: { ...data } };
        return await updateTag(filter, update);
      } catch (error) {
        return error;
      }
    },
    deleteTag: async (parent, { tagID }, context, info) => {
      try {
        const filter = { _id: tagID };
        return await deleteTag(filter);
      } catch (error) {
        return error
      }
    },

    addContent: async (parent, { data }, context, info) => {
      try {
        let imgHeroUrl = ''
        let overViewLinkUrl = ''

        if(data.imgHero) {
          const { createReadStream } = await data.imgHero
          const stream = createReadStream()
          const { url } = await storeUpload(stream, {})
          imgHeroUrl = url
        }

        if(data.overViewLink) {
          const { createReadStream } = await data.overViewLink
          const stream = createReadStream()
          const { url } = await storeUpload(stream, {resource_type: 'video'})
          overViewLinkUrl = url
        }

        const newContentInfo = {
          ...data,
          imgHero: imgHeroUrl,
          overViewLink: overViewLinkUrl
        }
        return await createContent(newContentInfo)
      } catch (error) {
        return error
      }
    },
    updateContent: async (parent, { data, contentID }, context, info) => {
      try {
        const { createReadStream } = await data.overViewLink
        const stream = createReadStream()
        const { url } = await storeUpload(stream, {resource_type: 'video'})
        const newContentInfo = {
          ...data,
          overViewLink: url,
        }

        const filter = { _id: contentID };
        const update = { $set: newContentInfo };
        return await updateContent(filter, update);
      } catch (error) {
        return error;
      }
    },

    addSeason: async (parent, {data}, context, info) => await createSeason(data),

    addMedia: async (parent, { data }, context, info) => {
      try {
        const { createReadStream } = await data.mediaLink;
        const stream = createReadStream();
        const { url } = await storeUpload(stream, {resource_type: 'video'});
        const newMediaInfo = {
          ...data,
          mediaLink: url,
        }
        return await createMedia(newMediaInfo)
      } catch (error) {
        return error;
      }
    },

    addCategory: async (parent, {data}, context, info) => await createCategory(data),
    addUser: async (parent, { data }, context, info) => {
      let profileImageUrl = ''

      try {
        if(data.profileImage){
          const { createReadStream } = await data.profileImage
          const stream = createReadStream()
          const { url } = await storeUpload(stream, {})
          profileImageUrl = url
        }

        const newUserInfo = {
          ...data,
          profileImage: profileImageUrl,
        }

        return await createUser(newUserInfo)
      } catch (error) {
        return error
      }
    },
    doLogin: async (parent, { email, password }, context, info) => {
      try {
        return await doLogin(email, password);
      } catch (error) {
        return error;
      }
    }
}