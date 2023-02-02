'use strict'

const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const welcomeMessage = document.getElementById("welcome-message");
const currentUser = getFromStorage("currentUser");

// Kiểu tra nếu đăng nhập thì hiển thị tên người đăng nhập
function displayHome() {
    //Người dùng đã đăng nhập thì ẩn "loginModal" và hiển thị "mainContent"
    if (currentUser) {
        loginModal.style.display = "none";
        mainContent.style.display = "block";
        // Thông báo Welcome
        welcomeMessage.textContent = `Welcome ${currentUser.firstName}`;
    } else {
        //Người dùng chưa đăng nhập thì hiện "loginModal" và ẩn "mainContent"
        loginModal.style.display = "block";
        mainContent.style.display = "none";
    }
}
displayHome();

// Tạo event submit log out
document.getElementById("btn-logout").addEventListener("click", function () {
    const isLogout = confirm("Bạn chắc chắn muốn Log out?");
    if (isLogout) {
        localStorage.removeItem("currentUser");
        window.location.href = "./index.html";
    }
});

