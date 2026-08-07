const input = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");


// 할 일 추가 함수
function addTodo() {

  const todoText = input.value.trim();


  // 빈 입력 방지
  if (todoText === "") {
    return;
  }


  // li 생성
  const li = document.createElement("li");

  li.innerHTML = `
    <span>${todoText}</span>
    <button class="delete-btn">삭제</button>
  `;


  // 삭제 버튼 기능
  const deleteBtn = li.querySelector(".delete-btn");

  deleteBtn.addEventListener("click", function() {
    li.remove();
  });


  // 리스트에 추가
  todoList.appendChild(li);


  // 입력창 초기화
  input.value = "";

  input.focus();
}



// 추가 버튼 클릭
addBtn.addEventListener("click", addTodo);


// Enter 키로 추가
input.addEventListener("keydown", function(event) {

  if (event.key === "Enter") {
    addTodo();
  }

});
