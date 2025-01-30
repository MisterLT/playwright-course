import { expect } from "@playwright/test";


export class LoginPage {

    constructor(page){
        this.page = page
        this.continueToRegisterButoon = page.locator('[data-qa="go-to-signup-button"]')

    }


    moveToSingup = async () => {
        await this.continueToRegisterButoon.waitFor()
        await this.continueToRegisterButoon.click()
        await this.page.waitForURL(/\/signup/, {timeout: 3000})
    }
}