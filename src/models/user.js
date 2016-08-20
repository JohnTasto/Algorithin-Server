import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt-nodejs'


const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
})


userSchema.pre('save', function(next) {
  const user = this

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err)

      // overwrite plain text password with encrypted password
      user.password = hash
      next()
    })
  })
})


userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err)

    callback(null, isMatch)
  })
}


export default mongoose.model('user', userSchema)
