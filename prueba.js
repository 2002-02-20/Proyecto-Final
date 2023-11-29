const btnAll = document.querySelector('#all')
const btnActive = document.querySelector('#active')
const btnCompleted = document.querySelector('#completed')
const form = document.querySelector("#form")
const inputTareas = document.querySelector("#addDetails")
const imprimirTareas = document.querySelector("#ulList")
const btnEraseAll = document.querySelector("#deleteAll")
const addBoton = document.querySelector('#boton')


// setItem ENVIAR INFORMACIÓN 
// getITem OBTNER INFORMACIÓN 
let arrayTareas = JSON.parse(localStorage.getItem('tareas')) || [];
contador = parseInt(localStorage.getItem('contador')) ||0 



btnAll.addEventListener('click', ()  =>{
  btnAll.classList.add('pintarBoton'); 
  btnActive.classList.remove('pintarBoton'); 
  btnCompleted.classList.remove('pintarBoton'); 
  allTask()
})

btnActive.addEventListener('click', ()  =>{
  btnAll.classList.remove('pintarBoton'); 
  btnActive.classList.add('pintarBoton'); 
  btnCompleted.classList.remove('pintarBoton');
  filterActive(); 
})

btnCompleted.addEventListener('click', ()  =>{
  btnAll.classList.remove('pintarBoton'); 
  btnActive.classList.remove('pintarBoton'); 
  btnCompleted.classList.add('pintarBoton'); 
  filterCompleted()
})


addTask(arrayTareas)

form.addEventListener('submit', saveTask)

function saveTask(e) {
    e.preventDefault();
    
    const ValText = inputTareas.value

    inputTareas.value = ""; 
    if(ValText == ""){
      return
    }

    const tareas = {
        id: contador,
        title: ValText,
        completed: false
    }

    arrayTareas.push(tareas)


  localStorage.setItem('tareas', JSON.stringify(arrayTareas));

  contador++
  localStorage.setItem('contador', contador)

  addTask()
}

function addTask(array = []){
  imprimirTareas.innerHTML = "";

  for (let i = 0; i < array.length; i++) {
    const li = document.createElement("li");
    const input = document.createElement("input");
    input.type = "checkbox";

    input.id = array[i].id;
    
    input.checked = array[i].completed;

    const label = document.createElement("label");
    label.setAttribute("for", array[i].id);

    label.textContent = array[i].title;

    input.addEventListener("change", () => {
      trueOrFalse(i);
    });

    li.appendChild(input);
    li.appendChild(label);
    imprimirTareas.appendChild(li);

  }
}

function trueOrFalse(index) {
  
  arrayTareas[index].completed = !arrayTareas[index].completed

  localStorage.setItem('tareas', JSON.stringify(arrayTareas)); 

  //addTask()

  
}

function allTask(){
  let arrayAll = arrayTareas

  addTask(arrayAll)

  inputTareas.classList.remove('textHom')
  btnEraseAll.classList.add('hidden')
}

function filterActive() {
  let arrayActive = arrayTareas.filter(completed => !completed.completed)

  addTask(arrayActive)

  inputTareas.classList.remove('textHom')
  btnEraseAll.classList.add('hidden')

}

function filterCompleted(){

  let arrayCompleted = arrayTareas.filter(completed => completed.completed)

  addTask(arrayCompleted)

  inputTareas.classList.add('textHom')
  btnEraseAll.classList.remove('hidden')

  btnEraseAll.addEventListener ('click', deleteAll)

}

function deleteAll(){
  
  let dataLimpia = arrayTareas

  let borraAll = dataLimpia.filter(data => data.completed === false)

  localStorage.setItem('tareas', JSON.stringify(borraAll));

 
  filterCompleted(borraAll)


}
