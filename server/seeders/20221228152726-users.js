'use strict';
import { faker } from '@faker-js/faker';

const users = [...Array(100)].map((user) => ({
	email: faker.internet.email(),
	username: faker.internet.username(),
	password: faker.internet.password()
}))
/** @type {import('sequelize-cli').Migration} */

export const up = async (queryInterface, Sequelize) => {
	await queryInterface.bulkInsert('user', users, {});
}

export const down = async (queryInterface, Sequelize) => {
	await queryInterface.bulkDelete('user', null, {});
}