import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  preferences: { type: Object, default: {} }
});

const User = mongoose.model('User', UserSchema);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'your_jwt_secret'
};

export class AuthService {
  static async registerUser(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    return this.generateToken(user);
  }

  static async loginUser(email, password) {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    return this.generateToken(user);
  }

  static generateToken(user) {
    return jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '8h' }
    );
  }

  static initializePassport() {
    passport.use(new JwtStrategy(jwtOptions, (payload, done) => {
      User.findById(payload.id)
        .then(user => done(null, user || false))
        .catch(err => done(err, false));
    }));
  }

  static authenticateJWT(req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (err || !user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      req.user = user;
      next();
    })(req, res, next);
  }
}