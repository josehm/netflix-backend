import { createTag, updateTag, deleteTag } from '../actions/tagActions';
import { createContent, updateContent } from '../actions/contentActions';
import { createMedia } from '../actions/mediaActions';
import { createCategory } from '../actions/categoryActions';
import {createUser, doLogin} from '../actions/userActions';
import { storeUpload } from '../utils/uploader';

module.exports = {
    addTag: async (parent, args, context, info) => await createTag(args.data),
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
        return error;
      }
    },

    addContent: async (parent, { data }, context, info) => {
      try {
        const { createReadStream } = await data.imgHero
        const stream = createReadStream()
        const { url } = await storeUpload(stream, {})
        const newContentInfo = {
          ...data,
          imgHero: url,
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

    addCategory: async (parent, args, context, info) => await createCategory(args.data),
    addUser: async (parent, { data }, context, info) => {
      try {
        const { createReadStream } = await data.profileImage;
        const stream = createReadStream();
        const { url } = await storeUpload(stream, {});
        const newUserInfo = {
          ...data,
          profileImage: url,
        }
        return await createUser(newUserInfo);
      } catch (error) {
        return error;
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