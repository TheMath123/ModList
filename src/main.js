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

function salvarListaEmArquivo() {
  var inputLista = document.getElementById("input-lista");
  var lista = inputLista.value;

  var blob = new Blob([lista], { type: "text/plain" });
  var url = window.URL.createObjectURL(blob);
  var link = document.createElement("a");
  link.href = url;
  link.download = "lista_de_mods.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  alert("Lista salva em arquivo com sucesso!");
}

function exportarLista() {
  var inputLista = document.getElementById("input-lista");
  if (inputLista.value.trim() === "") {
    alert("A lista está vazia, não há nada para exportar.");
    return;
  }

  var lista = inputLista.value;
  var blob = new Blob([lista], { type: "text/plain;charset=utf-8" });

  var link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "mod-list.txt";
  link.textContent = "Clique aqui para baixar a lista de mods";

  var divLista = document.getElementById("lista");
  divLista.appendChild(link);
}
