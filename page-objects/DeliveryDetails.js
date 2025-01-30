import { expect } from "@playwright/test"

export class DeliveryDetails{
    constructor(page){
        this.page = page
        this.firstName = page.locator('[placeholder="First name"]')
        this.lastName = page.getByPlaceholder('Last name')
        this.street = page.getByPlaceholder('Street')
        this.postcode = page.getByPlaceholder('Post code')
        this.city = page.getByPlaceholder('City')
        this.countrysButoon = page.getByRole('combobox')
        this.saveAddressButton = page.getByRole('button', { name: 'Save address for next time' })
        this.saveAddressContainer = page.locator('[data-qa="saved-address-container"]')
        this.saveAddressFirstName = page.locator('[class="saved-address-firstName"]')
        this.saveAddressLastName = page.locator('[class="saved-address-lastName"]')
        this.saveAddresStreet = page.locator('[class="saved-address-street"]')
        this.saveAddresPostcode = page.locator('[class="saved-address-postcode"]')
        this.saveAddresCity = page.locator('[class="saved-address-city"]')
        this.saveAddresConuntry = page.locator('[class="saved-address-country"]')
        this.continueToPaymentButoon = page.getByRole('button', { name: 'Continue to payment' })
    }

    fillDetails = async (userAddress) => {
        await this.page.waitForURL(/\/delivery-details/, {timeout: 3000})
        await this.firstName.waitFor()
        await this.firstName.fill(userAddress.firstName)
        await this.lastName.waitFor()
        await this.lastName.fill(userAddress.lastName)
        await this.street.waitFor()
        await this.street.fill(userAddress.street)
        await this.postcode.waitFor()
        await this.postcode.fill(userAddress.postcode)
        await this.city.waitFor()
        await this.city.fill(userAddress.city)
        await this.countrysButoon.waitFor()
        await this.countrysButoon.selectOption(userAddress.country)
        await this.continueToPaymentButoon.waitFor()
        
    }


    saveDetails = async () => {
        const addressCountBeforeSaving = await this.saveAddressContainer.count()
        await this.saveAddressButton.waitFor()
        await this.saveAddressButton.click()
        await this.saveAddressContainer.waitFor()
        await expect(this.saveAddressContainer).toHaveCount(addressCountBeforeSaving + 1)

        await this.saveAddressFirstName.first().waitFor()
        expect(await this.saveAddressFirstName.first().innerText()).toBe(await this.firstName.inputValue())
        
        await this.saveAddressLastName.first().waitFor()
        expect(await this.saveAddressLastName.first().innerText()).toBe(await this.lastName.inputValue())
        
        await this.saveAddresStreet.first().waitFor()
        expect(await this.saveAddresStreet.first().innerText()).toBe(await this.street.inputValue())
        
        await this.saveAddresPostcode.first().waitFor()
        expect(await this.saveAddresPostcode.first().innerText()).toBe(await this.postcode.inputValue())
        
        await this.saveAddresCity.first().waitFor()
        expect(await this.saveAddresCity.first().innerText()).toBe(await this.city.inputValue())
        
        await this.saveAddresConuntry.first().waitFor()
        expect(await this.saveAddresConuntry.first().innerText()).toBe(await this.countrysButoon.inputValue())
    

    }


    continueToPayment = async () => {
        await this.continueToPaymentButoon.waitFor()
        await this.continueToPaymentButoon.click() 
        await this.page.waitForURL(/\/payment/, {timeout: 3000})
      //  await this.page.pause()
    }
}