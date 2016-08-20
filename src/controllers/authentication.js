import jwt from 'jwt-simple'

import User from '../models/user'


function tokenForUser(user) {
  const timestamp = new Date().getTime()
  // sub = subject, iat = issued at time
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.JWT_SECRET)
}


export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) })
  // User has already had their email and password authed by previous middleware
}


export const signup = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'})
  }

  User.findOne({ email: email }, (err, existingUser) => {
    if (err) { return next(err) }

    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' })
    }

    const user = new User({
      email: email,
      password: password,
    })

    user.save(err => {
      if (err) { return next(err) }
      res.json({ token: tokenForUser(user) })
    })
  })
}
