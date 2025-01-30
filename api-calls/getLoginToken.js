import * as nodeFetch from "node-fetch"


export const getLoginToken = async (username, password) => {
    //Agregando el fetch se pouede emular una consulta directa  la api como en postman  con la siguiente estrutura
    const response = await nodeFetch("http://localhost:2221/api/login",{
        method: "POST",
        body: JSON.stringify({"username": username, "password": password}),
    })
    if(response.status !== 200) {
        throw new Error("An error ocurred trying to retrieve the login token.")

    }
    const body = await response.json()
    return body.token
    
}