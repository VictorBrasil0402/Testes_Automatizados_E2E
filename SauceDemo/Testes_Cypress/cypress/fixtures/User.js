import {faker} from "@faker-js/faker";

export default class User{

    static gerarUsuario(){

        return{

            username: 'standard_user',

            password: 'secret_sauce',

            firstname: faker.person.firstName(),

            lastname: faker.person.lastName(),

            zipcode: faker.location.zipCode()
        };
    }
}