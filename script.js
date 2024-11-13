let form = document.querySelector("form");
let taskInput = document.querySelector(".task"); 
let list = document.querySelector("ol");

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
renderTasks();

function renderTasks() {
    list.innerHTML = "";
    tasks.map(task => {
        list.innerHTML +=
         `
             <li>
                 <span class="${task.completed ? 'completed' : ''}"> ${task.text} </span>
                 <button class="delbtn" onclick="del(${task.id})">Delete</button>
                 <button class="checkbtn" onclick="checkTask(${task.id})">Check</button>
             </li>
         `;
    });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let getValue = taskInput.value; 

    if (getValue.trim() === "") return; 

    let newTask = { 
        id: Date.now(),
        text: getValue,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = ""; 
});

function del(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function checkTask(id) {
    let task = tasks.find(task => task.id == id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


