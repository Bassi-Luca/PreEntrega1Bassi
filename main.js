let NombreUsuario;
let Cliente;
let TipoUsuario;

// Funcion de Login
function Login() {
  TipoUsuario = prompt(
    "Hola! Bienvenido a [NombreAPP]! \n 1.- Cliente \n 2.- Nuevo cliente"
  );

  switch (TipoUsuario) {
    case "1":
      NombreUsuario = prompt(
        "Introduce tu correo de inscripción! \n (Correo correcto: luca@coder.com)"
      );
      for (let i = 3; i > 0; i--) {
        if (NombreUsuario === "luca@coder.com") {
          alert("¡Hola! " + NombreUsuario + "\n ¡Bienvenido a [NombreAPP]!");
          Menu();
          TipoServicio();
          return;
        } else {
          alert(
            "¡Correo incorrecto! \n ¡Tienes " +
              i +
              " intentos! \n (correo correcto: luca@coder.com)"
          );
          NombreUsuario = prompt(
            "Introduce tu correo: \n (RECUERDA: correo correcto: luca@coder.com)"
          );
        }
      }
      alert(
        "Lo sentimos, no has podido iniciar sesión. ¡Recuerda tu correo. Hasta luego!"
      );
      break;

    case "2":
      Cliente = prompt("Introduce tu nombre:");
      while (Cliente === "") {
        Cliente = prompt(
          "Formato de dato incompleto y/o incorrecto! intenta otra vez! \n\n (Si valor es vacio sigue infinito) \n Introduce tu correo:"
        );
      }
      alert(
        "¡Gracias " +
          Cliente +
          "! ¡Ahora puedes utilizar todos nuestros servicios!"
      );
      Menu();
      TipoServicio();
      break;

    default:
      alert("Opción no válida. Por favor, elige 1 o 2.");
      break;
  }
}

// Funcion de Menu
function Menu() {
  if (TipoUsuario === "1") {
    alert(NombreUsuario + "! \n Elige los servicios!");
  } else if (TipoUsuario === "2") {
    alert(
      Cliente +
        "! \n Somos felices que estés con nosotros en [NombreAPP]! \n En que te podemos auydar?"
    );
  }
}

// Funcion Servicios
function TipoServicio() {
  let tipoServicio = prompt(" 1.- Limpieza \n 2.- Hospedaje \n 3.- Paseo");
}

Login();
alert("FIN PRE ENTREGA 1");
