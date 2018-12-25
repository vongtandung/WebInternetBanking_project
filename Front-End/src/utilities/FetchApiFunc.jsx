import WebService from "./WebServices";
const webService = new WebService();

 export const handdleGetPayAcc = () =>{
    webService.getPaymentAcc()
    .then(res => {
        return {
            error: false,
            data: res.data
        }
    }).catch((error) => {
        if (error === 401) {
            webService.renewToken()
                .then(res => {
                    webService.updateToken(res.access_token)
                    handdleGetPayAcc()
                }).catch((error) => {
                    return {
                        error: false,
                        data: {}
                    }
                })
        } else if (error === 403) {
            return {
                error: false,
                data: {}
            }
        }
    })
}

export const handdleGetInfAcc = (accNumId) =>{
    webService.getPaymentAcc()
    .then(res => {
        return {
            error: false,
            data: res.data
        }
    }).catch((error) => {
        if (error === 401) {
            webService.renewToken()
                .then(res => {
                    webService.updateToken(res.access_token)
                    handdleGetInfAcc(accNumId)
                }).catch((error) => {
                    return {
                        error: false,
                        data: {}
                    }
                })
        } else if (error === 403) {
            return {
                error: false,
                data: {}
            }
        }
    })
}