// Variables globales
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
