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
  if (inputLista.value.trim() === "") {
    alert("A lista está vazia, não há nada para exportar.");
    return;
  }
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
  var lista = inputLista.value.split(";");
  var steamModUrl = "https://steamcommunity.com/sharedfiles/filedetails/?id=";

  var listaTxt = "";
  for (var i = 0; i < lista.length; i++) {
    var modId = lista[i];
    listaTxt += modId + "\n";
  }

  var blob = new Blob([listaTxt], { type: "text/plain;charset=utf-8" });
  var fileName = "lista.txt";
  var url = URL.createObjectURL(blob);

  var downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = fileName;
  downloadLink.innerHTML = "Download da lista";
  document.body.appendChild(downloadLink);

  if (lista.length > 0) {
    var copyLinkButton = document.createElement("button");
    copyLinkButton.onclick = copiarLink;
    copyLinkButton.innerHTML = "Copiar link";
    document.body.appendChild(copyLinkButton);
  }
}

function copiarLink() {
  var downloadLink = document.querySelector("a[download]");
  var url = downloadLink.href;

  navigator.clipboard.writeText(url).then(
    function () {
      alert("Link copiado para a área de transferência!");
    },
    function (err) {
      console.error("Erro ao copiar o link: ", err);
    },
  );
}
