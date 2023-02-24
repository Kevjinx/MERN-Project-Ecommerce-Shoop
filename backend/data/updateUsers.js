// import bcrypt from 'bcrypt';
// import fs from 'fs';
// import users from './users.js';

// const hashUserPasswords = (users) => {
//   const updatedUsers = users.map((user) => {
//     const saltRounds = 10;
//     const hashedPassword = bcrypt.hashSync(user.password, saltRounds);
//     const updatedUser = { ...user, hashpassword: hashedPassword };
//     delete updatedUser.password;
//     return updatedUser;
//   });

//   return updatedUsers;
// };

// const updatedUsers = hashUserPasswords(users);

// fs.writeFile('updatedUsers.json', JSON.stringify(updatedUsers), (err) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log('Updated users file has been created');
// });
