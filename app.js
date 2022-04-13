// const state = [
//    {
//       id: 1,
//       title: "Go Hospital",
//       desc: "to see someone",
//    },
//    {
//       id: 2,
//       title: "Go Home",
//       desc: "from Hospital",
//    },
// ];
// localStorage.setItem("todos", JSON.stringify(state));

if (!JSON.parse(localStorage.getItem("todos"))) {
   localStorage.setItem("todos", JSON.stringify([]));
}

//MAIN TABLE LOOP
const tableLoop = () => {
   const todos = JSON.parse(localStorage.getItem("todos"));

   const tblBody = document.querySelector("#table-body");
   tblBody.innerHTML = "";
   todos.map((todo, index) => {
      tblBody.innerHTML += `<tr data-key="${todo.id}" id="t-row">
      <td>${index + 1}</td>
      <td>${todo.title}</td>
      <td>${todo.desc}</td>
      <td>
      <button id="editbtn">Edit</button>
      <button id="dltbtn">Delete</button>
      </td>
      </tr>`;
      deleteTodo();
      editTodo();
   });
};
tableLoop();

//ADD BUTTON
document.querySelector("#addbtn").addEventListener("click", (e) => {
   e.preventDefault();
   const inputTitle = document.querySelector("#inputttl");
   const inputDesc = document.querySelector("#inputdesc");
   const inputTitleValue = inputTitle.value.trim();
   const inputDescValue = inputDesc.value.trim();

   if (!inputTitleValue || !inputDescValue) {
      alert("Inputs can't be empty");
      return;
   }

   const id = Math.floor(Math.random() * 10000) + 1;

   const newTodo = {
      id: id,
      title: inputTitleValue,
      desc: inputDescValue,
   };
   const todos = JSON.parse(localStorage.getItem("todos"));
   const newTodos = todos.push(newTodo);
   localStorage.clear();
   localStorage.setItem("todos", JSON.stringify(todos));
   tableLoop();
   inputTitle.value = "";
   inputDesc.value = "";
   inputTitle.focus();
});

//Delete Button
function deleteTodo() {
   const rows = document.querySelectorAll("#t-row");
   rows.forEach((row) => {
      row.querySelector("#dltbtn").addEventListener("click", () => {
         const dataKey = Number(row.getAttribute("data-key"));
         const currentTodos = JSON.parse(localStorage.getItem("todos"));
         const remainingTodos = currentTodos.filter((todo) => {
            return todo.id !== dataKey;
         });
         localStorage.clear();
         localStorage.setItem("todos", JSON.stringify(remainingTodos));
         tableLoop();
      });
   });
}
deleteTodo();

//EDIT BUTTON
function editTodo() {
   const rows = document.querySelectorAll("#t-row");

   rows.forEach((row, index) => {
      row.querySelector("#editbtn").addEventListener("click", () => {
         document.querySelector("#addForm").style.display = "none";
         document.querySelector("#modifyForm").style.display = "flex";
         const dataKey = Number(row.getAttribute("data-key"));
         const currentTodos = JSON.parse(localStorage.getItem("todos"));
         const targetTodo = currentTodos.filter((todo) => {
            return todo.id === dataKey;
         });
         document.querySelector("#modify-title").value = targetTodo[0].title;
         document.querySelector("#modify-desc").value = targetTodo[0].desc;
         clickedIndex = index;
      });
   });
}
editTodo();

function updateTodo() {
   document.querySelector("#update").addEventListener("click", (e) => {
      e.preventDefault();

      const todos = JSON.parse(localStorage.getItem("todos"));
      const newTitle = document.querySelector("#modify-title").value;
      const newDesc = document.querySelector("#modify-desc").value;
      if (newTitle == "" || newDesc == "") {
         alert("Inputs are empty");
         return;
      }

      if (!todos[clickedIndex]) {
         document.querySelector("#modify-title").value = "";
         document.querySelector("#modify-desc").value = "";
         clickedIndex = null;
         document.querySelector("#modifyForm").style.display = "none";
         document.querySelector("#addForm").style.display = "flex";
         alert("ERROR");
         return;
      }

      todos[clickedIndex].title = newTitle;
      todos[clickedIndex].desc = newDesc;

      localStorage.clear();
      localStorage.setItem("todos", JSON.stringify(todos));
      document.querySelector("#modify-title").value = "";
      document.querySelector("#modify-desc").value = "";
      clickedIndex = null;
      document.querySelector("#modifyForm").style.display = "none";
      document.querySelector("#addForm").style.display = "flex";
      tableLoop();
   });
}
updateTodo();

document.querySelector("#cancel").addEventListener("click", (e) => {
   e.preventDefault();
   document.querySelector("#modify-title").value = "";
   document.querySelector("#modify-desc").value = "";
   clickedIndex = null;
   document.querySelector("#modifyForm").style.display = "none";
   document.querySelector("#addForm").style.display = "flex";
});
