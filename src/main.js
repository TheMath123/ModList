function gerarLista() {
  var inputLista = document.getElementById("input-lista");
  var lista = inputLista.value.split(";");
  var steamModUrl = "https://steamcommunity.com/sharedfiles/filedetails/?id=";

  var listaHtml =
    "<button onclick='removerSelecionados()'>Remover selecionados</button><br><br>";
  listaHtml += "<ul>";
  for (var i = 0; i < lista.length; i++) {
    var modId = lista[i];
    listaHtml +=
      "<li><input type='checkbox' name='mod' value='" +
      modId +
      "'> Item " +
      i +
      ": <a href=" +
      steamModUrl +
      modId +
      "' target='_blank'>" +
      modId +
      "</a></li>";
  }
  listaHtml += "</ul>";

  var listaDiv = document.getElementById("lista");
  listaDiv.innerHTML = listaHtml;
}

function removerSelecionados() {
  var checkboxes = document.getElementsByName("mod");
  var selecionados = [];
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      selecionados.push(checkboxes[i].value);
    }
  }

  var inputLista = document.getElementById("input-lista");
  var lista = inputLista.value.split(";");
  for (var i = 0; i < selecionados.length; i++) {
    var index = lista.indexOf(selecionados[i]);
    if (index > -1) {
      lista.splice(index, 1);
    }
  }

  inputLista.value = lista.join(";");
  gerarLista();
}

function carregarArquivoPredefinido() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "./assets/list.txt");
  xhr.onload = function () {
    if (xhr.status === 200) {
      document.getElementById("input-lista").value = xhr.responseText;
      gerarLista();
    }
  };
  xhr.send();
}
