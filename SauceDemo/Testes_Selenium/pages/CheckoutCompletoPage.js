import {By} from 'selenium-webdriver';

import BasePage from './BasePage.js';

class CheckoutCompletoPage extends BasePage{

    constructor(driver){

        super(driver);

        this.locators = {

            checkoutCompleteTitle: By.css('[data-test="title"]'),

            orderConfirmationTitle: By.css('[data-test="complete-header"]')
        };
    }
}

export default CheckoutCompletoPage;