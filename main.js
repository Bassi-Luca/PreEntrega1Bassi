let nombreUsuario;
let cliente;
let tipoUsuario;
let servicio;

// Funcion de Login
function login() {
  // Richiesta di input all'inizio del ciclo
  tipoUsuario = prompt(
    "Hola! Bienvenido a [NombreAPP]! \n 1.- Cliente \n 2.- Nuevo cliente"
  );

  // Il ciclo continua finché l'input non è valido
  while (tipoUsuario === "" || (tipoUsuario !== "1" && tipoUsuario !== "2")) {
    alert("Opción no válida. Por favor, elige 1 o 2.");
    
    // Richiesta di un nuovo input all'interno del ciclo
    tipoUsuario = prompt(
      "Hola! Bienvenido a [NombreAPP]! \n 1.- Cliente \n 2.- Nuevo cliente"
    );
  }

  // Dopo aver ottenuto un input valido, esegui il resto del codice
  switch (tipoUsuario) {
    case "1":
      nombreUsuario = prompt(
        "Introduce tu correo de inscripción! \n (Correo correcto: luca@coder.com)"
      );
      for (let i = 3; i > 0; i--) {
        if (nombreUsuario === "luca@coder.com") {
          alert("¡Hola! " + nombreUsuario + "\n ¡Bienvenido a [NombreAPP]!");
          menu();
          tipoServicios();
          return;
        } else {
          alert(
            "¡Correo incorrecto! \n ¡Tienes " +
              i +
              " intentos! \n (correo correcto: luca@coder.com)"
          );
          nombreUsuario = prompt(
            "Introduce tu correo: \n (RECUERDA: correo correcto: luca@coder.com)"
          );
        }
      }
      alert(
        "Lo sentimos, no has podido iniciar sesión. ¡Recuerda tu correo. Hasta luego!"
      );
      break;

    case "2":
      cliente = prompt("Introduce tu nombre:");
      while (cliente === "") {
        cliente = prompt(
          "Formato de dato incompleto y/o incorrecto! intenta otra vez! \n\n (Si valor es vacio sigue infinito) \n Introduce tu correo:"
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
  }
}

// Funcion de Menu
function menu() {
  if (tipoUsuario === "1") {
    alert(nombreUsuario + "! \n Elige los servicios!");
  } else if (tipoUsuario === "2") {
    alert(
      cliente +
        "! \n Somos felices que estés con nosotros en [NombreAPP]! \n En que te podemos auydar?"
    );
  }
}

// Funcion Servicios
function tipoServicios() {
  servicio = prompt(" 1.- Limpieza \n 2.- Hospedaje \n 3.- Paseo");
  while (
    servicio === "" ||
    (servicio !== "1" && servicio !== "2" && servicio !== "3")
  ) {
    alert("Elejir unos de nuestros servicios! \n \n");
    servicio = prompt(" 1.- Limpieza \n 2.- Hospedaje \n 3.- Paseo");
  }
}

login();
alert("FIN PRE ENTREGA 1");