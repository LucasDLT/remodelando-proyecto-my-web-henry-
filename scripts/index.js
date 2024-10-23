
class Repository {
  constructor() {
    this.activities = this.loadActivities();//con this hago referencia a un metodo definido mas abajo
  }

  // Carga las actividades desde localStorage
  loadActivities() {
    const activities = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);//en la constante se va iterar cada indice pasado por el metodo key, obteniendo en cada vez el nombre de la clave guardada
      if (key.startsWith("activity.")) {//starSwith es un metodo para strings, aca lo utilice para verificar que la cadena comience con el parametro entre comillas y verificar que la condicion sea true
        const activity = localStorage.getItem(key);//declaro otra constante donde guardo el valor de la constante key que ahora es la cadena guardada en storage
        if (activity) {//nueva verificacion de que existe
          activities.push(JSON.parse(activity));//pusheo al array el objeto parseado para que se vuelva un objeto de js ya que al ser recuperado del storage viene como string
        }
      }
    }
    return activities;//devuelvo el listado actualizado
  }

  createActivity(activity) {
    // Generar un ID único basado en la longitud del array más uno
    activity.id = this.activities.length > 0 ? Math.max(...this.activities.map(a => a.id)) + 1 : 1;//para crear un id unico primero se verifica que la longitud del array sea mayor a 0, si no es se le asigna 1, ahora si es mayor a 0 entra en el condicional, se utiliza primero un math max para verificar dentro del array mapeado cual es el indice mas grande, y a ese le suma 1 para que no haya uno duplicado y sean secuenciales, es decir si es 2 el proximo sea 3. No funcionaba por que me habia lvidado del spread operator. 
    this.activities.push(activity);
    localStorage.setItem(`activity.${activity.id}`, JSON.stringify(activity)); //envio a localstorage la primer cadena key lleva con templatestrings el id para identificarlo, y se pasa por el metodo stringify para pasarlo a cadena ya que en js es un objeto 
  }

  getAllActivities() {
    return this.activities;
  }

  eliminarActividad(id) {
    const index = this.activities.findIndex(activity => activity.id === id);// devuelve -1 si el bloque da false, ya que no encuentra el indice
    if (index !== -1) {
      this.activities.splice(index, 1); // Eliminar de la lista
      localStorage.removeItem(`activity.${id}`); // Eliminar de localStorage 
      mostrarActividades(); // Actualizar la vista
    }
  }
}

const contenedor = document.getElementById("contenedor_actividad");
const boton = document.querySelector("#enviar");

const primerRepo = new Repository();

boton.addEventListener("click", handler);

function handler(event) {
  event.preventDefault();

  const titulo = document.querySelector("#titulo").value.trim();
  const descripcion = document.querySelector("#descripcion").value.trim();
  const imagenUrl = document.querySelector("#imgUrl").value.trim();

  if (titulo === "" || descripcion === "" || imagenUrl === "") {
    alert("Por favor, completa todos los campos");
    return;
  }

  const nuevaAct = {
    title: titulo,
    description: descripcion,
    imgUrl: imagenUrl,
  };

  primerRepo.createActivity(nuevaAct);
  mostrarActividades();

  document.querySelector("#titulo").value = "";
  document.querySelector("#descripcion").value = "";
  document.querySelector("#imgUrl").value = "";
}

function mostrarActividades() {
  contenedor.innerHTML = "";
  const listado = primerRepo.getAllActivities();
  const mapeo = listado.map(activity => maquetaCard(activity));
  mapeo.forEach(card => contenedor.append(card));
}

function maquetaCard(activity) {
  const h3 = document.createElement("h3");
  h3.className = "titulo_div";
  h3.innerText = activity.title;

  const p = document.createElement("p");
  p.className = "parrafo_div";
  p.innerText = activity.description;

  const imagen = document.createElement("img");
  imagen.className = "imgRender";
  imagen.src = activity.imgUrl;
  imagen.alt = "imagen renderizada";

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Eliminar";
  deleteButton.className = "btn";
  deleteButton.addEventListener("click", () => {
    primerRepo.eliminarActividad(activity.id);
    mostrarActividades(); 
  });

  const div = document.createElement("div");
  div.className = "div";
  div.append(h3, imagen, p, deleteButton);
  return div;
}

mostrarActividades();
