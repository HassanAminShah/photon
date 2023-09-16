const auth = "pjRMuLpjWNT5OXSgcUlFxiOVVHIZQ96J53GGladmoX053UL6JfAVYAJr";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let searchValue;
const more = document.querySelector(".more");
let page = 1;
let fetchLink;
let currentSearch;

//Event Listener
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});

more.addEventListener("click", loadMore);

function updateInput(e) {
  searchValue = e.target.value;
}

async function fetchapi(url) {
  const dataFetch = await fetch(url, {
    method: "Get",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

function generatePictures(data) {
  data.photos.forEach((photo) => {
    const gallerImg = document.createElement("div");
    gallerImg.classList.add("gallery-img");
    gallerImg.innerHTML = `
        <div class = "gallery-info" >
        <p> ${photo.photographer} </p>
        <a href = ${photo.src.original}> Download </a>
        </div>
        <img src = ${photo.src.large} ></img>
        `;
    gallery.appendChild(gallerImg);
  });
}

async function curatedPhotos() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  const data = await fetchapi(fetchLink);
  generatePictures(data);
}

async function searchPhotos(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
  const data = await fetchapi(fetchLink);
  generatePictures(data);
}

function clear() {
  gallery.innerHTML = " ";
  searchInput.value = " ";
}

async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchapi(fetchLink);
  generatePictures(data);
}

curatedPhotos();
