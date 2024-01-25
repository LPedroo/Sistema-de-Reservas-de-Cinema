const POLTRONAS = 144;

var reservadas = [];

function montarPalco() {
  var ocupadas = [];

  if (localStorage.getItem("teatroOcupadas")) {
    ocupadas = localStorage.getItem("teatroOcupadas").split(";");
  }

  var divPalco = document.getElementById("divPalco");

  for (var i = 1; i <= POLTRONAS; i++) {
    var figure = document.createElement("figure"); //cria essa tag lá no HTML
    var imgStatus = document.createElement("img"); //cria essa tag lá no HTML

    if (ocupadas.indexOf(i.toString()) >= 0) {
      imgStatus.src = "img/ocupado.jpg";
    } else {
      imgStatus.src = "img/livre.jpg";
    }
    imgStatus.className = "poltrona"; //classe da imagem

    var figureCap = document.createElement("figcaption"); //cria essa tag lá no HTML

    var zeros = "";

    if (i < 10) {
      //condição pra exibir zeros na poltrona
      zeros = "00";
    } else if (i < 100) {
      zeros = "0";
    }
    var num = document.createTextNode(`[${zeros} ${i}]`); //Cria texto

    figureCap.appendChild(num);
    figure.appendChild(imgStatus);
    figure.appendChild(figureCap);

    if (i % 24 == 12) {
      //Se módulo 24, resta 12 (é o corredor)
      figure.style.marginRight = "60px";
    }
    divPalco.appendChild(figure); //figure é filho de DivPalco

    if (i % 24 == 0) {
      var br = document.createElement("br");
      divPalco.appendChild(br);
    }
  }
}

montarPalco();

function reservarPoltrona() {
  var poltrona = Number(inPoltrona.value);

  if (poltrona <= 0 || isNaN(poltrona) || poltrona > POLTRONAS) {
    alert("Informe um número de poltrona válido");
    inPoltrona.focus();
    return;
  }

  var ocupadas = [];

  if (localStorage.getItem("teatroOcupadas")) {
    ocupadas = localStorage.getItem("teatroOcupadas").split(";");
  }

  if (ocupadas.indexOf(poltrona.toString()) >= 0) {
    alert(`Poltrona ${poltrona} já está ocupada...`);
    inPoltrona.value = "";
    inPoltrona.focus();
    return;
  }

  var divPalco = document.getElementById("divPalco");

  // captura imagem da poltrona, filha de divPalco. É -1 pois começa em 0
  var imgPoltrona = divPalco.getElementsByTagName("img")[poltrona - 1];

  imgPoltrona.src = "img/reservado.jpg"; //modifica atributo da imagem

  reservadas.push(poltrona); //Adiciona ao array

  inPoltrona.value = ""; // limpa campo
  inPoltrona.focus(); // jogo o foco em inPoltrona
}

var btReservar = document.getElementById("btReservar");
btReservar.addEventListener("click", reservarPoltrona);

var inPoltrona = document.getElementById("inPoltrona");
inPoltrona.addEventListener("keypress", (tecla) => {
  if (tecla.keyCode == 13) {
    reservarPoltrona();
  }
});

function confirmarReserva() {
  if (reservadas.length == 0) {
    alert("Não há poltronas reservadas");
    inPoltrona.focus();
    return;
  }
  var divPalco = document.getElementById("divPalco");

  var ocupadas = "";

  if (localStorage.getItem("teatroOcupadas")) {
    ocupadas = `${localStorage.getItem("teatroOcupadas")}; `;
  }

  for (var i = 0; i < reservadas.length; i++) {
    ocupadas += `${reservadas[i]} ;`;

    //captura imagem da poltrona, filha de DivPalco. É -1 pq inicia em 0
    var imgPoltrona = divPalco.getElementsByTagName("img")[reservadas[i] - 1];
    imgPoltrona.src = "img/ocupado.jpg"; // modifica atributo da imagem;
  }

  if ((imgPoltrona.src = "img/ocupado.jpg")) {
    alert("Poltrona reservada com sucesso! Tenham um bom filme :)");
  }
  reservadas = []; //Limpa array (pois as reservas já foram salvas no localStorage)

  //length - 1 é para retirar o último ";"
  localStorage.setItem(
    "teatroOcupadas",
    ocupadas.substr(0, ocupadas.length - 1)
  );
}

var btConfirmar = document.getElementById("btConfirmar");
btConfirmar.addEventListener("click", confirmarReserva);

var poltronas = document.querySelectorAll(".poltrona");

poltronas.forEach(function (poltrona) {
  poltrona.addEventListener("click", function () {
    reservarPoltrona();
  });

  poltrona.addEventListener("touchstart", function (event) {
    event.preventDefault();
    reservarPoltrona();
  });
});
