// HTML 요소를 가져옵니다.
const input = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");


// 할 일을 추가하는 함수
function addTodo(){

    // 입력한 내용을 가져옵니다.
    const todoText = input.value.trim();

    // 아무것도 입력하지 않았으면 종료
    if(todoText===""){
        return;
    }

    // 새로운 li 생성
    const li=document.createElement("li");

    // li 안에 글자와 삭제 버튼을 넣습니다.
    li.innerHTML=`
        <span>${todoText}</span>
        <button class="delete-btn">삭제</button>
    `;

    // 삭제 버튼 찾기
    const deleteBtn=li.querySelector(".delete-btn");

    // 삭제 버튼을 누르면 해당 li 삭제
    deleteBtn.addEventListener("click",function(){

        li.remove();

    });

    // 목록에 추가
    todoList.appendChild(li);

    // 입력창 비우기
    input.value="";

    // 다시 입력창에 커서 놓기
    input.focus();

}


// 추가 버튼 클릭
addBtn.addEventListener("click",addTodo);


// Enter 키를 누르면 실행
input.addEventListener("keydown",function(event){

    // Enter 키인지 확인
    if(event.key==="Enter"){

        addTodo();

    }

});
