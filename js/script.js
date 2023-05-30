//API ROPA//
$(document).ready(function () {
  $.get("http://fakestoreapi.com/products", function (data) {
    var i = 0;
    var table = $("#tblCategorias");
    var row = $("<tr></tr>");
    $.each(data, function (index, item) {
      var td1 = `<td><img class="ropa" src="${item.image}"></td>`;
      var td2 = `<td><div>$${item.price}</div><div>${item.title}</div></td>`;
      var col = `<td>${td1}${td2}</td>`;
      row.append(col);
      i++;
      if (i % 3 == 0) {
        table.append(row);
        row = $("<tr></tr>");
      }
    });
    if (i % 3 != 0) {
      table.append(row);
    }
  });
});

//MENU TIPO NAVBAR//
$(document).ready(function () {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("menu-superior").outerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "menu.html", true);
  xhttp.send();
});

//FOOTER//
$(document).ready(function () {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("footer").outerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "footer.html", true);
  xhttp.send();
});

//MANTENEDOR DE PRODUCTOS//
$(document).ready(function () {
  $("#prod-form").validate({
    rules: {
      ID: {
        required: true,
      },
      nombre: {
        required: true,
      },
      descripcion: {
        required: true,
      },
      precio: {
        required: true,
      },
      descuento_suscriptor: {
        required: false,
      },
      descuento_oferta: {
        required: false,
      },
    },
    messages: {
      ID: {
        required: "Por favor ingrese un ID",
      },
      nombre: {
        required: "Por favor ingrese el nombre del producto",
      },
      descripcion: {
        required: "Por favor ingrese la descripción del producto",
      },
      precio: {
        required: "Por favor ingrese el precio del producto",
      },
      descuento_suscriptor: {
        required: "Por favor ingrese el precio del producto",
      },
      descuento_oferta: {
        required: "Por favor ingrese el precio del producto",
      },
    },
    errorElement: "div",
    errorPlacement: function (error, element) {
      error.addClass("invalid-feedback");
      element.closest(".form-group").append(error);
    },
    highlight: function (element, errorClass, validClass) {
      $(element)
        .addClass(errorClass)
        .removeClass(validClass)
        .closest(".form-group")
        .addClass("has-error");
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element)
        .removeClass(errorClass)
        .addClass(validClass)
        .closest(".form-group")
        .removeClass("has-error");
    },
  });

  //Botón Guardar
  $("#id_btnGuardar").on("click", function () {
    if ($("#prod-form").valid()) {
      // El formulario es válido, se puede enviar
      $("#prod-form").submit();
    }
  });

  //Boton Nuevo
  $("#id_btnNuevo").click(function() {
    $("#prod-form").reset();
  });

  //Boton Eliminar
  $("#id_btnEliminar").click(function() {
    $("#prod-form").reset();
  });

});

//BODEGA//
$(document).ready(function () {
  $("#bodega-form").validate({
    rules: {
      cantidad: {
        required: true,
      },
    },
    messages: {
      cantidad: {
        required: "Por favor ingrese una cantidad",
      },
    },
    errorElement: "div",
    errorPlacement: function (error, element) {
      error.addClass("invalid-feedback");
      element.closest(".form-group").append(error);
    },
    highlight: function (element, errorClass, validClass) {
      $(element)
        .addClass(errorClass)
        .removeClass(validClass)
        .closest(".form-group")
        .addClass("has-error");
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element)
        .removeClass(errorClass)
        .addClass(validClass)
        .closest(".form-group")
        .removeClass("has-error");
    },
  });

  //Botón Agregar
  $("#id_btnAgregar").on("click", function () {
    if ($("#bodega-form").valid()) {
      // El formulario es válido, se puede enviar
      $("#bodega-form").submit();
    }
  });

  //Boton Nuevo
  $("#id_btnNuevo").click(function() {
    $("#bodega-form").reset();
  });
});

//METODO DE RUT CHILENO//
$.validator.addMethod(
  "rutChileno",
  function (value, element) {
    // Eliminar puntos y guión del RUT
    value = value.replace(/[.-]/g, "");
    // Validar que el RUT tenga 8 o 9 dígitos
    if (value.length < 8 || value.length > 9) {
      return false;
    }

    // Validar que el último dígito sea un número o una 'K'
    var validChars = "0123456789K";
    var lastChar = value.charAt(value.length - 1).toUpperCase();
    if (validChars.indexOf(lastChar) == -1) {
      return false;
    }

    // Calcular el dígito verificador
    var rut = parseInt(value.slice(0, -1), 10);
    var factor = 2;
    var sum = 0;
    var digit;
    while (rut > 0) {
      digit = rut % 10;
      sum += digit * factor;
      rut = Math.floor(rut / 10);
      factor = factor === 7 ? 2 : factor + 1;
    }
    var dv = 11 - (sum % 11);
    dv = dv === 11 ? "0" : dv === 10 ? "K" : dv.toString();

    // Validar que el dígito verificador sea correcto
    return dv === lastChar;
  },
  "Por favor ingrese un RUT válido."
);

//REGISTRO//
$(document).ready(function () {
  $("#sign-up-form").validate({
    rules: {
      rut: {
        required: true,
        rutChileno: true,
      },
      nombre: {
        required: true,
      },
      apellido: {
        required: true,
      },
      email: {
        required: true,
        email: true,
      },
      direccion: {
        required: true,
      },
      password: {
        required: true,
        minlength: 5,
      },
      password2: {
        required: true,
        equalTo: "#password",
      },
    },
    messages: {
      rut: {
        required: "Por favor ingrese su RUT",
        rutChileno: "Por favor ingrese un RUT válido",
      },
      nombre: {
        required: "Por favor ingrese su nombre",
      },
      apellido: {
        required: "Por favor ingrese su apellido",
      },
      email: {
        required: "Por favor ingrese su correo electrónico",
        email: "Por favor ingrese un correo electrónico válido",
      },
      direccion: {
        required: "Por favor ingrese su dirección",
      },
      password: {
        required: "Por favor ingrese su contraseña",
        minlength: "La contraseña debe tener al menos 5 caracteres",
      },
      password2: {
        required: "Por favor repita su contraseña",
        equalTo: "Las contraseñas no coinciden",
      },
    },
    errorElement: "div",
    errorPlacement: function (error, element) {
      error.addClass("invalid-feedback");
      element.closest(".form-group").append(error);
    },
    highlight: function (element, errorClass, validClass) {
      $(element)
        .addClass(errorClass)
        .removeClass(validClass)
        .closest(".form-group")
        .addClass("has-error");
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element)
        .removeClass(errorClass)
        .addClass(validClass)
        .closest(".form-group")
        .removeClass("has-error");
    },
  });

  // Validación de checkbox opcional
  $("#subscribe-check").on("change", function () {
    $("#sign-up-form").validate().element("#subscribe-check");
  });

  //Botón Guardar
  $("#id_btnGuardar").on("click", function () {
    if ($("#sign-up-form").valid()) {
      // El formulario es válido, se puede enviar
      $("#sign-up-form").submit();
    }
  });

  //Boton Limpiar
  $("#id_btnLimpiar").click(function() {
    $("#sign-up-form").reset();
  });
});

//MIS DATOS//
$(document).ready(function () {
  $("#mydata-form").validate({
    rules: {
      rut: {
        required: true,
        rutChileno: true,
      },
      nombre: {
        required: true,
      },
      apellido: {
        required: true,
      },
      email: {
        required: true,
        email: true,
      },
      direccion: {
        required: true,
      },
      password: {
        required: true,
        minlength: 5,
      },
      password2: {
        required: true,
        equalTo: "#password",
      },
    },
    messages: {
      rut: {
        required: "Por favor ingrese su RUT",
        rutChileno: "Por favor ingrese un RUT válido",
      },
      nombre: {
        required: "Por favor ingrese su nombre",
      },
      apellido: {
        required: "Por favor ingrese su apellido",
      },
      email: {
        required: "Por favor ingrese su correo electrónico",
        email: "Por favor ingrese un correo electrónico válido",
      },
      direccion: {
        required: "Por favor ingrese su dirección",
      },
      password: {
        required: "Por favor ingrese su contraseña",
        minlength: "La contraseña debe tener al menos 5 caracteres",
      },
      password2: {
        required: "Por favor repita su contraseña",
        equalTo: "Las contraseñas no coinciden",
      },
    },
    errorElement: "div",
    errorPlacement: function (error, element) {
      error.addClass("invalid-feedback");
      element.closest(".form-group").append(error);
    },
    highlight: function (element, errorClass, validClass) {
      $(element)
        .addClass(errorClass)
        .removeClass(validClass)
        .closest(".form-group")
        .addClass("has-error");
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element)
        .removeClass(errorClass)
        .addClass(validClass)
        .closest(".form-group")
        .removeClass("has-error");
    },
  });

  // Validación de checkbox opcional
  $("#subscribe-check").on("change", function () {
    $("#mydata-form").validate().element("#subscribe-check");
  });

  //Botón Guardar
  $("#id_btnGuardar").on("click", function () {
    if ($("#mydata-form").valid()) {
      // El formulario es válido, se puede enviar
      $("#mydata-form").submit();
    }
  });

  //Boton Limpiar
  $("#id_btnLimpiar").click(function() {
    $("#mydata-form").reset();
  });
});

//MANTENEDOR DE USUARIOS//
$(document).ready(function () {
  $("#user-form").validate({
    rules: {

      ID: {
        required: true,
      },
      useropt: {
        required: true,
      },
      nombre: {
        required: true,
      },
      apellido: {
        required: true,
      },
      rut: {
        required: true,
        rutChileno: true,
      },
      email: {
        required: true,
        email: true,
      },
      direccion: {
        required: true,
      },
      password: {
        required: true,
        minlength: 5,
      },
      password2: {
        required: true,
        equalTo: "#password",
      },
    },
    messages: {

      ID: {
        required: "Por favor ingrese el ID",
      },
      useropt: {
        required: "Por favor seleccione una opción",
      },
      nombre: {
        required: "Por favor ingrese su nombre",
      },
      apellido: {
        required: "Por favor ingrese su apellido",
      },
      rut: {
        required: "Por favor ingrese su RUT",
        rutChileno: "Por favor ingrese un RUT válido",
      },
      email: {
        required: "Por favor ingrese su correo electrónico",
        email: "Por favor ingrese un correo electrónico válido",
      },
      direccion: {
        required: "Por favor ingrese su dirección",
      },
      password: {
        required: "Por favor ingrese su contraseña",
        minlength: "La contraseña debe tener al menos 5 caracteres",
      },
      password2: {
        required: "Por favor repita su contraseña",
        equalTo: "Las contraseñas no coinciden",
      },
    },
    errorElement: "div",
    errorPlacement: function (error, element) {
      error.addClass("invalid-feedback");
      element.closest(".form-group").append(error);
    },
    highlight: function (element, errorClass, validClass) {
      $(element)
        .addClass(errorClass)
        .removeClass(validClass)
        .closest(".form-group")
        .addClass("has-error");
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element)
        .removeClass(errorClass)
        .addClass(validClass)
        .closest(".form-group")
        .removeClass("has-error");
    },
  });

  // Validación de checkbox opcional
  $("#subscribe-check").on("change", function () {
    $("#user-form").validate().element("#subscribe-check");
  });

  //Botón Guardar
  $("#id_btnGuardar").on("click", function () {
    if ($("#user-form").valid()) {
      // El formulario es válido, se puede enviar
      $("#user-form").submit();
    }
  });

  //Boton Nuevo
  $("#id_btnNuevo").click(function() {
    $("#user-form").reset();
  });

  //Boton Eliminar
  $("#id_btnEliminar").click(function() {
    $("#user-form").reset();
  });
});

//LOGIN//
$(document).ready(function () {
  $("#login-form").validate({
    rules: {
      email: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        minlength: 5,
      },
    },
    messages: {
      email: {
        required: "Por favor ingrese su correo electrónico",
        email: "Por favor ingrese un correo electrónico válido",
      },
      password: {
        required: "Por favor ingrese su contraseña",
        minlength: "La contraseña debe tener al menos 5 caracteres",
      },
    },
    errorElement: "div",
    errorPlacement: function (error, element) {
      error.addClass("invalid-feedback");
      element.closest(".form-group").append(error);
    },
    highlight: function (element, errorClass, validClass) {
      $(element)
        .addClass(errorClass)
        .removeClass(validClass)
        .closest(".form-group")
        .addClass("has-error");
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element)
        .removeClass(errorClass)
        .addClass(validClass)
        .closest(".form-group")
        .removeClass("has-error");
    },
  });

  //Botón Iniciar Sesion
  $("#id_btnIniciarSesion").on("click", function () {
    if ($("#login-form").valid()) {
      // El formulario es válido, se puede enviar
      $("#login-form").submit();
    }
  });
});