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

//VALIDACION//
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

  $("#formulario1").validate({
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