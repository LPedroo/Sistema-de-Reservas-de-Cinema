const POLTRONAS = 150;
const POLTRONAS_POR_FILEIRA = 10;
const COLUNAS = 2;

var reservadas = [];

function montarPalco() {
  var divPalco = document.getElementById("divPalco");

  for (var i = 1; i <= POLTRONAS; i++) {
    var figure = document.createElement("figure");
    var svgStatus = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    svgStatus.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgStatus.setAttribute("height", "16");
    svgStatus.setAttribute("width", "20");
    svgStatus.setAttribute("viewBox", "0 0 640 512");
    svgStatus.setAttribute("onclick", "meuComportamento()");

    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      "M64 160C64 89.3 121.3 32 192 32H448c70.7 0 128 57.3 128 128v33.6c-36.5 7.4-64 39.7-64 78.4v48H128V272c0-38.7-27.5-71-64-78.4V160zM544 272c0-20.9 13.4-38.7 32-45.3c5-1.8 10.4-2.7 16-2.7c26.5 0 48 21.5 48 48V448c0 17.7-14.3 32-32 32H576c-17.7 0-32-14.3-32-32H96c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V272c0-26.5 21.5-48 48-48c5.6 0 11 1 16 2.7c18.6 6.6 32 24.4 32 45.3v48 32h32H512h32V320 272z"
    );
    path.setAttribute("fill", "#4DFF91");

    svgStatus.appendChild(path);
    svgStatus.className = "poltrona";

    var figureCap = document.createElement("figcaption");
    var zeros = "";

    if (i < 10) {
      zeros = "00";
    } else if (i < 100) {
      zeros = "0";
    }

    var num = document.createTextNode(`[${zeros} ${i}]`);

    figureCap.appendChild(num);
    figure.appendChild(svgStatus);
    figure.appendChild(figureCap);

    divPalco.appendChild(figure);

    // Adiciona quebra de linha para iniciar nova fileira
    if (i % (POLTRONAS_POR_FILEIRA * COLUNAS) == 0 && i < POLTRONAS) {
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
  var svgPoltrona = divPalco.getElementsByTagName("svg")[poltrona - 1];

  svgPoltrona.getElementsByTagName("path")[0].setAttribute("fill", "#293CA9"); // Modifica a cor do path

  reservadas.push(poltrona);

  inPoltrona.value = "";
  inPoltrona.focus();
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

    var svgPoltrona = divPalco.getElementsByTagName("svg")[reservadas[i] - 1];
    svgPoltrona.getElementsByTagName("path")[0].setAttribute("fill", "#F64348");
  }

  reservadas = [];

  localStorage.setItem(
    "teatroOcupadas",
    ocupadas.substr(0, ocupadas.length - 1)
  );
}

var btConfirmar = document.getElementById("btConfirmar");
btConfirmar.addEventListener("click", confirmarReserva);
