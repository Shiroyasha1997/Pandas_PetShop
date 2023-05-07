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

//MANTENEDOR DE PRODUCTOS//
$(document).ready(function() {
  // Detectar el evento submit del formulario
  $("#prod-form").submit(function(event) {
    // Validar el campo ID
    if ($("#ID").val() === "") {
      $("#ID").addClass("is-invalid");
      event.preventDefault();
    } else {
      $("#ID").removeClass("is-invalid");
    }

    // Validar el campo Nombre
    if ($("#Nombre").val() === "") {
      $("#Nombre").addClass("is-invalid");
      event.preventDefault();
    } else {
      $("#Nombre").removeClass("is-invalid");
    }

    // Validar el campo Descripción
    if ($("#Descripcion").val() === "") {
      $("#Descripcion").addClass("is-invalid");
      event.preventDefault();
    } else {
      $("#Descripcion").removeClass("is-invalid");
    }

    // Validar el campo Precio
    if ($("#Precio").val() === "") {
      $("#Precio").addClass("is-invalid");
      event.preventDefault();
    } else {
      $("#Precio").removeClass("is-invalid");
    }

    // Validar el campo Descuento Suscriptor
    if ($("#Descuento Suscriptor").val() === "") {
      $("#Descuento Suscriptor").addClass("is-invalid");
      event.preventDefault();
    } else {
      $("#Descuento Suscriptor").removeClass("is-invalid");
    }

    // Validar el campo Descuento Oferta
    if ($("#Descuento Oferta").val() === "") {
      $("#Descuento Oferta").addClass("is-invalid");
      event.preventDefault();
    } else {
      $("#Descuento Oferta").removeClass("is-invalid");
    }
  });
});

//LOGIN//
$(document).ready(function() {
  $('#login-form').submit(function(event) {

    // Evita el envío del formulario
    event.preventDefault();

    // Obtener los valores de los campos de entrada
    var email = $('#email').val().trim();
    var password = $('#password').val().trim();

    // Validar los campos de entrada
    if (email.length == 0 || password.length == 0) {
      alert('Por favor, complete todos los campos');
      return;
    }

    // Validar el formato del correo electrónico
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, introduzca una dirección de correo electrónico válida');
      return;
    }

    // Validar la longitud de la contraseña
    if (password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    // Deshabilitar el botón de inicio de sesión para evitar envíos duplicados
    $('#btnInciarSesion').prop('disabled', true);

    // Enviar formulario si los campos son válidos
    $(this).unbind('submit').submit();

    // Redirigir a la página de inicio de sesión si los campos son válidos
    window.location.href = "index.html";

  });

  // Resaltar el campo de entrada actual al hacer clic en él
  $('input').focus(function() {
    $(this).addClass('border-primary');
  }).blur(function() {
    $(this).removeClass('border-primary');
  });
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

//BODEGA//
$(document).ready(function() {
  // Agregar evento de submit al formulario
  $('#bodega-form').submit(function(event) {
    // Detener el envío del formulario para poder realizar la validación
    event.preventDefault();
    
    // Obtener los valores de los campos del formulario
    var categoria = $('#Categoria').val();
    var producto = $('#Producto').val();
    var cantidad = $('#Cantidad').val();

    // Validar que la cantidad sea mayor que cero
    if (cantidad <= 0) {
      alert('La cantidad debe ser mayor que cero');
      return;
    }

    // Si todo está bien, enviar el formulario
    this.submit();
  });
});

//VALIDACION DE REGISTRO//
$(document).ready(function () {
  // Agregar método de validación para RUT chileno
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

  $("#register-form").validate({
    rules: {
      ID: {
        required: true,
        ID: true,
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
        direccion: true,
      },
      password: {
        required: true,
        minlength: 5,
      },
      password2: {
        required: true,
        equalTo: "#password",
      },
    }, // --> Fin de reglas
    messages: {
      ID: {
        required: "El ID es un campo obligatorio",
        ID: "El formato del ID no es válido",
      },
      rut: {
        required: "El rut es un campo obligatorio",
        rutChileno: "El formato del rut no es válido",
      },
      email: {
        required: "El email es un campo requerido",
        email: "El email no cumple el formato de un correo",
      },
      direccion: {
        required: "La direccion es un campo requerido",
        direccion: "La direccion no cumple el formato correcto",
      },
      password: {
        required: "La contraseña es una campo obligatorio",
        minlength: "Mínimo 5 caracteres",
      },
      password2: {
        required: "Repita la contraseña anterior",
        equalTo: "Debe ser igual al campo contraseña",
      },
    },
  });
});