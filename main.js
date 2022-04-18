window.onload = inicio;

function inicio(){
    document.getElementsByTagName("input")[0].focus();
}

let date = new Date();
let dia = document.getElementById("dateNumber");
let mes = document.getElementById("dateMonth");
let anio = document.getElementById("dateYear");
let diaSemana = document.getElementById("dateText");

dia.innerHTML = date.toLocaleDateString('es', { day: 'numeric' });
mes.innerHTML = date.toLocaleDateString('es', { month: 'short' });
anio.innerHTML = date.toLocaleDateString('es', { year: 'numeric' });
diaSemana.innerHTML += date.toLocaleDateString('es', { weekday: 'long' });

let tasksContainer = document.getElementById("tasksContainer");

function addNewTask(event) {
    event.preventDefault();
    let value = document.getElementsByTagName("input")[0].value;
    if (!value || value.trim() == 0) {
        event.target.reset();
        return;
    }
    let task = document.createElement("div");
    task.classList.add("task", "roundBorder");
    task.addEventListener("click", changeTaskState);
    task.innerHTML = value;
    task.innerHTML += "<i class='fa fa-bars'></i>";
    tasksContainer.prepend(task);
    event.target.reset();
    inicio();
}

function changeTaskState(event) {
    event.target.classList.toggle("done");
}

function order() {
    let done = [];
    let toDo = [];
    tasksContainer.childNodes.forEach(t => {
        t.classList.contains("done") ? done.push(t) : toDo.push(t);
    })
    return [toDo, done];
}

function renderOrderedTasks() {
    let tasks = order()[1];
    tasks.forEach(t => tasksContainer.appendChild(t));
}

function cleanTasks() {
    let toDo = order()[0];
    tasksContainer.innerHTML = "";
    toDo.forEach(t => tasksContainer.appendChild(t));
}

let dragArea = document.getElementById("tasksContainer");
new Sortable(dragArea, {
    animation: 500
});