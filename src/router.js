import passport from 'passport'

import passportService from './services/passport'
import { signin, signup } from './controllers/authentication'


// don't create sessions since we're authenticating with JWTs every time
const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

export default app => {
  app.get('/', requireAuth, (req, res) => {
    res.send({ message: 'Super secret code is ABC123' })
  })
  app.post('/signin', requireSignin, signin)
  app.post('/signup', signup)
}
