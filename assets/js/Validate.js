$.validator.setDefaults({
  errorClass: 'error_lab',
  errorElement: 'label',
  errorElementClass: 'error_group',
  highlight: function(element, errorClass, validClass, errorElementClass) {

    $(element).parent().next('label').addClass(this.settings.errorClass);
    $(element).parents('.form-group').addClass(this.settings.errorElementClass);

  },
  unhighlight: function(element, errorClass, validClass, errorElementClass) {
    $(element).parent().next('label').removeClass(this.settings.errorClass)
    $(element).parents('.form-group').removeClass(this.settings.errorElementClass);
  },
  errorPlacement: function(errorElementClass, element) {
    errorElementClass.insertAfter(element.parent());
    if ($(element).hasClass('js-validatecode')) {
      errorElementClass.insertAfter(element.parent().parent());
    } else {
      errorElementClass.insertAfter(element.parent());
    }
  },
});
// 會員登入 企業
$("#form1").validate({
  rules: {
    "form.UserNo1": {
      required: true,
      digits: true,
      max: 8,
      min: 8,
    },
    "form.UserPwd1": {
      required: true,
    },
    "form.ValidateCode1": {
      required: true,
      digits: true,
      max: 4,
      min: 4,
    },
  },
  messages: {
    "form.UserNo1": {
      required: "未填寫您的統一編號",
      digits: "統一編號必須為數字",
      max: "統一編號必須為 8 碼",
      min: "統一編號必須為 8 碼",
    },
    "form.UserPwd1": {
      required: "請填寫您的密碼",
    },
    "form.ValidateCode1": {
      required: "未填寫驗證碼",
      digits: "驗證碼必須為數字",
      max: "驗證碼必須為 4 碼",
      min: "驗證碼必須為 4 碼",
    },
  },
});
// 會員登入 會員
$("#form2").validate({
  rules: {
    "form.UserNo2": {
      required: true,
    },
    "form.UserPwd2": {
      required: true,
    },
    "form.ValidateCode2": {
      required: true,
      digits: true,
      max: 4,
      min: 4,
    },
  },
  messages: {
    "form.UserNo2": {
      required: "請輸入您的帳號",
    },
    "form.UserPwd2": {
      required: "請輸入您的密碼",
    },
    "form.ValidateCode2": {
      required: "未輸入驗證碼",
      digits: "驗證碼必須為數字",
      max: "驗證碼必須為 4 碼",
      min: "驗證碼必須為 4 碼",
    },
  },
});
// 會員登入 自然人
$("#form3").validate({
  rules: {
    "form.UserNo3": {
      required: true,
      id_num: true,
    },
    "form.UserPwd3": {
      required: true,
    },

  },
  messages: {
    "form.UserNo3": {
      required: "未輸入您的身分證字號",
      id_num: "請輸入正確的身分證字號",
    },
    "form.UserPwd3": {
      required: "請輸入您的密碼",
    },

  },
});
// 會員註冊 會員
$("#memberSignUp").validate({
  rules: {
    "FormPSN.MPemail_logIn": {
      required: true,
      email: true,
    },
    "FormPSN.Password": {
      required: true,
      maxlength: 16,
    },
    "FormPSN.rePassword": {
      required: true,
      equalTo: "#MPpassword"
    },
    "FormPSN.MPname": {
      required: true,
    },
    "FormPSN_MPBirth_AD_TW": {
      required: true,
    },
    "FormPSN.MPID": {
      required: true,
      id_num: true,
    },

  },
  messages: {
    "form.UserNo3": {
      required: "未輸入您的帳號 (E-Mail)",
      email: "請輸入正確的信箱格式",

    },
    "FormPSN.Password": {
      required: "請輸入您的密碼",
    },
    "FormPSN.rePassword": {
      required: "請再次填寫您的密碼",
      equalTo: "密碼必須與您第一次設定的相同"
    },
    "FormPSN.MPname": {
      required: "請輸入您的姓名",
    },
    "FormPSN_MPBirth_AD_TW": {
      required: "請輸入您的出生年月日",
    },
    "FormPSN.MPID": {
      required: "未輸入您的身分證字號",
      id_num: "請輸入正確的身分證字號",
    },
  },
});
// 會員註冊 企業會員
$("#corpSignUp").validate({
  rules: {
    "Form.MCorgID": {
      required: true,
      digits: true,
      max: 8,
      min: 8,
    },
    "Form.Password1": {
      required: true,
      maxlength: 16,
    },
    "Form.Password2": {
      required: true,
      equalTo: "#col03"
    },
    "Form.MCorg": {
      required: true,
    },
    "Form.MCemployer_name": {
      required: true,
    },
    "Form.MCemployer_jobtype": {
      required: true,
    },
    "Form.MCconnect": {
      required: true,
    },
    "Form.MCcon_jobtype": {
      required: true,
    },
    "Form.MCapply_phone": {
      required: true,
      isTel: true
    },
    "Form.MCapply_Email": {
      required: true,
      email: true,
    },
    "Form.MChired_All": {
      required: true,
      digits: true,
    },
    "Form.MChiredD": {
      required: true,
      digits: true,
    },



  },
  messages: {
    "Form.MCorgID": {
      rrequired: "未填寫您的統一編號",
      digits: "統一編號必須為數字",
      max: "統一編號必須為 8 碼",
      min: "統一編號必須為 8 碼",
    },

    "Form.Password1": {
      required: "請輸入您的密碼",
    },
    "Form.Password2": {
      required: "請再次填寫您的密碼",
      equalTo: "密碼必須與您第一次設定的相同"
    },
    "Form.MCorg": {
      required: "請輸入單位名稱",
    },
    "Form.MCemployer_name": {
      required: "請輸入負責人姓名",
    },
    "Form.MCemployer_jobtype": {
      required: "請輸入負責人職稱",
    },
    "Form.MCconnect": {
      required: "請輸入聯絡人姓名",
    },
    "Form.MCcon_jobtype": {
      required: "請輸入聯絡人職稱",
    },
    "Form.MCapply_phone": {
      required: "請輸入聯絡電話",
      isTel: "請填寫正確的聯絡電話 EX: 02-89956000"
    },
    "Form.MCapply_Email": {
      required: "請輸入聯絡 E-Mail",
      email: "請輸入正確的信箱格式",
    },
    "Form.MChired_All": {
      required: "請輸入員工總人數",
      digits: "員工總人數必須為數字",
    },
    "Form.MChiredD": {
      required: "請輸入僱用身心障礙員工人數",
      digits: "僱用身心障礙員工人數必須為數字",
    },
  },
});




// 身分證字號
jQuery.validator.addMethod("id_num", function(value, element) {
  var regexp = /^[a-zA-Z][0-9]{9}$/
  return this.optional(element) || regexp.test(value);
}, "請輸入正確的身分證字號");

// 電話號碼
jQuery.validator.addMethod("isTel", function(value, element) {
  var tel = /^\d{2,4}-?\d{7,9}$/; // 電話號碼格式02-12345678
  return this.optional(element) || (tel.test(value));
}, "請填寫正確的電話號碼");


