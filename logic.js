let addingInp = document.querySelector(".add_task input");
let addingBtn = document.querySelector(".add_task .add_btn");
let tasksContainer = document.querySelector(".tasks_content");
let noTasksSpan = document.querySelector(".tasks_content .no_tasks");
let taskCount = document.querySelector(".tasks_count span");
let taskCompleted = document.querySelector(".completed_task span");
let closeBtn = document.querySelector(".alert .close");
let closeBtnDupl = document.querySelector(".DuplicatedTasks .close1");

// Set Date To Use Later
let date = `${new Date().getDate()}/${
  new Date().getMonth() + 1
}/${new Date().getFullYear()}`;

// Focus On Input Field
window.addEventListener("load", addingInp.focus());

// Array Of Tasks
let arrOfTasks = [];

// Check Items Found
if (localStorage.getItem("tasks")) {
  arrOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// Get Items from LocalStorage
getItemsFromLocalStorage();

// Adding Btn
addingBtn.addEventListener("click", (e) => {
  if (addingInp.value !== "") {
    arrOfTasks.forEach((el) => {
      if (addingInp.value == el.title) {
        closeAlert(closeBtnDupl);
        throw Error("Task Duplicated");
      }
    });
    arrOfTasksFn(addingInp.value);
    addingInp.value = "";
    addingInp.focus();
    calculateTasks();
  } else {
    closeAlert(closeBtn);
  }
});

function arrOfTasksFn(taskText) {
  // Object Of Tasks
  const task = {
    id: Date.now(),
    title: taskText,
    status: false,
    date: date,
  };
  arrOfTasks.unshift(task);
  addElsToPage(arrOfTasks);
  addToLocalStorageFn();
}

function addElsToPage(array) {
  tasksContainer.innerHTML = "";
  array.forEach((el) => {
    let mainSpan = document.createElement("span");
    let delBtn = document.createElement("span");
    let dateSpan = document.createElement("span");
    dateSpan.appendChild(document.createTextNode(date));
    mainSpan.appendChild(document.createTextNode(el.title));
    mainSpan.setAttribute("data-id", el.id);
    delBtn.appendChild(document.createTextNode("Delete"));
    mainSpan.className = "task_box";
    delBtn.className = "delete";
    dateSpan.className = "date";
    mainSpan.appendChild(dateSpan);
    mainSpan.appendChild(delBtn);
    tasksContainer.appendChild(mainSpan);
  });
}

function addToLocalStorageFn() {
  localStorage.setItem("tasks", JSON.stringify(arrOfTasks));
}

// Delete Button Function
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    deleteWithId(e.target.parentElement.getAttribute("data-id"));
  }

  // Finish Task
  if (e.target.classList.contains("task_box")) {
    e.target.classList.toggle("finished");
  }

  // Delete All Tasks
  if (e.target.classList.contains("deleteAll")) {
    tasksContainer.innerHTML = "";
    arrOfTasks = [];
  }

  // Finish All Tasks
  if (e.target.classList.contains("finishAll")) {
    Array.from(tasksContainer.children).forEach((el) => {
      el.classList.toggle("finished");
    });
  }
  addToLocalStorageFn();
  calculateTasks();
});

function getItemsFromLocalStorage() {
  if (localStorage.getItem("tasks")) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    addElsToPage(tasks);
    calculateTasks();
  }
}

function deleteWithId(taskId) {
  arrOfTasks = arrOfTasks.filter((x) => x.id != taskId);
  addToLocalStorageFn();
}

function calculateTasks() {
  taskCount.innerHTML = JSON.parse(localStorage.getItem("tasks")).length;
  taskCompleted.innerHTML = document.querySelectorAll(
    ".tasks_content .finished"
  ).length;
  addToLocalStorageFn();
}

function closeAlert(alertAct) {
  alertAct.parentElement.classList.remove("scaled");
  alertAct.addEventListener("click", () => {
    alertAct.parentElement.classList.add("scaled");
  });
}
