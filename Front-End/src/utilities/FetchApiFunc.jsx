import WebService from "./WebServices";
const webService = new WebService();

export const handdleGetPayAcc = () => {
  return webService
    .getPaymentAcc()
    .then(res => {
      return {
        error: false,
        response: res
      };
    })
    .catch(error => {
      if (error === 401) {
        webService
          .renewToken()
          .then(res => {
            webService.updateToken(res.access_token);
            handdleGetPayAcc();
          })
          .catch(error => {
            return {
              error: false,
              response: {}
            };
          });
      } else if (error === 403) {
        return {
          error: false,
          response: {}
        };
      }
    });
};

export const handdleGetInfAcc = accNumId => {
  webService
    .getPaymentAcc(accNumId)
    .then(res => {
      return {
        error: false,
        response: res
      };
    })
    .catch(error => {
      if (error === 401) {
        webService
          .renewToken()
          .then(res => {
            webService.updateToken(res.access_token);
            handdleGetInfAcc(accNumId);
          })
          .catch(error => {
            return {
              error: false,
              response: {}
            };
          });
      } else if (error === 403) {
        return {
          error: false,
          response: {}
        };
      }
    });
};
