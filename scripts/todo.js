'use strict';
//Đặt biến
const taskEl = document.getElementById('input-task');
const todoList = document.getElementById('todo-list');
//Lấy dữ liệu từ local
const todoArr = getFromStorage("todoArr") || [];
const currentUser = getFromStorage("currentUser");

//Event submit btn add
document.getElementById('btn-add').addEventListener('click', function(e) {
    e.preventDefault();

    let isDone = false;
    let owner = currentUser.userName;
    
    if(taskEl.value.trim().length === 0) {
        alert('Vui lòng nhập nội dung công việc ❗');
    } else {
        const data = new Task (
            taskEl.value,
            owner,
            isDone
        );
        todoArr.push(data);
        //Lưu dư liệu vào local
        saveToStorage("todoArr", todoArr);
        hienThiTask();
        taskEl.value = '';
    }
    
})

function hienThiTask() {
    //hiển thị ra theo mẫu dùng hàm filter để trả về 1 mảng phần tử đã chọn
    let filterTask = todoArr.filter(task => {
        
        let userName = currentUser.userName;

        //hiện thị các task có owner trùng với userName của người dùng hiện tại
        if (task.owner == userName) {
            return true;
        } else {
            return false;
        }
    })
    renderHtml(filterTask);
};

(() => {
    hienThiTask();
})()

function renderHtml(todoListArr) {
    let html = '';
    //sử dụng vòng lặp forEach để lặp quá các phần tử của mảng
    todoListArr.forEach(x => {
        if (x.isDone) { 
            html += 
                `<li class="checked" onclick="toggleTask('${x.task}', ${x.isDone})">
                    ${x.owner}
                    <span class="close" onclick="deleteTask(event, '${x.task}', ${x.isDone}, '${x.owner}')">×</span>
                </li>`;
        } else {
            html += 
                `<li onclick="toggleTask('${x.task}', ${x.isDone})">
                    ${x.task}
                    <span class="close" onclick="deleteTask(event, '${x.task}', ${x.isDone}, '${x.owner}')">x</span>
                </li>`;
        }
        todoList.innerHTML = html;
    })
};

function toggleTask(task, isDone) {
    //dùng hàm index để duyệt qua từng phần tử trong mảng todoArr
    let index = todoArr.findIndex(a => {
        if (a.task == task && a.isDone == isDone) {
            return true;
        } else {
            return false;
        }
    });
    let checkTask = todoArr[index];
    checkTask.isDone = !checkTask.isDone;
    //Lưu dữ liệu vào local
    saveToStorage("todoArr", todoArr);
    hienThiTask();
};

//Xóa Task
function deleteTask(e, task, isDone, owner) {
    e.stopPropagation();

    //tìm index.
    //dùng hàm findIndex để duyệt qua từng từng phần tử trong mảng 
    const index = todoArr.findIndex(checkTask => {
        if (checkTask.task == task && checkTask.isDone == isDone && checkTask.owner == owner) {
            return true;
        } else {
            return false;
        }
    });
    let isDelete = confirm('Bạn chắc chắn muốn xóa ❗');
    if(isDelete) {
        todoArr.splice(index, 1);
        saveToStorage("todoArr", todoArr);
        hienThiTask();
    }
}



