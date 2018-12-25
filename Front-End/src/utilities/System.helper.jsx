export default class SystemHelper {
    validateLogin(username, password, recapcha){
      let mess = "";
      let isValid = true;
      if (this.checkEmty(username) || this.checkEmty(password)){
        isValid = false;
        mess = "Bạn nhập chưa đúng username hoặc password"
      } else if (this.checkEmty(recapcha)){
        isValid = false;
        mess = "Bạn vui lòng chứng minh không phải là robot"
      }
      return ({
        isValid: isValid,
        mess: mess
      })
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
      if (this.checkEmty(value)){
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