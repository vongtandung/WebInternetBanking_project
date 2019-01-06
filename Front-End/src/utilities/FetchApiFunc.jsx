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
    .catch(err => {
      if (err === 401) {
       return webService
          .renewToken()
          .then(res => {
            webService.updateToken(res.access_token);
            return handdleGetPayAcc();
          })
          .catch(err1 => {
            return {
              error: true,
              response: {}
            };
          });
      } else if (err === 403) {
        return {
          error: true,
          response: {}
        };
      }
    });
};

export const handdleGetTransHistory = accNumId => {
  return webService
    .getTransHistory(accNumId)
    .then(res => {
      return {
        error: false,
        response: res
      };
    })
    .catch(err => {
      if (err === 401) {
       return webService
          .renewToken()
          .then(res => {
            webService.updateToken(res.access_token);
           return handdleGetTransHistory(accNumId);
          })
          .catch(err1 => {
            return {
              error: true,
              response: {}
            };
          });
      } else if (err === 403) {
        return {
          error: true,
          response: {}
        };
      }
    });
};

export const handdleGetInfoByPhone = phone => {
  return webService
    .getAccInfoByPhone(phone)
    .then(res => {
      return {
        error: false,
        response: res
      };
    })
    .catch(err => {
      if (err === 401) {
       return webService
          .renewToken()
          .then(res => {
            webService.updateToken(res.access_token);
           return handdleGetInfoByPhone(phone);
          })
          .catch(err1 => {
            return {
              error: true,
              response: {}
            };
          });
      } else if (err === 403) {
        return {
          error: true,
          response: {}
        };
      }
    });
};