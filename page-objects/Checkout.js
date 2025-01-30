import { expect } from "@playwright/test"
import { timeout } from "../playwright.config"

export class Checkout {
    constructor(page){
        this.page = page
        this.basketCards = page.locator('[data-qa="basket-card"]')
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]')
        this.basketItemRemoveButoon = page.locator('[data-qa="basket-card-remove-item"]')
        this.continueToCheckoutButoon = page.locator('[data-qa="continue-to-checkout"]')
        

    }


    removeCheapestProduct = async () => {

        await this.basketCards.first().waitFor()
        const itemsBeforeRemoval = await this.basketCards.count()
        await this.basketItemPrice.first().waitFor()
        const allPriceTexts = await this.basketItemPrice.allInnerTexts()
        // { allPriceTexts: [ '499$', '599$', '320$' ] }
        const justNumbers =allPriceTexts.map((element) => {
            const withoutDolarSing = element.replace("$","") // '499$' -> '499'
            return parseInt(withoutDolarSing ,10)

        })
        const smallestPrice = Math.min(...justNumbers)
        const smallestPriceIdx = justNumbers.indexOf(smallestPrice)
        const specificRemoveButoon = this.basketItemRemoveButoon.nth(smallestPriceIdx)
        await specificRemoveButoon.waitFor()
        await specificRemoveButoon.click()

        await expect(this.basketCards).toHaveCount(itemsBeforeRemoval -1)

        //console.warn({allPriceTexts})
        //console.warn({justNumbers})

       // await this.page.pause()

    }


    continueToCheckout = async () => {
        await this.continueToCheckoutButoon.waitFor()
        await this.continueToCheckoutButoon.click()
        await this.page.waitForURL(/\/login/, {timeout: 3000})
        
    }

}