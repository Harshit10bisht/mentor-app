const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
    try {
      const hash = await bcrypt.hash(password, 10);
      return hash;
    } 
    catch (error) {
      throw error;
    }
};

const comparePassword = async (password, hashedPassword) => {
    try {
      const match = await bcrypt.compare(password, hashedPassword);
      return match;
    } catch (error) {
      throw error;
    }
};

module.exports = {
    hashPassword,
    comparePassword
};