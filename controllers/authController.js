// authController.js
exports.register = async (req, res) => {
    // Your registration logic
    const { email, password } = req.body;
  
    try {
      // Code to handle registration (e.g., saving user to DB)
      res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).send({ message: 'Registration failed' });
    }
  };
  