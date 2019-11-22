import { gql } from 'apollo-server';

const typeDefs = gql`

  directive @AuthDirective on QUERY | FIELD_DEFINITION | FIELD

  type Genre {
    _id: ID
    title: String
    description: String
  }
  input GenreInput {
    title: String
    description: String 
  }

  type Category {
    _id: ID
    title: String
    description: String
  }
  input CategoryInput {
    title: String
    description: String 
  }

  type Tag {
    _id: ID
    title: String
    description: String
  }
  input TagInput {
    title: String
    description: String 
  }

  type Content {
    _id: ID!
    title: String!
    description: String!
    releaseDate: String!
    imgHero: String
    clasaification: String
    overViewLink: String
    genres: [Genre]
    medias: [Media]
    seasons: [Season]
    tags: [Tag]
    categories: [Category]
  }
  input ContentInput {
    title: String
    description: String
    releaseDate: String
    imgHero: Upload
    genres: String
    clasaification: String
    overViewLink: Upload
  }

  type Season {
    _id: ID!
    title: String!
    description: String
    releaseDate: String!
    order: Int!
    medias: [Media]
    contentID: String!
  }
  input SeasonInput {
    title: String
    description: String
    releaseDate: String
    order: Int
    contentID: String
  }

  type Media {
    _id: ID!
    title: String!
    description: String
    releaseDate: String!
    chapter: String
    order: Int!
    seasonID: String
    contentID: String
    imgHero: String!
    mediaLink: String!
  }
  input MediaInput {
    title: String
    description: String
    releaseDate: String
    chapter: String
    order: Int
    seasonID: String
    contentID: String
    mediaLink: Upload
  }

  enum Gender {
    Hombre
    Mujer
  }
  type Token {
    token: String
  }
  type User {
    _id: ID
    name: String
    lastName: String
    email: String
    password: String
    gender: Gender
    profileImage: String
  }
  input UserInput {
    name: String
    lastName: String
    email: String
    password: String
    gender: Gender
    profileImage: Upload
  }

  type Subscription {
    tagAdded: Tag
  }

  # (A "Mutation" type will be covered later on.)
  type Mutation {
    "Add genre"
    addGenre(data: GenreInput) : Genre
    "Add genre to a content"
    addGenreToContet(contentID: ID!, genreID: ID!): Content
    
    addTag(data: TagInput) : Tag
    updateTag(data: TagInput, tagID: ID) : Tag
    deleteTag(tagID: ID) : Tag

    addContent(data: ContentInput) : Content
    updateContent(data: ContentInput, contentID: ID) : Content

    "Add season"
    addSeason(data: SeasonInput) : Season

    addMedia(data: MediaInput) : Media
    addCategory(data: CategoryInput) : Category
    addUser(data: UserInput) : Token
    doLogin(email: String, password: String) : Token
  }

  # The "Query" type is the root of all GraphQL queries.
  type Query {
    
    getGenres: [Genre]

    getTags: [Tag] @AuthDirective
    
    getMedias: [Media] @AuthDirective
    getMedia(mediaID: ID): Media @AuthDirective
    
    getContents: [Content] @AuthDirective
    getContent(contentID: ID): Content

    getCategories: [Category] @AuthDirective
  }
`
export default typeDefs