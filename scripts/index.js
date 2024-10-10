class Repository {
  constructor() {
    this.activities = [];
  }

  createActivity(activity) {
    activity.id = this.activities.length + 1;
    this.activities.push(activity);
  }

  getAllActivities() {
    return this.activities;
  }
}
  
const contenedor = document.getElementById("contenedor_actividad");

const boton = document.querySelector("#enviar");

const primerRepo = new Repository();

boton.addEventListener("click", handler);

function mostrarActividades() {
  contenedor.innerHTML = "";
  const listado = primerRepo.getAllActivities();
  const mapeo = listado.map((activity) => maquetaCard(activity));
  mapeo.forEach((card) => { contenedor.append(card); });
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
    description: descripcion,
    imgUrl: imagenUrl,
  };

  primerRepo.createActivity(nuevaAct);
  mostrarActividades();

  document.querySelector("#titulo").value = "";
  document.querySelector("#descripcion").value = "";
  document.querySelector("#imgUrl").value = "";
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
  deleteButton.className = "btn"
  deleteButton.addEventListener("click", () => {
    eliminarActividad(activity.id);
  });

  const div = document.createElement("div");
  div.className = "div";
  div.append(h3, imagen, p, deleteButton);
  return div;
}

function eliminarActividad(id) {
  const index = primerRepo.activities.findIndex(activity => activity.id === id);

  if (index !== -1) {
    primerRepo.activities.splice(index, 1);
    mostrarActividades();
  }
}
