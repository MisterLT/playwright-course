import{ test } from "@playwright/test"
import { v4 as uuidv4 } from "uuid"
import { ProductsPage } from "../page-objects/ProductsPage"
import { Navigation } from "../page-objects/Navigation"
import { Checkout } from "../page-objects/Checkout"
import { LoginPage } from "../page-objects/LoginPage"
import { RegisterPage } from "../page-objects/RegisterPage"
import {DeliveryDetails} from "../page-objects/DeliveryDetails.js"
import { deliveryDetails as userAddress } from "./../Data/delivaryDetails.js"
import { PaymentPage } from "../page-objects/PaymentPage.js"
import { paymentDetails as userPaymentDeatails} from "./../Data/paymentDetails.js"

test("New user full end-to-end test journey", async({ page }) => {
    const productsPage = new ProductsPage(page)
    await productsPage.visit()
    await productsPage.sortByCheapest()
    await productsPage.addProdutToBasket(0)
    await productsPage.addProdutToBasket(1)
    await productsPage.addProdutToBasket(2)


    const navigation = new Navigation(page)
    await  navigation.goToCheckout()

    const checkout = new Checkout(page)
    await checkout.removeCheapestProduct()
    await checkout.continueToCheckout()


    const login = new LoginPage(page)
    await login.moveToSingup()


    const registerPage = new RegisterPage(page)
    const email = uuidv4() + "@gmail.com"
    const password = uuidv4()
    await registerPage.singUpAsNewUser(email, password)


    const deliveryDetails = new DeliveryDetails(page)
    await deliveryDetails.fillDetails(userAddress)
    await deliveryDetails.saveDetails()
    await deliveryDetails.continueToPayment()
    


    const paymentPage = new PaymentPage(page)
    await paymentPage.activateDiscount()
    await paymentPage.fillPaymentDetalis(userPaymentDeatails)
    await paymentPage.completePayment()
    

})
