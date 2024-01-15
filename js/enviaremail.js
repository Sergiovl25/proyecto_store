//Enviar correo

document.addEventListener("DOMContentLoaded", function () {
  const email = {
    email: "",
    numero: "",
    asunto: "",
    mensaje: "",
  };

  // seleccionar los elementos de la interfaz

  const inputEmail = document.querySelector("#email");
  const inputNumero = document.querySelector("#numero");
  const inputAsunto = document.querySelector("#asunto");
  const inputMensaje = document.querySelector("#mensaje");
  const formulario = document.querySelector("#formulario");
  const btnSubmit = document.querySelector("#formulario button[type='submit']");
  const btnReset = document.querySelector("#formulario button[type='reset']");
  const spinner = document.querySelector("#spinner");

  // Asignar evento

  inputEmail.addEventListener("input", validar);
  inputNumero.addEventListener("input", validar);
  inputAsunto.addEventListener("input", validar);
  inputMensaje.addEventListener("input", validar);

  formulario.addEventListener("submit", enviarEmail);

  btnReset.addEventListener("click", function (e) {
    e.preventDefault();
    resetFormulario();
  });

  // Validar

  function validar(e) {
    if (e.target.value.trim() === "") {
      mostrarAlerta(
        `El campo ${e.target.id} es obligatorio`,
        e.target.parentElement
      );
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }

    if (e.target.id === "email" && !validarEmail(e.target.value)) {
      mostrarAlerta("El email no es valido", e.target.parentElement);
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }

    limpiarAlerta(e.target.parentElement);

    // Asignar valores
    email[e.target.name] = e.target.value.trim().toLowerCase();
  }

  // Crear alerta
  function mostrarAlerta(mensaje, referencia) {
    //limpiar alerta
    limpiarAlerta(referencia);

    //generar alerta en html
    const error = document.createElement("p");
    error.textContent = mensaje;
    error.classList.add("bg-red-600", "text-white", "p2", "text-center");

    // inyectar al formulario
    referencia.appendChild(error);
  }

  // Limpiar alerta
  function limpiarAlerta(referencia) {
    // Comprueba si exixte una alerta
    const alerta = referencia.querySelector(".bg-red-600");
    if (alerta) {
      alerta.remove();
    }
  }

  // Enviar Email

  function enviarEmail(e) {
    e.preventDefault();

    spinner.classList.add("flex");
    spinner.classList.add("hidden");

    resetFormulario();
    setTimeout(() => {
      spinner.classList.remove("flex");
      spinner.classList.remove("hidden");

      //crear alerta
      const alertaExito = document.createElement("p");
      alertaExito.classList.add(
        "bg-green-500",
        "text-white",
        "p-2",
        "text-center",
        "rounded-lg",
        "mt-10",
        "font-bold",
        "text-sm",
        "uppercase"
      );
      alertaExito.textContent = "Mensaje enviado correctamente";
      formulario.appendChild(alertaExito);
      setTimeout(() => {
        alertaExito.remove();
      }, 3000);
    }, 3000);
  }

  function comprobarEmail() {
    if (Object.values(email).includes("")) {
      btnSubmit.classList.add("opacity-50");
      return;
    }
    btnSubmit.classList.remove("opacity-50");
  }

  function validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    return resultado;
  }

  function resetFormulario() {
    email.email = "";
    numero.numero = "";
    asunto.asunto = "";
    mensaje.mensaje = "";
    formulario.reset();
    comprobarEmail();
  }
});
