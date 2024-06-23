import { User } from "../models/user.js";
import { faker } from "@faker-js/faker";
export const createUser = async (numUsers) => {
  try {
    const usersPromise = [];

    for (let i = 0; i < numUsers; i++) {
      const tempUser = User.create({
        name: faker.person.fullName(),
        username: faker.internet.userName(),
        bio: faker.lorem.sentence(10),
        password: "password",
        avatar: {
          url: faker.image.avatar(),
          public_id: faker.system.fileName(),
        },
      });
      usersPromise.push(tempUser);

      await Promise.all(usersPromise);
    }
    console.log("User created", numUsers);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
