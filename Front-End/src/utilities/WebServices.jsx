import decode from "jwt-decode";

export default class WebService {
  // Initializing important variables
  constructor(domain) {
    this.apiDomain = domain || "http://localhost:3001/api"; // API server domain
    this.fetchDataApi = this.fetchDataApi.bind(this); // React binding stuff
  }

  ///////////////////////////////////////////////          API FUNCTION          //////////////////////////////////////////////////////

  //Function config fetch data from server API -----------------------------------------

  //FOR ALL
  //#URl: /login
  login(username, password) {
    const param = {
      user: username,
      pwd: password
    };
    return this.fetchDataApi(`${this.apiDomain}/account/login`, {
      method: "POST",
      json: true,
      body: JSON.stringify(param)
    }).then(res => {
      console.log(res);
      return res;
    });
  }
  renewToken() {
    const param = {
      refreshToken: this.getRefreshToken()
    };
    return this.fetchDataApi(`${this.apiDomain}/account/renewtoken`, {
      method: "POST",
      json: true,
      body: JSON.stringify(param)
    }).then(res => {
      console.log(res);
      return res;
    });
  }

  //FOR USER
  //#URl: /user
  getPaymentAcc() {
    const param = {
      userId: this.getIdUser()
    };
    return this.fetchDataApi(`${this.apiDomain}/banking/getpaymentaccount`, {
      method: "POST",
      json: true,
      body: JSON.stringify(param)
    }).then(res => {
      console.log(res);
      return res;
    });
  }

  getInfAcc(accountnumber) {
    const param = {
      accountNumber: accountnumber
    };
    return this.fetchDataApi(
      `${this.apiDomain}/banking/getinfobyaccountnumber`,
      {
        method: "POST",
        json: true,
        body: JSON.stringify(param)
      }
    ).then(res => {
      console.log(res);
      return res;
    });
  }

  getOtpAccSend(accountnumber) {
    const param = {
      userId: this.getIdUser(),
      accountNumber: accountnumber,
      name: this.getName(),
      reciver: this.getEmail()
    };
    return this.fetchDataApi(`${this.apiDomain}/banking/send`, {
      method: "POST",
      json: true,
      body: JSON.stringify(param)
    }).then(res => {
      console.log(res);
      return res;
    });
  }

  getMoneyTransfer(accSend, accReci, amount, note, otp, fee, reciveName) {
    const param = {
      sendAccount: accSend,
      reciveAccount: accReci,
      amount: amount,
      note: note,
      otp: otp,
      email: this.getEmail(),
      fee: fee,
      sendName: this.getName(),
      reciveName: reciveName
    };
    return this.fetchDataApi(`${this.apiDomain}/banking/transfer`, {
      method: "POST",
      json: true,
      body: JSON.stringify(param)
    }).then(res => {
      console.log(res);
      return res;
    });
  }

  getTransHistory(accountNumber) {
    const param = {
      accountNumber: accountNumber
    };
    // Get a token from api server using the fetch api
    return this.fetchDataApi(`${this.apiDomain}/banking/gettranshistory`, {
      method: "POST",
      json: true,
      body: JSON.stringify(param)
    }).then(res => {
      console.log(res);
      return res;
    });
  }

  getAccContact(){
    const param = {
        userId: this.getIdUser(),
      };
      // Get a token from api server using the fetch api
      return this.fetchDataApi(`${this.apiDomain}/banking/getreciverlist`, {
        method: "POST",
        json: true,
        body: JSON.stringify(param)
      }).then(res => {
        console.log(res);
        return res;
      });
  }

  setAccContact(accountNumber, name, fullName) {
    const param = {
      userId: this.getIdUser(),
      accountNumber: accountNumber,
      name: name,
      fullName: fullName
    };
    // Get a token from api server using the fetch api
    return this.fetchDataApi(`${this.apiDomain}/banking/savenewreciver`, {
      method: "POST",
      json: true,
      body: JSON.stringify(param)
    }).then(res => {
      console.log(res);
      return res;
    });
  }

  delAccContact(accountNumber){
    const param = {
        userId: this.getIdUser(),
        accountNumber: accountNumber
      };
      // Get a token from api server using the fetch api
      return this.fetchDataApi(`${this.apiDomain}/banking/deleteinreciverlist`, {
        method: "POST",
        json: true,
        body: JSON.stringify(param)
      }).then(res => {
        console.log(res);
        return res;
      });
  }

  ///////////////////////////////////////////////          OTHER FUNCTION          //////////////////////////////////////////////////////
  //Function Authen from login -----------------------------------------
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken(); // GEtting token from localstorage
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }
  isUser() {
    return this.loggedIn() && this.getPermission() === "0";
  }
  isAdmin() {
    return this.loggedIn() && this.getPermission() === "1";
  }
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        // Checking if token is expired. N
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  setInfo(
    id,
    name,
    email,
    username,
    phone,
    permission,
    accessToken,
    refreshToken
  ) {
    // Saves user token to localStorage
    localStorage.setItem("idToken", accessToken);
    localStorage.setItem("idRefToken", refreshToken);
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("userName", username);
    localStorage.setItem("userPhone", phone);
    localStorage.setItem("permiss", permission);
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem("idToken");
  }

  getRefreshToken() {
    return localStorage.getItem("idRefToken");
  }

  getIdUser() {
    return localStorage.getItem("id");
  }

  getName() {
    return localStorage.getItem("name");
  }

  getUserName() {
    return localStorage.getItem("userName");
  }

  getEmail() {
    return localStorage.getItem("email");
  }

  getPermission() {
    return localStorage.getItem("permiss");
  }

  getPhoneNum() {
    return localStorage.getItem("userPhone");
  }

  getProfile() {
    return decode(this.getToken());
  }

  updateToken(newToken) {
    localStorage.setItem("idToken", newToken);
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id");
    localStorage.removeItem("idToken");
    localStorage.removeItem("idRefToken");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("userName");
    localStorage.removeItem("userPhone");
    localStorage.removeItem("permiss");
  }

  //Function config fetch data from server API -----------------------------------------
  fetchDataApi(url, options) {
    const timeout = 30000;
    // return fetch(url, {
    //     header,
    //     ...options
    // }).then(this.checkStatus).then(response => response.json());
    return new Promise((resolve, reject) => {
      // Set timeout timer
      let timer = setTimeout(() => reject("Request timed out"), timeout);

      fetch(url, {
        ...options,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": this.getToken()
        }
      })
        .then(this.checkStatus)
        .then(
          response => {
            resolve(response.json());
          },
          err => reject(err)
        )
        .catch(error => {
          reject(error);
        })
        .finally(() => clearTimeout(timer));
    });
  }

  checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      // Success status lies between 200 to 300
      return response;
    } else if (response.status === 401 || response.status === 403) {
      throw response.status;
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
}
