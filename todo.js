// los import siempre primeros

// import tareas from "./state.js"
let listaDeTareas = []

// buscar  elementos en el dom
const formulario= document.getElementById("form")
const ulDeTareas =document.getElementById("lista-tareas") // camel case
const pendientesSpan = document.getElementById("pendientes")
const btnBorrar = document.getElementById("btn-borrar")

//*Estado
//? tareas.length la cantidad de items

//? SUBMINT = enviar 

formulario.onsubmit = function (event) {
    event.preventDefault() // prevenir el comportamiento por defecto
    const userText = formulario.tarea.value // valor del input llamado "tarea"
    addTarea(userText)
    formulario.tarea.value = ""//vaciar input
}

function addTarea(nuevaTarea) {
  listaDeTareas.push(nuevaTarea)
  save()
  //crear el li
  const li = document.createElement('li')
  //le doy el atrr id
  li.textContent = nuevaTarea
  // añadir elemento li al ul
  ulDeTareas.appendChild(li)//insertar hijo
  // ulDeTareas.innerHTML= ulDeTareas.innerHTML + "<li id='item" + listaDeTareas.length + "'>" + nuevaTarea + "</li>"

  //.innerHTML. INNERtEXT . 
  pendientesSpan.textContent = listaDeTareas.length

  
  li.onclick = function(){
    li.remove()//eliminar del html//
    //encontrar la posicion//
    const indice= listaDeTareas.findIndex(function (item){
      return item === nuevaTarea
    })
    listaDeTareas.splice(indice ,1)
    save()
    pendientesSpan.textContent = listaDeTareas.length //actualizar el numero
  }
}



btnBorrar.onclick= function (){
  //vaciar la listad e tareas
  listaDeTareas = []
  save()
  // actualizar pendientesSpan a 0
  pendientesSpan.texContent = listaDeTareas.length
  // eliminar todos los li dentro de la lista
  ulDeTareas.innerHTML = ""

}

function save() {
  // se toma a la lista y la transforma en un string
  const listaDeTareasEnTexto = JSON.stringify(listaDeTareas)


  localStorage.setItem('listaDeTareas', listaDeTareasEnTexto)
}

// la fn se ejecuta al principio

function init() {
  // leer la tarea / puede serr NULL
  const listaDeTareasEnTexto = localStorage.getItem('listaDeTareas')
  // tranformar en un array
  const array = JSON.parse(listaDeTareasEnTexto)
  // si es null asigno una lisat vacia, sino la proía que lei en ls
  let arrayAuxiliar
  if (array === null) {
    arrayAuxiliar= []
    
  } else {
     arrayAuxiliar = array
  }
  arrayAuxiliar.forEach(function (item){
    addTarea(item)
  })
}
 init()