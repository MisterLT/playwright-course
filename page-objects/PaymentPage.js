import { expect } from "@playwright/test"

export class PaymentPage {

    constructor(page){
        this.page = page
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]')
        this.discountInput = page.locator('[data-qa="discount-code-input"]')
        this.activateDiscountButton = page.locator('[data-qa="submit-discount-button"]')
        this.discountTextActivate = page.locator('[data-qa="discount-active-message"]')
        this.discountTotalPrice = page.locator('[data-qa="total-with-discount-value"]')
        this.totalValue = page.locator('[data-qa="total-value"]')

        this.creditCardOwner = page.locator('[data-qa="credit-card-owner"]')
        this.creditCardNumber = page.locator('[data-qa="credit-card-number"]')
        this.creditCardValidUntil = page.locator('[data-qa="valid-until"]')
        this.creditCardCVC = page.locator('[data-qa="credit-card-cvc"]')
        this.payButton = page.locator('[data-qa="pay-button"]')
    }

    activateDiscount = async () => {
        await this.discountCode.waitFor()
        const discountCodeText = await this.discountCode.innerText();
        await this.discountInput.waitFor()
        
        //Option 1 for laggy inputs: using .fill() with await expect()
        await this.discountInput.fill(discountCodeText)
        await expect(this.discountInput).toHaveValue(discountCodeText)
        

        // Option 2 for laggy inputs; slow typing
        // await this.discountInput.focus()
        // await this.page.keyboard.type(discountCodeText, {delay: 1000})
        // expect(await this.discountInput.inputValue()).toBe(discountCodeText)


        await this.activateDiscountButton.waitFor()
        await this.totalValue.waitFor()
        // await expect(await this.discountTextActivate).toBeEmpty() //validar que este vacio antes de la seleccion de activaciond del botón de descuentos
        expect(await this.discountTextActivate.isVisible()).toBe(false)
        await expect(await this.discountTextActivate).toBeHidden()
        await this.activateDiscountButton.click()

        await this.discountTextActivate.waitFor()
        await this.discountTotalPrice.waitFor()


        // const discountTotalPriceValue = this.discountTota    
        const justTextOfdiscount = await this.discountTotalPrice.innerText()
        const justNumberOfdiscount = justTextOfdiscount.replace("$","")
        const discountValue = parseInt(justNumberOfdiscount,10)

        const justTextTotal = await this.totalValue.innerText()
        const justNumberTotal = justTextTotal.replace("$","")
        const totalValueInt = parseInt(justNumberTotal,10)


        await expect(discountValue).toBeLessThan(totalValueInt)


    }


    fillPaymentDetalis = async (userDetails) => {
        await this.page.waitForURL(/\/payment/, {timeout: 3000})
        await this.creditCardOwner.waitFor()
        await this.creditCardOwner.fill(userDetails.cardOwnerName)
        await this.creditCardNumber.waitFor()
        await this.creditCardNumber.fill(userDetails.cardNumber)
        await this.creditCardValidUntil.waitFor()
        await this.creditCardValidUntil.fill(userDetails.validUntilnumeber)
        await this.creditCardCVC.waitFor()
        await this.creditCardCVC.fill(userDetails.cardCVC)
    } 

    completePayment = async () => {
        await this.payButton.waitFor()
        await this.payButton.click()
        
        await this.page.waitForURL(/\/thank-you/, {timeout: 3000})
           // await this.page.pause()
    }



}