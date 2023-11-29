const botonBorrar = document.querySelector("#deleteAll")
let guardarNum = 0

const btnAll = document.getElementById("all");
const btnActive = document.getElementById("active");
const btnCompleted = document.getElementById("completed");
const form = document.getElementById('form')

let inputDeTareas = document.querySelector("#addDetails");

let contador = parseInt(localStorage.getItem('contador')) || 0;

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];




/* Los siguientes nombres de funciones son una sugerencia de funciones que necesitarás en tu programa,
sin embargo, no te limites solo a estas funciones. Crea tantas como consideres necesarias.

La estructura de cada objeto "tarea" es la siguiente:

{
  id: 1,
  title: "tarea",
  completed: false
}

*/

/*BOTONES DE NAVBAR */
function pintarBotones(){
  btnAll.addEventListener("click", () => {
      btnAll.classList.add("pintarBoton");
      btnActive.classList.remove('pintarBoton');
      btnCompleted.classList.remove('pintarBoton');
      addTask(); 
    
  });

  btnActive.addEventListener('click', () => {
      btnActive.classList.add("pintarBoton");
      btnAll.classList.remove('pintarBoton'); 
      btnCompleted.classList.remove('pintarBoton');
      filterUncompleted();
})
 
btnCompleted.addEventListener('click', ()=>{
      btnCompleted.classList.add('pintarBoton');
      btnActive.classList.remove("pintarBoton");
      btnAll.classList.remove('pintarBoton'); 
      filterCompleted(); 
    
})
}  

pintarBotones()

form.addEventListener('submit', saveTask); 


function saveTask() {
  const nombreTareas = inputDeTareas.value;

  const task = {
    id: contador,
    title: nombreTareas,
    completed: false
  }

  if (nombreTareas == "") {
    return;
  }

  
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  contador++;
  localStorage.setItem('contador', contador);

  addTask();
  
}
 
// Función para añadir una nueva tarea
  function addTask(filtrarTasks = []) {
    let tasksView = document.getElementById('ulList');
    tasksView.innerHTML = '';
   
  
    for (let i = 0; i < filtrarTasks.length; i++) {
      let title = filtrarTasks[i].title;
      tasksView.innerHTML +=
        `
        <div class ="containerAll">
            <div class="card-body">
              <div id="editor">
                <input ${filtrarTasks[i].completed ? 'checked' : ''} onclick="completeTask(${i})" type="checkbox" class="form-check-input btnCheck" id="task${i}">
                <label for="task${i}">${title}</label>
              </div>
              <div id="caja">
              ${btnCompleted.classList.contains("pintarBoton") ? `<a onclick="deleteTasks('${title}')"><i class="fas fa-trash" id="trash"></i></a>` : '' }
              </div>
            </div>
        </div>
        
        `;
    }
  
  }
  


// Función para marcar una tarea como completada o imcompleta (Puede ser la misma función)

function completeTask(index) {
  let tasks = JSON.parse(localStorage.getItem('tasks'));


  tasks[index].completed = !tasks[index].completed;

  localStorage.setItem('tasks', JSON.stringify(tasks));

  tasks = JSON.parse(localStorage.getItem('tasks'))
  

  if(guardarNum === 0){
    addTask(tasks);

  }

  if(guardarNum === 1){
    filterUncompleted()
  }

  if(guardarNum === 2){
    filterCompleted()
  }

}


// Funcion para borrar todas las tareas
function deleteAll() {
  const dataLimpia = JSON.parse(localStorage.getItem('tasks')) || [];

 const borraAll = dataLimpia.filter(task => task.completed === false)

  localStorage.setItem('tasks', JSON.stringify(borraAll));
  
  
  filterCompleted(borraAll)

}



// Función para filtrar tareas completadas
btnCompleted.addEventListener('click', () => 

{ guardarNum = 2; 
  filterCompleted()});

function filterCompleted() {

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  let arrayFiltrar = tasks.filter(task => task.completed === true);


  botonBorrar.classList.remove("hidden")

  botonBorrar.addEventListener('click', deleteAll)

  addTask(arrayFiltrar);

}

// Función para filtrar tareas incompletas
btnActive.addEventListener('click', () =>
 { guardarNum = 1; 
  filterUncompleted()});

function filterUncompleted() {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  let arrayFiltrar = tasks.filter(task => !task.completed);
 

  botonBorrar.classList.add("hidden")
  addTask(arrayFiltrar);
}

btnAll.addEventListener('click', ()=> {
  botonBorrar.classList.add("hidden")
  guardarNum = 0;
  tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  addTask(tasks)})



//FUNCION BORRA TAREAS //
function deleteTasks(title) {
  let tasks = JSON.parse(localStorage.getItem('tasks')); 
 
   for (let i = 0; i < tasks.length; i++) {
     if(tasks[i].title == title){
       tasks.splice(i, 1); 
     }
   }
   localStorage.setItem('tasks', JSON.stringify(tasks)); 
   addTask(); 
 }

 addTask(tasks);








