'use strict'
//Lưu dữ liệu vào Local
const saveToStorage = function(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
};
//Lấy dữ liệu từ local
const getFromStorage = function(key) {
    return JSON.parse(localStorage.getItem(key));
};

//Chuyển từ JS object sang Class instance
function parseUser(userData) {
    const user = new User(
        userData.firstName,
        userData.lastName,
        userData.userName,
        userData.password
    );
    return user;
}
