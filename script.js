const input = document.getElementById("todoInput");
// 할 일을 입력하는 input 요소를 가져옵니다.

const addBtn = document.getElementById("addBtn");
// 추가 버튼을 가져옵니다.

const todoList = document.getElementById("todoList");
// 할 일 목록인 ul 요소를 가져옵니다.


// localStorage에 저장된 할 일을 가져옵니다.
// 저장된 값이 없으면 빈 배열을 사용합니다.
let todos = JSON.parse(localStorage.getItem("todos")) || [];


// 할 일 목록을 화면에 표시하는 함수
function displayTodos() {

    // 기존 목록을 모두 삭제합니다.
    todoList.innerHTML = "";


    // todos 배열의 할 일을 하나씩 화면에 표시합니다.
    todos.forEach(function(todo, index) {

        // 새로운 li 요소를 만듭니다.
        const li = document.createElement("li");


        // 드래그할 수 있도록 설정합니다.
        li.draggable = true;


        // 현재 할 일의 번호를 저장합니다.
        li.dataset.index = index;


        // 할 일 내용과 삭제 버튼을 넣습니다.
        li.innerHTML = `
            <span>${todo}</span>
            <button class="delete-btn">삭제</button>
        `;


        // 삭제 버튼을 가져옵니다.
        const deleteBtn = li.querySelector(".delete-btn");


        // 삭제 버튼을 클릭했을 때 실행됩니다.
        deleteBtn.addEventListener("click", function() {

            // 해당 할 일을 배열에서 삭제합니다.
            todos.splice(index, 1);


            // 변경된 배열을 localStorage에 저장합니다.
            saveTodos();


            // 화면을 다시 표시합니다.
            displayTodos();

        });


        // 드래그를 시작했을 때 실행됩니다.
        li.addEventListener("dragstart", function(event) {

            // 현재 드래그하는 요소의 번호를 저장합니다.
            event.dataTransfer.setData("text/plain", index);

        });


        // 다른 할 일 위에 드래그하고 있을 때 실행됩니다.
        li.addEventListener("dragover", function(event) {

            // 기본 동작을 막아서 드롭할 수 있도록 합니다.
            event.preventDefault();

        });


        // 다른 할 일 위에 놓았을 때 실행됩니다.
        li.addEventListener("drop", function(event) {

            // 드래그했던 할 일의 위치를 가져옵니다.
            const oldIndex = Number(
                event.dataTransfer.getData("text/plain")
            );


            // 현재 놓은 위치를 가져옵니다.
            const newIndex = Number(li.dataset.index);


            // 같은 위치에 놓았다면 아무것도 하지 않습니다.
            if (oldIndex === newIndex) {
                return;
            }


            // 드래그한 할 일을 배열에서 꺼냅니다.
            const draggedTodo = todos.splice(oldIndex, 1)[0];


            // 새로운 위치에 할 일을 넣습니다.
            todos.splice(newIndex, 0, draggedTodo);


            // 변경된 순서를 저장합니다.
            saveTodos();


            // 화면을 다시 표시합니다.
            displayTodos();

        });


        // li를 목록에 추가합니다.
        todoList.appendChild(li);

    });
}



// localStorage에 할 일을 저장하는 함수
function saveTodos() {

    // 배열을 JSON 문자열로 변환해서 저장합니다.
    localStorage.setItem("todos", JSON.stringify(todos));

}



// 새로운 할 일을 추가하는 함수
function addTodo() {

    // 입력창의 내용을 가져옵니다.
    const todoText = input.value.trim();


    // 빈 내용을 입력하면 추가하지 않습니다.
    if (todoText === "") {
        return;
    }


    // 새로운 할 일을 배열에 추가합니다.
    todos.push(todoText);


    // localStorage에 저장합니다.
    saveTodos();


    // 화면을 다시 표시합니다.
    displayTodos();


    // 입력창을 비웁니다.
    input.value = "";


    // 입력창에 다시 커서를 놓습니다.
    input.focus();

}



// 추가 버튼을 클릭하면 할 일을 추가합니다.
addBtn.addEventListener("click", addTodo);



// Enter 키를 누르면 할 일을 추가합니다.
input.addEventListener("keydown", function(event) {

    // Enter 키인지 확인합니다.
    if (event.key === "Enter") {

        // 할 일을 추가합니다.
        addTodo();

    }

});



// 페이지가 처음 실행될 때
// 저장된 할 일을 화면에 표시합니다.
displayTodos();
