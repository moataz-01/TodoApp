let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("task");
let add = document.getElementById("add");
let modal = document.getElementById("modal");

let showModal = () =>{
    // from.style.display = "flex";
    // modal.classList.add("zoom-open");
    modal.style.transform = "scale(1)";
    form.style.height = "100%";
}

let closeForm = () => {
    // modal.classList.remove("zoom-open");
    modal.style.transform = "scale(0)";
    form.style.height = "0";
    // from.style.display = "none";
}


form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
  });
  
let formValidation = () => {
    if (textInput.value === "") {
      console.log("failure");
      msg.innerHTML = "Task cannot be blank";
    } else {
      console.log("success");
      msg.innerHTML = "";
      acceptData();
      closeForm();
    }
};


let data = [];
let acceptData = ()=>{
    data.push(
        {task:textInput.value, date:dateInput.value, description:textarea.value}
    );
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
        createTasks();
}

let createTasks = ()=> {
    tasks.innerHTML = "";
    data.map((x, y) => {
        return (tasks.innerHTML += `
        <div id=${y}>
              <p class="taskStyle">${x.task}</p>
              <span class="dateStyle">${x.date}</span>
              <p class="desStyle">${x.description}</p>
      
              <span class="options">
                <i onClick= "editTask(this);showModal()" class="fas fa-edit"></i>
                <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
              </span>
            </div>
        `);
      });
    
      resetForm();
      
}
let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
  };

let deleteTask = (e)=> {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));

    console.log(data);

}
  

let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;
    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;
  
    deleteTask(e);
  
}
(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log(data);
    createTasks();
  })();
  