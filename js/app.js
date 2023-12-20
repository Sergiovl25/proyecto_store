// variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listadoCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  // cuando agregas un curso presionando "agregar al carrito"
  listadoCursos.addEventListener("click", agregarCurso);

  // elimina cursos del carrito
  carrito.addEventListener("click", eliminarCurso);

  // vaciar carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = []; // reseteamos el arreglo

    limpiarHTML(); // eliminamos todo el html
  });
}

// Funicones
function agregarCurso(e) {
  e.preventDefault(); // para evitar que al presionar el boton de agregar al carrito la pagina regrese a la parte principal

  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}
// Elimina un curso del carrito
function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    //elimina del arreglo de articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);

    carritoHtml();
  }
}

// lee el contenido del html al que le dimos clic y extrae la informacion del curso
function leerDatosCurso(curso) {
  //console.log(curso);

  // crear un objeto con el contenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  // revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    // actualizamos la cantidad
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; // retorna el objeto actualizado
      } else {
        return curso; // retorna los objetos que no son los duplicados
      }
    });
    articulosCarrito = [...cursos];
  } else {
    // agregar elementos al arreglo de carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  console.log(articulosCarrito);

  carritoHtml();
}

// muetsra el carrito de compras en el html
function carritoHtml() {
  // limpoiar el html
  limpiarHTML();

  // recorre el carrito y crea el html
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>
                <img src="${curso.imagen} " width="100" >
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;

    // agrega el htmnl del carrito en el tbody
    contenedorCarrito.appendChild(row);
  });
}

// elimina los cursos del tbody

function limpiarHTML() {
  // forma lenta
  //contenedorCarrito.innerHTML = '';

  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
