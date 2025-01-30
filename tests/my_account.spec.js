import{ test } from "@playwright/test"
import { MyAccountPage } from "../page-objects/MyAccountPage"
import { getLoginToken } from "./../api-calls/getLoginToken"
import { adminDetails} from "../Data/userDetails"

test("My account using cookies injection and moking network request", async ({page}) => {
    const loginToken = await getLoginToken(adminDetails.username, adminDetails.password)

    await page.route("**/api/user**",async (route, request) => {

        await route.fulfill({
            status: 500,
            contentType: "application/json",
            body: JSON.stringify({message: "PLAYWRIGHT ERROR FROM MOKING"}),
        })
    })

    //muestra en pantalla lo que da la consula, en este caso el token id
    //console.warn({loginToken})
    const myAccount = new MyAccountPage(page)
    await myAccount.visit()
    await page.evaluate(( [loginTokenInsideBrowserCode]) => {
        document.cookie = "token=" + loginTokenInsideBrowserCode
    }, [loginToken])

    
    await myAccount.visit()
    await  myAccount.waitForPageHeading()
    await myAccount.waitForErrorMessage()

}) 