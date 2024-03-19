/* // Variables globales

let nombreUsuario;
let cliente;
let tipoUsuario;
let servicio;
let usuarioEncontrado;

// Arrays
const serviciosElegidos = [];
const usuarios = [
  { id: 1, nombre: "Luca", correo: "luca@coder.com", pais: "Italia" },
  { id: 2, nombre: "Maria", correo: "maria@example.com", pais: "Mexico" },
  { id: 3, nombre: "Luca", correo: "luca@xxx.com", pais: "Argentina" },
];

// Función de login
function login() {
  tipoUsuario = prompt(
    "Hola! Bienvenido a [NombreAPP]! \n 1.- Cliente \n 2.- Nuevo cliente"
  );

  while (tipoUsuario === "" || (tipoUsuario !== "1" && tipoUsuario !== "2")) {
    alert("Opción no válida. Por favor, elige 1 o 2.");
    tipoUsuario = prompt(
      "Hola! Bienvenido a [NombreAPP]! \n 1.- Cliente \n 2.- Nuevo cliente"
    );
  }

  switch (tipoUsuario) {
    case "1":
      let nombreUsuarioCorrecto = false;
      for (let intentos = 3; intentos > 0 && !nombreUsuarioCorrecto; intentos--) {
        nombreUsuario = prompt("Introduce tu nombre:");
        const usuariosConNombre = usuarios.filter(
          (usuario) => usuario.nombre.toLowerCase() === nombreUsuario.toLowerCase()
        );

        if (usuariosConNombre.length === 0) {
          alert("No se encontró ningún usuario con ese nombre.");
        } else if (usuariosConNombre.length === 1) {
          usuarioEncontrado = usuariosConNombre[0];
          let pais = prompt("Introduce tu país de origen para el control:");
          if (pais.charAt(0) !== pais.charAt(0).toUpperCase()) {
            alert("El nombre del país debe comenzar con mayúscula. Por favor, inténtalo de nuevo.");
          } else if (usuarioEncontrado.pais !== pais) {
            alert("El país introducido no coincide con el registrado. Por favor, inténtalo de nuevo.");
          } else {
            nombreUsuarioCorrecto = true;
            usuarioEncontrado.pais = pais.charAt(0).toUpperCase() + pais.slice(1); // Actualizar el país con la primera letra mayúscula
            alert(
              "¡Hola! " +
                usuarioEncontrado.nombre +
                "\n ¡Bienvenido a [NombreAPP]!"
            );
            menu();
            tipoServicios();
          }
        } else {
          let paisCorrecto = false;
          while (!paisCorrecto) {
            let pais = prompt("Hay múltiples usuarios con ese nombre. Introduce tu país de origen para el control:");
            if (pais.charAt(0) !== pais.charAt(0).toUpperCase()) {
              alert("El nombre del país debe comenzar con mayúscula. Por favor, inténtalo de nuevo.");
            } else {
              const usuariosConNombreYPais = usuariosConNombre.filter(
                (usuario) => usuario.pais === pais
              );
              if (usuariosConNombreYPais.length === 1) {
                usuarioEncontrado = usuariosConNombreYPais[0];
                paisCorrecto = true;
              } else {
                alert("No se encontró ningún usuario con ese nombre y país. Por favor, inténtalo de nuevo.");
              }
            }
          }
          nombreUsuarioCorrecto = true;
          alert(
            "¡Hola! " +
              usuarioEncontrado.nombre +
              "\n ¡Bienvenido a [NombreAPP]!"
          );
          menu();
          tipoServicios();
        }
      }
      if (!nombreUsuarioCorrecto) {
        alert("Has agotado todos tus intentos. Por favor, inténtalo de nuevo más tarde.");
      }
      break;

    case "2":
      cliente = prompt("Introduce tu nombre:");
      while (cliente === "") {
        cliente = prompt(
          "Formato de dato incompleto y/o incorrecto! Intenta otra vez! \n\n (Si el valor es vacío, sigue infinito) \n Introduce tu correo:"
        );
      }
      alert(
        "¡Gracias " +
          cliente +
          "! ¡Ahora puedes utilizar todos nuestros servicios!"
      );
      menu();
      tipoServicios();
      break;

    default:
      alert("Opción no válida. Por favor, elige 1 o 2.");
      login(); // Llamar a la función de login en caso de elección no válida
      break;
  }
}

// Función del menú
function menu() {
  if (tipoUsuario === "1") {
    alert("Hola " + usuarioEncontrado.nombre + "! \n Elige los servicios!");
  } else if (tipoUsuario === "2") {
    alert(
      cliente +
        "! \n ¡Somos felices de que estés con nosotros en [NombreAPP]! \n ¿En qué podemos ayudarte?"
    );
  }
}

// Función para seleccionar tipos de servicios
function tipoServicios() {
  let total = 0; // Inicializar el total
  const serviciosSeleccionados = []; // Array para almacenar los servicios seleccionados

  do {
    servicio = prompt(
      " 1.- Estética \n 2.- Hospedaje \n 3.- Paseo \n 4.- Guardería del día \n 5.- Visita en casa \n 6.- Buscar veterinario"
    );
    while (
      servicio === "" ||
      (servicio !== "1" &&
        servicio !== "2" &&
        servicio !== "3" &&
        servicio !== "4" &&
        servicio !== "5" &&
        servicio !== "6")
    ) {
      alert("Elige uno de nuestros servicios!");
      servicio = prompt(
        " 1.- Estética \n 2.- Hospedaje \n 3.- Paseo \n 4.- Guardería del día \n 5.- Visita en casa \n 6.-Buscar veterinario"
      );
    }

    switch (servicio) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":  
        // Preguntar por la talla de la mascota
        const tallaMascota = prompt("¿Qué talla es tu mascota? (Pequeño/Mediano/Grande/Gigante)").toLowerCase();
        // Verificar si la talla ingresada es válida
        if (["pequeño", "mediano", "grande", "gigante"].includes(tallaMascota)) {
          // Obtener el servicio correspondiente
          const servicioElegido = obtenerServicioPorNumero(parseInt(servicio));
          // Agregar el servicio con la talla de la mascota seleccionada
          serviciosSeleccionados.push({ ...servicioElegido, talla: tallaMascota });
        } else {
          alert("Talla de mascota no válida. Por favor, inténtalo de nuevo.");
          continue; // Reiniciar el bucle para volver a solicitar el servicio
        }
        break;
      case "6":
        serviciosSeleccionados.push(servicios6);
        break;
    }

    // Mostrar resumen de los servicios seleccionados
    mostrarResumen(serviciosSeleccionados);

    // Calcular el total de los precios de los servicios seleccionados
    total = serviciosSeleccionados.reduce((acc, servicio) => acc + servicio.precio, 0);

    // Preguntar si desea agregar más servicios
    const agregarMasServicios = prompt("¿Desea agregar más servicios? (Sí/No)").toLowerCase();
    if (agregarMasServicios !== "si") {
      break; // Salir del bucle si la respuesta no es "sí"
    }
  } while (true); // Repetir mientras el usuario desee agregar más servicios

  // Mostrar el total al final
  alert(`Tu total de servicios es: ${total} €`);
}

// Función para mostrar el resumen de los servicios seleccionados
function mostrarResumen(serviciosSeleccionados) {
  let resumen = "Has seleccionado los siguientes servicios:\n\n";
  // Agregar los servicios seleccionados al resumen
  serviciosSeleccionados.forEach((servicio) => {
    resumen += `- ${servicio.nombre}: ${servicio.precio} €\n`;
    if (servicio.talla) {
      resumen += `  - Talla de la mascota: ${servicio.talla}\n`;
    }
  });
  // Mostrar el resumen en un prompt
  alert(resumen);
}

// Función para obtener un servicio según su número
function obtenerServicioPorNumero(numero) {
  switch (numero) {
    case 1:
      return servicios1;
    case 2:
      return servicios2;
    case 3:
      return servicios3;
    case 4:
      return servicios4;
    case 5:
      return servicios5;
    default:
      return null;
  }
}

// Clase Servicios
class Servicios {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = parseFloat(precio);
  }
}
const servicios1 = new Servicios("Estética", 60);
const servicios2 = new Servicios("Hospedaje", 30);
const servicios3 = new Servicios("Paseo", 10);
const servicios4 = new Servicios("Guardería del día", 10);
const servicios5 = new Servicios("Visita en casa", 10);
const servicios6 = new Servicios("Veterinaria", 25);

// Iniciar el proceso de login
login();
alert("FIN PRE ENTREGA 2"); // Mensaje final
 */

//NUOVO
// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

document.addEventListener("DOMContentLoaded", function () {
  // Obtener las referencias a los elementos del DOM
  const formCliente = document.getElementById("formCliente");
  const validationCorreoCliente = document.getElementById("validationCorreoCliente");
  const validationPwdCliente = document.getElementById("validationPwdCliente");
  const validationLogin = document.getElementById("validationLogin");
  const emailInput = document.getElementById("validCorreoCliente");
  const passwordInput = document.getElementById("ValidPwdCliente");
  const dropdownMenu = document.querySelector(".dropdown-menu");
  const submitButton = document.getElementById("btnLoginCliente");

// Array di clientes registrados con un utente di prova
const clientesPrueba = [{ email: "usuario@example.com", password: "pass123" }];

// Verificar si existen clientes registrados en el almacenamiento local
const clientesGuardados = JSON.parse(localStorage.getItem("clientesRegistrados"));

// Se no hay clientes en el almacenamiento local, usar el array predeterminado
const clientesRegistrados = clientesGuardados || clientesPrueba;

//Nuemro intentos restantes del Login
let intentosRestantes = 3;

  // Agregar un event listener para la entrada del correo electrónico
  emailInput.addEventListener("input", function () {
    const emailCliente = emailInput.value;
    // Verificar si el correo electrónico está registrado
    const clienteRegistrado = clientesRegistrados.find(cliente => cliente.email === emailCliente);
    if (!clienteRegistrado) {
      validationCorreoCliente.textContent = "Correo electrónico no registrado.";
      validationCorreoCliente.classList.remove("is-valid");
      validationCorreoCliente.classList.add("invalid-feedback");
    } else {
      validationCorreoCliente.textContent = "";
      validationCorreoCliente.classList.remove("invalid-feedback");
      validationCorreoCliente.classList.add("is-valid");
    }
  });

  // Agregar un event listener para la entrada de la contraseña
  passwordInput.addEventListener("input", function () {
    const passwordCliente = passwordInput.value;
    // Verificar si la contraseña coincide con el correo electrónico registrado
    const emailCliente = emailInput.value;
    const clienteRegistrado = clientesRegistrados.find(cliente => cliente.email === emailCliente && cliente.password === passwordCliente);
    if (!clienteRegistrado) {
      validationPwdCliente.textContent = "Contraseña incorrecta.";
      validationPwdCliente.classList.remove("is-valid");
      validationPwdCliente.classList.add("invalid-feedback");
    } 
    if (passwordCliente.length > 8) {
      validationPwdCliente.textContent = "La contraseña debe tener maximo 7 caracteres.";
      validationPwdCliente.classList.remove("is-valid");
      validationPwdCliente.classList.add("invalid-feedback");
    }
    else {
      validationPwdCliente.textContent = "";
      validationPwdCliente.classList.remove("invalid-feedback");
      validationPwdCliente.classList.add("is-valid");
    }
  });

  // Agregar un event listener para hacer clic en el menú desplegable
  dropdownMenu.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  // Agregar un event listener para enviar el formulario
  formCliente.addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado de envío del formulario

    const emailCliente = emailInput.value;
    const passwordCliente = passwordInput.value;

    // Verificar si las credenciales son correctas
    const clienteRegistrado = clientesRegistrados.find(cliente => cliente.email === emailCliente && cliente.password === passwordCliente);

    if (clienteRegistrado) {
      // Iniciar sesión exitosamente
      login(emailCliente);
    } else {
      // Decrementar los intentos restantes
      intentosRestantes--;

      // Actualizar el mensaje de intentos restantes
      if (intentosRestantes > 0) {
        validationLogin.textContent = `Intentos restantes: ${intentosRestantes}`;
      } else {
        validationLogin.textContent = "Intentos agotados. Vuelve a intentarlo más tarde.";
        submitButton.disabled = true; // Deshabilitar el botón después de agotar los intentos
        setTimeout(() => {
          window.location.reload(); // Recargar la página después de un breve retraso
        }, 2000); // Tiempo en milisegundos (en este caso 2 segundos) antes de recargar la página
      }
    }

    console.log("Intentos restantes:", intentosRestantes);
  });

  function login(emailCliente) {
    console.log("Inicio de sesión exitoso!");
    // Salvare l'email del cliente nel localStorage per poterlo recuperare nella pagina "servicios"
    localStorage.setItem("clienteRegistrato", JSON.stringify({ email: emailCliente }));
    // Cambiar el texto del mensaje de validación de la contraseña
    validationPwdCliente.textContent = "Inicio de sesión exitoso!";
    // Quitar la clase 'invalid-feedback' y agregar la clase 'valid-feedback'
    validationPwdCliente.classList.remove("invalid-feedback");
    validationPwdCliente.classList.add("valid-feedback");
    // Redirigir a la página de servicios después del inicio de sesión exitoso
    window.location.href = "servicios.html";
}


  // Agregar un event listener para enviar el formulario de nuevo cliente
  document.getElementById("formNuevoCliente").addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado de envío del formulario

    // Obtener los datos del formulario
    const nombreNuevoCliente = document.getElementById("nombreNuevoCliente").value;
    const emailNuevoCliente = document.getElementById("validPwdNuevoCliente").value;
    const paisNuevoCliente = document.getElementById("validPais").value;
    const acuerdoNuevoCliente = document.getElementById("invalidCheck3").checked;

    // Agregar el nuevo cliente al array de clientes registrados
    clientesRegistrados.push({ nombre: nombreNuevoCliente, email: emailNuevoCliente, pais: paisNuevoCliente, acuerdo: acuerdoNuevoCliente });

    // Guardar el array de clientes registrados actualizado en el almacenamiento local
    localStorage.setItem("clientesRegistrados", JSON.stringify(clientesRegistrados));

    // Mostrar un mensaje de éxito
    alert("Nuevo cliente registrado con éxito!");

    // Limpiar el formulario
    this.reset();
  });
});


