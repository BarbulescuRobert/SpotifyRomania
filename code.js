var codeBlock =
  '<div class="column" >' +
  '<h1 style="display:flex; justify-content:center;">Acest site este un proiect personal, folosind Spotify API.</h1>' +
  '<p style="text-align:center;">Mai jos sunt toti artistii romani pe care i-am introdus manual din Spotify. In caz ca exista vreun artist care are cont de Spotify Artists si nu apare aici, puteti lasa un mail la: <strong>gigel@yahoo.com</strong></p>' +
  '<p id="ion"></p>' +
  "</div>";

// Inserting the code block to wrapper element
document.getElementById("uiu").innerHTML = codeBlock;

function arataTopArtists(name, img, followers, genres, nr) {
  var imagBlock =
    '<div class="center">' +
    '<div id = "gigi" style="display: flex; align-items:center; color:black"' +
    '<p><h1 style="padding:0 30px; color:black;">' +
    nr +
    '</h1><img src="' +
    img +
    '" style="margin-right:10px;"alt="Norway" width="100" height="100">' +
    name +
    "</p>" +
    "</div>" +
    '<div style="position: absolute; right: 100px; width: 300px; padding: 10px;">' +
    "<div>" +
    '<p style="color:black;">' +
    genres +
    "</p>" +
    '<p style="color:red;">' +
    followers +
    " followers</p>" +
    "</div>" +
    "</div>" +
    "</div>";
  var node = document.getElementById("ion");
  var newNode = document.createElement("p");
  newNode.appendChild(document.createTextNode("orice"));
  node.appendChild(newNode);
  newNode.innerHTML = imagBlock;
}

function arataTop10(name, img, audio, piesa, nr) {
  var imagBlock =
    '<div class="center" style="color: black;">' +
    '<div id = "gigi" style="display: flex; align-items:center;"' +
    '<p><h1 style="padding:0 30px; color:black;">' +
    nr +
    '</h1><img src="' +
    img +
    '" style="margin-right:10px;"alt="Norway" width="100" height="100">' +
    name +
    "</p>" +
    "</div>" +
    '<div style="display: flex; align-items:center;">' +
    "<div>" +
    '<p style="text-align:center; color:red;">' +
    piesa +
    "</p>" +
    "<audio controls>" +
    '<source src="' +
    audio +
    '" type="audio/mpeg">' +
    "Your browser does not support the audio element." +
    "</audio>" +
    "</div>" +
    "</div>" +
    "</div>";
  var node = document.getElementById("aici");
  var newNode = document.createElement("p");
  newNode.appendChild(document.createTextNode("orice"));
  node.appendChild(newNode);
  newNode.innerHTML = imagBlock;
}

function arataSearch(name, img, followers, genres) {
  var imagBlock =
  '<div class="center" style="padding:0 30vh;">' +
  '<div id = "gigi" style="display: flex; align-items:center; color:black"' +
  '<p><img src="' +
  img +
  '" style="margin-right:10px;"alt="Norway" width="100" height="100">' +
  name +
  "</p>" +
  "</div>" +
  '<div style="position: absolute; right: 100px; width: 300px; padding: 10px;">' +
  "<div>" +
  '<p style="color:black;">' +
  genres +
  "</p>" +
  '<p style="color:red;">' +
  followers +
  " followers</p>" +
  "</div>" +
  "</div>" +
  "</div>";
  var node = document.getElementById("ele");
  var newNode = document.createElement("p");
  newNode.appendChild(document.createTextNode("orice"));
  node.appendChild(newNode);
  newNode.innerHTML = imagBlock;
}

function arataSearchAlbum(name, img, albumName, link, nrPiese) {
    var imagBlock =
      '<div class="center" style="padding:0 30vh;">' +
      '<div id = "gigi" style="display: flex; align-items:center; color:black"' +
      '<p"><img src="' +
      img +
      '" style="margin-right:10px;"alt="Norway" width="100" height="100">' +
      name +
      "</p>" +
      "</div>" +
      '<div style="position: absolute; right: 30vh; width: 300px; padding: 10px;">' +
      "<div>" +
      '<p style="color:red; font-size:18px;">' +
      albumName + ": " + nrPiese + " piese" +
      "</p>" +
      '<button class="btn btn-outline-success" id="' + link + '"onclick="getTracksFromAlbum(this.id)" style="color:black;">Click for tracks' +
      "</button>" +
      "</div>" +
      "</div>" +
      "</div>";
    var node = document.getElementById("ele");
    var newNode = document.createElement("p");
    newNode.appendChild(document.createTextNode("orice"));
    node.appendChild(newNode);
    newNode.innerHTML = imagBlock;
  }

function cautaPiesa(name, audio, piesa, img) {
    var imagBlock =
      '<div class="center" style="color: black; padding:0 30vh;">' +
      '<div id = "gigi" style="display: flex; align-items:center;"' +
      '<p><img src="' +
      img +
      '" style="margin-right:10px;"alt="Norway" width="100" height="100">' +
      name +
      "</p>" +
      "</div>" +
      '<div style="display: flex; align-items:center;">' +
      "<div>" +
      '<p style="text-align:center; color:red;">' +
      piesa +
      "</p>" +
      "<audio controls>" +
      '<source src="' +
      audio +
      '" type="audio/mpeg">' +
      "Your browser does not support the audio element." +
      "</audio>" +
      "</div>" +
      "</div>" +
      "</div>";
    var node = document.getElementById("ele");
    var newNode = document.createElement("p");
    newNode.appendChild(document.createTextNode("orice"));
    node.appendChild(newNode);
    newNode.innerHTML = imagBlock;
  }

  function AlbumTitle(name, albumName, img) {
    var imagBlock =
      '<div class="center" style="color: black; padding:0 50vh">' +
      '<button class="btn btn-outline-success" id="back" onclick="back()" style="color:black; margin:40px 20px">&laquo; Inapoi' +
      "</button>" +
      '<div id = "gigi" style="display: flex; align-items:center;"' +
      '<p><img src="' +
      img +
      '" style="margin:0 20px;"alt="Norway" width="100" height="100">' +
      name +
      "</p>" +
      "</div>" +
      '<h1 style="display: flex; align-items:center; margin-left:20px">' + "Album: "+
      albumName +
      "</h1>" +
      "</div>";
    var node = document.getElementById("ele");
    var newNode = document.createElement("p");
    newNode.appendChild(document.createTextNode("orice"));
    node.appendChild(newNode);
    newNode.innerHTML = imagBlock;
  }
  function cautaPiesaAlbum(name, audio, piesa) {
    var imagBlock =
      '<div class="center" style="color: black; padding:0 45vh">' +
      '<div id = "gigi" style="display: flex; align-items:center;"' +
      '<h1>' +
      name +
      "</h1>" +
      "</div>" +
      '<div style="display: flex; align-items:center;">' +
      "<div>" +
      '<p style="text-align:center; color:red;">' +
      piesa +
      "</p>" +
      "<audio controls>" +
      '<source src="' +
      audio +
      '" type="audio/mpeg">' +
      "Your browser does not support the audio element." +
      "</audio>" +
      "</div>" +
      "</div>" +
      "</div>";
    var node = document.getElementById("ele");
    var newNode = document.createElement("p");
    newNode.appendChild(document.createTextNode("orice"));
    node.appendChild(newNode);
    newNode.innerHTML = imagBlock;
  }

