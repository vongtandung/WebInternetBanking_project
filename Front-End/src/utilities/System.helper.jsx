export default class SystemHelper {
  validateLogin(username, password, recapcha) {
    let mess = "";
    let isValid = true;
    if (this.checkEmty(username) || this.checkEmty(password)) {
      isValid = false;
      mess = "Bạn chưa nhập username hoặc password"
    } else if (this.checkEmty(recapcha)) {
      isValid = false;
      mess = "Bạn vui lòng chứng minh không phải là robot"
    }
    return ({
      isValid: isValid,
      mess: mess
    })
  }
  validateRegister(username, password, rePassword, name, email, phone) {
    let mess = "";
    let isValid = true;
    if (this.checkEmty(username)) {
      isValid = false;
      mess = "Bạn chưa nhập tên tài khoản"
    } else if (this.checkEmty(password)) {
      isValid = false;
      mess = "Bạn chưa nhập password"
    } else if (this.checkEmty(rePassword)) {
      isValid = false;
      mess = "Bạn chưa nhập xác nhận password"
    } else if (this.checkEmty(name)) {
      isValid = false;
      mess = "Bạn chưa nhập họ tên"
    } else if (this.checkEmty(email)) {
      isValid = false;
      mess = "Bạn chưa nhập email"
    } else if (this.checkEmty(phone)) {
      isValid = false;
      mess = "Bạn chưa nhập số điện thoại"
    } else if (password !== rePassword) {
      isValid = false;
      mess = "Password bạn nhập không khớp"
    } else if (this.checkPhone(phone) === false){
      isValid = false;
      mess = "Số điện thoại phải có 10 chữ số"
    }
    return ({
      isValid: isValid,
      mess: mess
    })
  }
  validateSendMoney(accRecExist, accPayBalance, accMoneySend, accInfoSend) {
    let mess = "";
    let isValid = true;
    if (accRecExist === false) {
      isValid = false;
      mess = "Tài khoản người nhận không tồn tại"
    } else if (this.checkEmty(accInfoSend)) {
      isValid = false;
      mess = "Bạn vui lòng nhập nội dung chuyển tiền"
    } else if (accMoneySend === undefined || accMoneySend < 50000) {
      isValid = false;
      mess = "Số tiền gửi phải từ 50,000 VNĐ"
    } else if ((accMoneySend > accPayBalance && (accPayBalance - accMoneySend) < 50000) || accPayBalance < accMoneySend) {
      isValid = false;
      mess = "Số dư khả dụng tài khoản không đủ"
    }
    return ({
      isValid: isValid,
      mess: mess
    })
  }
  checkPhone(value) {
    /* reg exp để kiểm tra xem chuỗi có chỉ bao gồm 10 - 11 chữ số hay không */
    const regexp = /^\d{10,11}$/;
    const checkingResult = regexp.exec(value);
    if (checkingResult !== null) {
      return true
    }
      return false
  }
  checkEmty(value) {
    if (value == null || value === '') {
      return true;
    }
    return false;
  }
  checkNumAndChar(value) {
    if (value.match(/^[0-9a-zA-Z]+$/)) {
      return true;
    }
    return false;
  }
  checkSpeclChar(value) {
    // var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    var format = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    if (this.checkEmty(value)) {
      return false
    }
    if (format.test(value)) {
      return false;
    } else {
      return true;
    }
  }

  chuyenDoiURL(str) {
    // Chuyển hết sang chữ thường
    str = str.toLowerCase();

    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');

    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, '');

    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, '-');

    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, '');

    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, '');

    // return
    return str;
  }

}