import { expect } from "@playwright/test"
import { Navigation } from "./Navigation"
import { isDesktopViewport } from "../utils/isDesktopViewport"

export class ProductsPage {

    constructor(page) {
        this.page = page

        this.addButtons =  page.locator('[data-qa="product-button"]') 
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]')
        this.productTitle = page.locator('[data-qa="product-title"]')
    }

    visit = async () => {
        await this.page.goto('/', { waitUntil: 'networkidle' });

    }


    addProdutToBasket = async (index) => {
        const specificAddButton = this.addButtons.nth(index)

        await specificAddButton.waitFor()
        await expect(specificAddButton).toHaveText("Add to Basket")
        const navigation = new Navigation(this.page)
        let basketCountBeforeAdding 
        if(isDesktopViewport(this.page)) {
            basketCountBeforeAdding = await navigation.getBasketCount()
        }

        await specificAddButton.click()
        await expect(specificAddButton).toHaveText("Remove from Basket")

        if(isDesktopViewport(this.page)){
            const basketCountAfterAdding = await navigation.getBasketCount()
            expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)

        }

    }


    sortByCheapest = async () => {
        await this.sortDropdown.waitFor()
        await this.productTitle.first().waitFor()
        const ProductTitleBeforeSorting =await this.productTitle.allInnerTexts()
        await this.sortDropdown.selectOption("price-asc") 
        const ProductTitleAfterSorting = await this.productTitle.allInnerTexts()
        expect(ProductTitleAfterSorting).not.toEqual(ProductTitleBeforeSorting)
    }

}
