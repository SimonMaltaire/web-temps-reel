import { faker } from "@faker-js/faker";
import { Topic, User } from "./models/index.js";
import { sequelize } from "./models/index.js";

await sequelize.sync({ force: true });

async function generateAdmin() {
    await User.create({
        email: "admin@motocycle.com",
        username: "Amin Nairi",
        password: "password",
        isAdmin: true
    });
}

async function generateDummyUsers() {
    await User.create({
        email: "test@testify.fr",
        username: faker.name.fullName(),
        password: "password"
    });

    await User.create({
        email: "test2@testify.fr",
        username: faker.name.fullName(),
        password: "password"
    });

    for (let i = 0; i < 20; i ++) {
        const users = await User.create({
            email: faker.internet.email(),
            username: faker.name.fullName(),
            password: faker.internet.password()
        });
    }  
}

async function generateTopics() {
    for (let i = 0; i < 15; i ++) {
        const topics = await Topic.create({
            name: faker.name.jobTitle(),
            size: Math.round(Math.random() * 100)
        });
    }
}

await generateAdmin();
await generateDummyUsers();
await generateTopics();


