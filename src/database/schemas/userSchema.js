import mongoose from 'mongoose'
import bcrypt from'bcrypt'

const schema = mongoose.Schema

const userSchema = new schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ["Hombre", "Mujer"]
    },
    post: [{
        type: schema.Types.ObjectId,
        ref: 'posts'
    }],
    profileImage: {
      type: String,
  },
}, {timestamps:true} )


mongoose.Types.ObjectId.prototype.valueOf = function() {
  return this.toString()
}

userSchema.pre("save", function (next) {
  let user = this
  bcrypt.genSalt(10, function (error, salt) {
    bcrypt.hash(user.password, salt, function (error, hash) {
      if (error) return next(error)
      user.password = hash
      next()
    })
  })
})

module.exports = userSchema