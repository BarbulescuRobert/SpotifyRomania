var redirect_uri = "http://127.0.0.1:5500/index.html";
var client_id = "f07a6af9830f48ddb768ac78bddb5027";
var client_secret = "6311fe39e78a478da3383c208c750c4c";

var access_token = null;
var refresh_token = null;
var currentPlaylist = "";
var topSongs = [];
var top10var = false;
var topNumber = 10;
var topArtists = [];

const artists = [
  "1QexdJFYGyxdBlEpDSy0d4", // Nane
  "2WMIfHM2bGQHCsCiH75YbH", // Lino Golden
  "5ysOQVQHHU9GJZBKmZMRHv", // Azteca
  "6YomcUxZXNftP5OyuHoVmB", // Delia
  "0GoJXmDr5UBG8ValCZe4om", // Ian
  "03eZ4y8baXNaR68hpkkDoq", // Amuly
  "1OQa8VMULlbmbFmDcdfBZj", // Irina Rimes
  "3gvNMbcnvmnjGaG6hvJfSH", // Smiley
  "05qpk4JDcLSFNJSsPIZ8Ye", // The Motans
  "1n5LD9Ar3D6RK2X2ewGvXb", // Carla's Dreams
  "3ArPP8R2oGr81W8i4XBPpP", // JO
  "7qY3EcnVR7pBXBzaHi3bYo", // Dorian Popa
  "2nMFC7hWK0haX8ilvRpb59", // Mira
  "6cpj6MeLF0pLx34Un9Bpj3", // Alina Eremia
  "1omKDrKCcMD79tfK8Vb2Hr", // Connect-R
  "33CSqdyro89aOFiZb5fU5U", // AlbertNBN
  "20SBqzpuFoymhieHTNHUgl", // Killa Fonic
  "3ZxemCGQmRuqoBPhQP5Gut", // Satra BENZ
  "4u0tMvazRUSOlvjqzhyLqF", // Parazitii
  "4RAbHb0oHO62If4S7h18L0", // BUG Mafia
  "6H1YO0K9D0kNWvLoib4CRL", // Abi
  "60KR2lVVoYd6GIcfLoUjPI", // Dani Mocanu
  "5h0wBmd25qPcGSInl3dp66", // Tzanca Uraganu
  "1WsXapPbIEOveVpEKjaGHu", // Ioana Ignat
  "264Be2Waq137vybMlFYCnu", // Theo Rose
  "7Ml36YHsejaW7jVjJAhW4a", // Liviu Teodorescu
  "2VX1DNIZw9X5yH8RSCFgj2", // Zanni
];

const AUTHORIZE = "https://accounts.spotify.com/authorize";
const TOKEN = "https://accounts.spotify.com/api/token";
const PLAYLISTS = "https://api.spotify.com/v1/me/playlists";
const SEARCH = "https://api.spotify.com/v1/search";
const ARTIST = "https://api.spotify.com/v1/artists/";
const ALBUM = "https://api.spotify.com/v1/albums/";

function onPageLoad() {
  if (window.location.search.length > 0) {
    handleRedirect();
  } else {
    access_token = localStorage.getItem("access_token");
    if (access_token == null || access_token == "") {
      // we don't have an access token so present token section
      requestAuthorization();
      document.getElementById("tokenSection").style.display = "block";
      document.getElementById("deviceSection").style.display = "none";
    } else {
      // we have an access token so present device section
      document.getElementById("deviceSection").style.display = "block";
      document.getElementById("tokenSection").style.display = "none";
      getArtist();
    }
  }
}

function handleRedirect() {
  let code = getCode();
  fetchAccessToken(code);
  window.history.pushState("", "", redirect_uri); // remove param from url
  getArtist();
}

function getCode() {
  let code = null;
  const queryString = window.location.search;
  if (queryString.length > 0) {
    const urlParams = new URLSearchParams(queryString);
    code = urlParams.get("code");
  }
  return code;
}

function requestAuthorization() {
  let url = AUTHORIZE;
  url += "?client_id=" + client_id;
  url += "&response_type=code";
  url += "&redirect_uri=" + encodeURI(redirect_uri);
  url += "&show_dialog=false";
  url +=
    "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
  window.location.href = url; // Show Spotify's authorization screen
}

function fetchAccessToken(code) {
  let body = "grant_type=authorization_code";
  body += "&code=" + code;
  body += "&redirect_uri=" + encodeURI(redirect_uri);
  body += "&client_id=" + client_id;
  body += "&client_secret=" + client_secret;
  callAuthorizationApi(body);
}

function refreshAccessToken() {
  refresh_token = localStorage.getItem("refresh_token");
  let body = "grant_type=refresh_token";
  body += "&refresh_token=" + refresh_token;
  body += "&client_id=" + client_id;
  callAuthorizationApi(body);
}

function callAuthorizationApi(body) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", TOKEN, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.setRequestHeader(
    "Authorization",
    "Basic " + btoa(client_id + ":" + client_secret)
  );
  xhr.send(body);
  xhr.onload = handleAuthorizationResponse;
}

function handleAuthorizationResponse() {
  if (this.status == 200) {
    var data = JSON.parse(this.responseText);
    var data = JSON.parse(this.responseText);
    if (data.access_token != undefined) {
      access_token = data.access_token;
      localStorage.setItem("access_token", access_token);
    }
    if (data.refresh_token != undefined) {
      refresh_token = data.refresh_token;
      localStorage.setItem("refresh_token", refresh_token);
    }
    onPageLoad();
  } else {
    console.log(this.responseText);
    alert(this.responseText);
  }
}

function callApi(method, url, body, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", "Bearer " + access_token);
  xhr.send(body);
  xhr.onload = callback;
}

function callApiSearch(method, url, body, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", "Bearer " + access_token);
  xhr.send(body);
  xhr.onload = callback;
}
//--------------------Acasa------------

function getArtist() {
  for (artist of artists) {
    callApi("GET", ARTIST + artist, null, getArtistResponse);
  }
  var stored = JSON.parse(localStorage.getItem("topArtists"));
  let i = 1;
  for (j of stored) {
    arataTopArtists(j.name, j.image, j.total_followers, j.genres, i);
    i++;
  }
}

function getArtistResponse() {
  if (this.status == 200) {
    var data = JSON.parse(this.responseText);
    calculateBestArtist(data);
  } else if (this.status == 401) {
    refreshAccessToken();
  } else {
    console.log(this.responseText);
    alert(this.responseText);
  }
}

function calculateBestArtist(nue) {
  let i = 0;
  var totfollow = nue.followers.total;
  var pop = nue.popularity;
  let gn = "";
  for (let k = 0; k < nue.genres.length; k++) {
    gn = gn + nue.genres[k] + ", ";
  }
  gn = gn.substring(0, gn.length - 2);
  var img = nue.images[0].url;
  var nm = nue.name;
  const temp = {
    popularity: pop,
    name: nm,
    total_followers: totfollow,
    image: img,
    genres: gn,
  };
  if (topArtists.length == 0) topArtists.push(temp);
  else {
    for (i = 0; i < topArtists.length; i++) {
      if (
        Number(topArtists[i].total_followers) < Number(temp.total_followers)
      ) {
        const aux = {
          popularity: topArtists[i].popularity,
          name: topArtists[i].name,
          total_followers: topArtists[i].total_followers,
          image: topArtists[i].image,
          genres: topArtists[i].genres,
        };
        topArtists[i].popularity = temp.popularity;
        topArtists[i].name = temp.name;
        topArtists[i].total_followers = temp.total_followers;
        topArtists[i].image = temp.image;
        topArtists[i].genres = temp.genres;
        temp.popularity = aux.popularity;
        temp.name = aux.name;
        temp.total_followers = aux.total_followers;
        temp.image = aux.image;
        temp.genres = aux.genres;
      }
    }
    if (i == topArtists.length && topArtists.length < artists.length)
      topArtists.push(temp);
  }
  localStorage.setItem("topArtists", JSON.stringify(topArtists));
}

//--------------------Top10------------

function getTop10() {
  for (artist of artists) {
    callApi(
      "GET",
      ARTIST + artist + "/top-tracks?market=RO",
      null,
      getTop10Response
    );
  }
  var stored = JSON.parse(localStorage.getItem("topSongs"));
  let i = 1;
  for (j of stored) {
    arataTop10(j.name, j.image, j.preview_url, j.song, i);
    top10var = true;
    i++;
  }
}
function getTop10Response() {
  if (this.status == 200) {
    var data = JSON.parse(this.responseText);
    for (v of data.tracks) {
      calculateBestSongs(v);
    }
  } else if (this.status == 401) {
    refreshAccessToken();
  } else {
    console.log(this.responseText);
    alert(this.responseText);
  }
}

function calculateBestSongs(nue) {
  let i = 0;
  var pop = nue.popularity;
  let nm = "";
  for (let k = 0; k < nue.artists.length; k++) {
    nm = nm + nue.artists[k].name + ", ";
  }
  nm = nm.substring(0, nm.length - 2);
  var prev = nue.preview_url;
  var img = nue.album.images[0].url;
  var sg = nue.name;
  const temp = {
    popularity: pop,
    name: nm,
    preview_url: prev,
    image: img,
    song: sg,
  };
  if (topSongs.length == 0) topSongs.push(temp);
  else {
    var merge = false;
    for (i = 0; i < topSongs.length; i++) {
      if (String(topSongs[i].song) == String(temp.song)) {
        merge = true;
        break;
      }
    }
    if (merge == false) {
      i = 0;
      for (i = 0; i < topSongs.length; i++) {
        if (Number(topSongs[i].popularity) < Number(temp.popularity)) {
          const aux = {
            popularity: topSongs[i].popularity,
            name: topSongs[i].name,
            preview_url: topSongs[i].preview_url,
            image: topSongs[i].image,
            song: topSongs[i].song,
          };
          topSongs[i].popularity = temp.popularity;
          topSongs[i].name = temp.name;
          topSongs[i].preview_url = temp.preview_url;
          topSongs[i].image = temp.image;
          topSongs[i].song = temp.song;
          temp.popularity = aux.popularity;
          temp.name = aux.name;
          temp.preview_url = aux.preview_url;
          temp.image = aux.image;
          temp.song = aux.song;
        }
      }
    }
    if (i == topSongs.length && topSongs.length < topNumber)
      topSongs.push(temp);
  }
  localStorage.setItem("topSongs", JSON.stringify(topSongs));
}

function top10button() {
  topNumber = 10;
  topSongs = [];
  const myNode = document.getElementById("aici");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
  }
  getTop10();
  setTimeout(() => {
    repeta(10);
  }, 500);
}

function top50button() {
  topNumber = 50;
  topSongs = [];
  const myNode = document.getElementById("aici");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
  }
  getTop10();
  setTimeout(() => {
    repeta(50);
  }, 500);
}
function top100button() {
  topNumber = 100;
  topSongs = [];
  const myNode = document.getElementById("aici");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
  }
  getTop10();
  setTimeout(() => {
    repeta(100);
  }, 500);
}

function repeta(nr) {
  topNumber = nr;
  topSongs = [];
  const myNode = document.getElementById("aici");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
  }
  getTop10();
}

function search() {
  if (document.getElementById("top10Section").style.display == "block")
    document.getElementById("top10Section").style.display = "none";
  if (document.getElementById("deviceSection").style.display == "block")
    document.getElementById("deviceSection").style.display = "none";

  document.getElementById("searchSection").style.display = "block";
  const myNode = document.getElementById("ele");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
  }
  var type = "";
  var searchField = document.getElementById("searchField").value;
  document.getElementById("searchField").value = "";
  searchField.toLowerCase();
  if (searchField.includes("album")) {
    type = "album";
    searchField = searchField.replace(type, "");
  } else if (searchField.includes("artist")) {
    type = "artist";
    searchField = searchField.replace(type, "");
  } else if (searchField.includes("playlist")) {
    type = "playlist";
    searchField = searchField.replace(type, "");
  } else if (searchField.includes("track")) {
    type = "track";
    searchField = searchField.replace(type, "");
  } else if (searchField.includes("song")) {
    type = "track";
    searchField = searchField.replace("song", "");
  } else if (searchField.includes("piesa")) {
    type = "track";
    searchField = searchField.replace("piesa", "");
  } else if (searchField.includes("piese")) {
    type = "track";
    searchField = searchField.replace("piese", "");
  }
  searchField = searchField.replace(" ", "%20");
  if (type != "") searchField = searchField + "&type=" + type;
  else searchField = searchField + "&type=artist";
  var body = "?q=" + searchField;
  if (type == "" || type == "artist")
    callApiSearch("GET", SEARCH + body, null, searchResponseArtist);
  else if (type == "track")
    callApiSearch("GET", SEARCH + body, null, searchResponseTrack);
  else if (type == "album")
    callApiSearch("GET", SEARCH + body, null, searchResponseAlbum);
}

function searchResponseArtist() {
  if (this.status == 200) {
    var data = JSON.parse(this.responseText);
    for (ju of data.artists.items) {
      let gn = "";
      console.log(ju.genres);
      for (let i = 0; i < ju.genres.length; i++) {
        gn = gn + ju.genres[i] + ", ";
      }
      if (gn != "") gn = gn.substring(0, gn.length - 2);
      if (ju.images.length != 0)
        arataSearch(ju.name, ju.images[0].url, ju.followers.total, gn);
      else arataSearch(ju.name, "", ju.followers.total, gn);
    }
  } else if (this.status == 401) {
    refreshAccessToken();
  } else {
    console.log(this.responseText);
    alert(this.responseText);
  }
}

function searchResponseTrack() {
  if (this.status == 200) {
    var data = JSON.parse(this.responseText);
    for (ju of data.tracks.items) {
      let nm = "";
      for (let i = 0; i < ju.artists.length; i++) {
        nm = nm + ju.artists[i].name + ", ";
      }
      if (nm != "") nm = nm.substring(0, nm.length - 2);
      cautaPiesa(nm, ju.preview_url, ju.name, ju.album.images[0].url);
    }
  } else if (this.status == 401) {
    refreshAccessToken();
  } else {
    console.log(this.responseText);
    alert(this.responseText);
  }
}
function searchResponseAlbum() {
  if (this.status == 200) {
    var data = JSON.parse(this.responseText);
    console.log(data);
    for (ju of data.albums.items) {
      if (Number(ju.total_tracks) > 1) {
        let nm = "";
        for (let i = 0; i < ju.artists.length; i++) {
          nm = nm + ju.artists[i].name + ", ";
        }
        if (nm != "") nm = nm.substring(0, nm.length - 2);
        if (ju.images.length != 0)
          arataSearchAlbum(
            nm,
            ju.images[0].url,
            ju.name,
            ju.id,
            ju.total_tracks
          );
        else arataSearchAlbum(nm, "", ju.name, ju.id, ju.total_tracks);
      }
    }
  } else if (this.status == 401) {
    refreshAccessToken();
  } else {
    console.log(this.responseText);
    alert(this.responseText);
  }
}

function getTracksFromAlbum(link) {
  callApi("GET", ALBUM + link, null, AlbumResponse);
}

function AlbumResponse() {
  const myNode = document.getElementById("ele");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
  }
  if (this.status == 200) {
    var data = JSON.parse(this.responseText);
    console.log(data);
    let nm = "";
    for (let i = 0; i < data.artists.length; i++) {
      nm = nm + data.artists[i].name + ", ";
    }
    if (nm != "") nm = nm.substring(0, nm.length - 2);
    let img = "";
    if (data.images.length > 0) img = data.images[0].url;
    let albumName = data.name;
    AlbumTitle(nm, albumName, img);
    for (ju of data.tracks.items) {
      let nm = "";
      for (let i = 0; i < ju.artists.length; i++) {
        nm = nm + ju.artists[i].name + ", ";
      }
      if (nm != "") nm = nm.substring(0, nm.length - 2);
      cautaPiesaAlbum(nm, ju.preview_url, ju.name);
    }
  } else if (this.status == 401) {
    refreshAccessToken();
  } else {
    console.log(this.responseText);
    alert(this.responseText);
  }
}

function acasa() {
  document.getElementById("acasa").classList.add("active");
  document.getElementById("top10Section").style.display = "none";
  document.getElementById("deviceSection").style.display = "block";
  document.getElementById("searchSection").style.display = "none";
  document.getElementById("top10").classList.remove("active");
  document.getElementById("despre").classList.remove("active");
}

function top10() {
  if (top10var == false) getTop10();
  document.getElementById("top10").classList.add("active");
  document.getElementById("top10Section").style.display = "block";
  document.getElementById("deviceSection").style.display = "none";
  document.getElementById("searchSection").style.display = "none";
  document.getElementById("acasa").classList.remove("active");
  document.getElementById("despre").classList.remove("active");
}
function despre() {
  document.getElementById("despre").classList.add("active");
  document.getElementById("acasa").classList.remove("active");
  document.getElementById("top10").classList.remove("active");
}
