'use strict';
let NEW_PER_PAGE_KEY = 'newPerPage';
let NEW_CATEGORY_KEY = 'newCategory';

const pageSize = document.getElementById('input-page-size');
const categoryEl = document.getElementById('input-category');
const currentUser = getFromStorage("currentUser");


document.getElementById('btn-submit').addEventListener('click', function(e) {
    e.preventDefault();
    if(validate()) {
        if(!isNaN(pageSize.value) && pageSize.value > 0) {
            saveToStorage(NEW_PER_PAGE_KEY, pageSize.value);
            saveToStorage(NEW_CATEGORY_KEY, categoryEl.value);
            alert('Thay đổi thành công 🎉');
        }
        pageSize.value == '';
        categoryEl.value == 'General';
    }
});
console.log(getFromStorage(NEW_PER_PAGE_KEY, pageSize.value));
console.log(getFromStorage(NEW_CATEGORY_KEY, categoryEl.value));
function validate() {
    let isValidate = true;
    if(pageSize.value < 0) {
        alert('News per page không hợp lệ ❗');
        isValidate = false;
        pageSize.value == '';
    }
    if (categoryEl.value === '') {
        alert('Cần chọn Category!');
        isValidate = false;
        categoryEl.value == 'General';
    }
    return isValidate;
}
