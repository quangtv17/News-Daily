'use strict'
//Đặt biến
const userNameEl = document.getElementById("input-username");
const passWordEl = document.getElementById("input-password");
const userArr = getFromStorage("userArr") || [];

//Tạo event Login
document.getElementById("btn-submit").addEventListener("click", function () {
  // kiểm tra input Username và Password
  const isValidate = validateForm();
  if (isValidate) {
    const user = userArr.find(
      (x) => x.userName === userNameEl.value && x.password === passWordEl.value
    );
    if (user) {
      alert("Đăng nhập thành công 🎉");
      // Lưu thông tin login vào local
      saveToStorage("currentUser", user);
      // Chuyển đến màn hình trang chủ
      window.location.href = "../index.html";
    } else {
      alert("Đăng nhập thất bại ❗");
    }
  }
});

//Hàm validate form
function validateForm() {
  let isValidate = true;
  if (userNameEl.value === "") {
    alert("Vui lòng nhập Username!");
    isValidate = false;
  }
  if (passWordEl.value === "") {
    alert("Vui lòng nhập Password!");
  }
  return isValidate;
}


