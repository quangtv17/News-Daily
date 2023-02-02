'use strict';
//Đặt biến
const container = document.getElementById('news-container');
const prevBtn = document.querySelector('#btn-prev');
const nextBtn = document.querySelector('#btn-next');
const pageNum = document.getElementById("page-num");
// let NEW_PER_PAGE_KEY = 'newPerPage';
// let NEW_CATEGORY_KEY = 'newCategory';
//Lấy dữ liệu từ local
const currentUser = getFromStorage("currentUser");
const pageSize = getFromStorage("newPerPage");
const pageCategory = getFromStorage("newCategory");
console.log(pageSize);
console.log(pageCategory);

//API
let API_URL = "https://newsapi.org/v2/top-headlines?country=us&apiKey=5c5eabcab48148caae0ed64946419d60";
let page = 1;

(async() => {
    let data = await getNews(page);
    renderHTML(data.articles);
}) ();

async function getNews(page) {
    
    const res = await fetch(API_URL + '&page=' + page + '&pageSize=' + pageSize + '&category=' + pageCategory);
    //truyền dữ liệu json vào biến data
    const data = await res.json();
    //trả về 1 mảng chứa các phần tử trong bài viết
    return data;
    
}

//tạo hàm renderHtml in dữ liệu lấy từ API
function renderHTML(articleArr) {
    if (!articleArr) {
        articleArr = [];
    }

    for (let i = 0; i < articleArr.length; i++) {
        let x = articleArr[i];
        let html = `<div class="card flex-row flex-wrap">
            <div class="card mb-3" style="">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src="${x.urlToImage}"
                            class="card-img"
                            alt="${x.title}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${x.title}</h5>
                            <p class="card-text">${x.description}</p>
                            <a href="${x.url}"
                                class="btn btn-primary">View</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
        container.insertAdjacentHTML("beforeend", html);
    }
}
//Sự kiện event Prev
prevBtn.addEventListener('click', async function() {
    page -= 1;
    let data = await getNews(page);
    container.innerHTML = '';
    renderHTML(data.articles);
    checkNextBtn(data.totalResults);
    checkPrevBtn();
    checkPageNum(data.totalResults);
});

//Sự kiện event Next
nextBtn.addEventListener('click', async function() {
    page += 1;
    let data = await getNews(page);
    container.innerHTML = '';
    renderHTML(data.articles);
    checkNextBtn(data.totalResults);
    checkPrevBtn();
    checkPageNum(data.totalResults);
    
})

//Hàm ẩn hoặc hiện nút prev
function checkPrevBtn() {
    if (page <= 1) {
        prevBtn.disabled = true;
        prevBtn.style.display = "none";
    } else {
        prevBtn.disabled = false;
        prevBtn.style.display = "block";
    }
}

//Hàm ẩn hiện nút next
function checkNextBtn(totalResults) {
    let baiVietDaHien = page * pageSize;
    if (baiVietDaHien < totalResults) {
        nextBtn.disabled = false;
        nextBtn.style.display = "block";
    } else {
        nextBtn.disabled = true;
        nextBtn.style.display = "none";
    }
}

//Hàm cập nhật pageNum khi Prev hoặc Next
function checkPageNum(totalResults) {
    let pageNum = document.getElementById("page-num");
    pageNum.innerHTML = page;
    checkNextBtn(totalResults);
    checkPrevBtn();
}
