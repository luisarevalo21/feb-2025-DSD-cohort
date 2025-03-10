// const { AppDataSource } = require("../data-source");
// const { User } = require("../entities/users");

// // Get the repository for the User entity
// const userRepository = AppDataSource.getRepository(User);

// // Fetch all users
// const getAllUsers = async () => {
//     return await userRepository.find();
// };

// // Create a new user
// const createUser = async (username, email, passwordHash) => {
//     // either regular password or a hashed password for security
//     const newUser = userRepository.create({ username, email, password: passwordHash });
//     return await userRepository.save(newUser); // saves new User object to users table
// };

// module.exports = {
//     getAllUsers,
//     createUser,
// };
