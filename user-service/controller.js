const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./model');

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    User.findByEmail(email, async (err, results) => {
      if (results.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const userData = {
        name,
        email,
        password: hashedPassword,
        role
      };

      User.createUser(userData, (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Registration failed' });
        }
        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, async (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful',
      token
    });
  });
};

exports.getProfile = (req, res) => {
  User.getUserById(req.user.userId, (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = results[0];
    delete user.password;

    res.json(user);
  });
};
