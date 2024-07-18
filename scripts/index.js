function getDataForm() {
  let data = JSON.parse(localStorage.getItem("dataForm"))
  if (data) {
    console.log(data);
    primerRepo.createActivity(data)
    mostrarActividades();

  }else{alert("Comienza a agregar actividades.")}
  return data
}
getDataForm()

class Activity {
  constructor({ id, title, description, imgUrl }) {
    this.id = id,
    this.title = title,
    this.description = description,
    this.imgUrl = imgUrl;
  }
}
class Repository {
  constructor(activities) {
    this.activities = activities || [];
    this.id = 0;
  }
  getAllActivities = () => this.activities;

  createActivity = (activity) => {
    this.id++;
    let newActivity = new Activity(activity);
    this.activities.push(newActivity);
  };
  deleteActivity = (id) => {
    let deleted = this.activities.filter((activities) => activities.id !== id);
    return (this.activities = [...deleted]);
  };
}


const contenedor = document.getElementById("contenedor");

const boton = document.querySelector("#enviar");

const primerRepo = new Repository();

boton.addEventListener("click",handler )

function mostrarActividades() {
  contenedor.innerHTML = " ";
  const listado = primerRepo.getAllActivities();
  const mapeo = listado.map((activity) => maquetaCard(activity));
    mapeo.forEach((card) => {contenedor.append(card)});
}

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
    description:descripcion,
    imgUrl:imagenUrl,
  }
  let search=  localStorage.setItem("dataForm", JSON.stringify(nuevaAct))

  if (search = null) {
    localStorage.setItem("dataForm", JSON.stringify(nuevaAct))
    mostrarActividades();
  }
  localStorage.setItem("dataForm", )
  primerRepo.createActivity(search)
  
  document.querySelector("#titulo").value = "";
  document.querySelector("#descripcion").value = "";
  document.querySelector("#imgUrl").value = "";
}

function maquetaCard(activity) {
  const h3 = document.createElement("h3");
  h3.className = "textos";
  h3.innerText = activity.title;

  const p = document.createElement("p");
  p.className = "textos";
  p.innerText = activity.description;

  const imagen = document.createElement("img");
  imagen.className = "imgRender";
  imagen.src = activity.imgUrl;
  imagen.alt = "imagen renderizada";  


  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Eliminar";
  deleteButton.addEventListener("click", () => {
    eliminarActividad(activity.id);
  });

  const div = document.createElement("div");
  div.className = "div";
  div.append(h3, p, imagen, deleteButton);

  return div;
}
function eliminarActividad(id) {
  const index = primerRepo.activities.findIndex(activity => activity.id === id);

  if (index !== -1) {
    primerRepo.activities.splice(index, 1);
    mostrarActividades();
  }
}


