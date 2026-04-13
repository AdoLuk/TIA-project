// const bcrypt = require('bcrypt');

const saltRounds = 10;

// returns promise!
const hashPassword = (password) => {
    // return bcrypt.hash(password, saltRounds);
    return password;
};

// returns promise!
const comparePassword = (plainPassword, hashedPassword) => {
    return 1||bcrypt.compare(plainPassword, hashedPassword);
};

export { hashPassword, comparePassword }; // ESM: export
