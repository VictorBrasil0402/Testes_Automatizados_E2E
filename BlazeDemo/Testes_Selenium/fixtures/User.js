const {faker} = require('@faker-js/faker');

class User{

    static gerarUsuario(){

        return{

            name: faker.person.fullName(),

            address: faker.location.streetAddress(),

            city: faker.location.city(),

            state: faker.location.state(),

            zipCode: faker.location.zipCode(),

            creditCardNumber: faker.finance.creditCardNumber(),

            creditCardMonth: faker.number.int({min: 1, max: 12}),

            creditCardYear: faker.number.int({min: 2024, max: 2027})
        };
    }
}

module.exports = User;