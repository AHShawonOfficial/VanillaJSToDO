/* Input and Add Button Selection */
const ttlInput = document.querySelector("input#inputttl");
const descInput = document.querySelector("input#inputdesc");
const addBtn = document.querySelector("button#addbtn");

/*Action Buttons Selection*/
const editBtn = document.querySelector("button#editbtn");

/* Table Section */
const tblBody = document.querySelector("#table-body");

/* App */

// Table

if (!localStorage.getItem("todo")) {
   var todos = new Array();
   localStorage.setItem("todo", JSON.stringify(todos));
}

const tableLoop = () => {
   /* Make table Empty*/
   tblBody.innerHTML = "";

   let slNum = 1;
   const currentItems = JSON.parse(localStorage.getItem("todo"));
   currentItems.map((value, index) => {
      tblBody.innerHTML += `<tr data-key="${index}" id="t-row">
      <td>${slNum}</td>
      <td>${value.title}</td>
      <td>${value.desc}</td>
      <td>
      <button id="editbtn">Edit</button>
      <button id="dltbtn">Delete</button>
      </td>
      </tr>`;
      slNum++;
   });

   deleteTodo();
};
tableLoop();

const addTodo = () => {
   const currentItems = JSON.parse(localStorage.getItem("todo"));
   console.log(currentItems);
   addBtn.addEventListener("click", () => {
      let ttlInputValue = ttlInput.value.trim();
      let descInputValue = descInput.value.trim();

      if (!ttlInputValue || !descInputValue) {
         alert("Inputs can't be empty");
         return;
      }
      let inputConvObj = {
         title: ttlInputValue,
         desc: descInputValue,
      };
      currentItems.push(inputConvObj);
      localStorage.clear();
      localStorage.setItem("todo", JSON.stringify(currentItems));

      /* Make Input Boxes Empty */
      ttlInput.value = "";
      descInput.value = "";

      /* Loop Table again */
      tableLoop();
   });
};

addTodo();

function deleteTodo() {
   const tableRows = document.querySelectorAll("#t-row");
   tableRows.forEach((row) => {
      row.querySelector("#dltbtn").addEventListener("click", () => {
         const currentItems = JSON.parse(localStorage.getItem("todo"));
         // const dKey = Number(row.getAttribute("data-key"));
         let remainingItems = currentItems.filter((item, index) => {
            return index !== Number(row.getAttribute("data-key"));
         });

         localStorage.clear();
         localStorage.setItem("todo", JSON.stringify(remainingItems));

         console.log("HI");
         tableLoop();
      });
   });
}

deleteTodo();
