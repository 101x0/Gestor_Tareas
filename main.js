let date = new Date();
let dia = document.getElementById("dateNumber");
let mes = document.getElementById("dateMonth");
let anio = document.getElementById("dateYear");
let diaSemana = document.getElementById("dateText");
let tasksContainer = document.getElementById("tasksContainer");
document.getElementById("dateSelect").addEventListener("change", dateChange);
document.getElementById("taskText").focus();

setDate();

function dateChange() {
  date = new Date(document.getElementById("dateSelect").value);
  setDate();
}

function setDate() {
  dia.innerHTML = date.toLocaleDateString("es", { day: "numeric" });
  mes.innerHTML = date.toLocaleDateString("es", { month: "short" });
  anio.innerHTML = date.toLocaleDateString("es", { year: "numeric" });
  diaSemana.innerHTML = date.toLocaleDateString("es", { weekday: "long" });
}

function addNewTask(event) {
  event.preventDefault();
  let value = document.getElementById("taskText").value;
  if (!value || value.trim() == 0) {
    event.target.reset();
    return;
  }
  let task = document.createElement("div");
  task.classList.add("task", "roundBorder");
  task.addEventListener("click", changeTaskState);
  task.innerHTML = value + " <span>(" + dia.innerHTML + "-" + mes.innerHTML + "-" + anio.innerHTML + ")</span>";
  task.innerHTML += "<i class='fa fa-bars'></i>";
  task.setAttribute("fecha", date);
  tasksContainer.prepend(task);
  event.target.reset();
  document.getElementById("taskText").focus();
}

function changeTaskState(event) {
  event.target.classList.toggle("done");
}

function order() {
  let done = [];
  let toDo = [];
  tasksContainer.childNodes.forEach((t) => {
    t.setAttribute("fecha", new Date(t.getAttribute("fecha")));
    t.classList.contains("done") ? done.push(t) : toDo.push(t);
  });

  toDo.sort((a, b) => {
    return (
      new Date(a.getAttribute("fecha")) - new Date(b.getAttribute("fecha"))
    );
  });

  done.sort((a, b) => {
    return (
      new Date(a.getAttribute("fecha")) - new Date(b.getAttribute("fecha"))
    );
  });

  document.getElementById("taskText").focus();
  return [toDo, done];
}

function renderOrderedTasks() {
  let done = order()[1];
  let toDo = order()[0];
  tasksContainer.innerHTML = "";
  toDo.forEach((t) => tasksContainer.appendChild(t));
  done.forEach((t) => tasksContainer.appendChild(t));
}

function cleanTasks() {
  let toDo = order()[0];
  tasksContainer.innerHTML = "";
  toDo.forEach((t) => tasksContainer.appendChild(t));
}

let dragArea = document.getElementById("tasksContainer");
new Sortable(dragArea, {
  animation: 500,
});