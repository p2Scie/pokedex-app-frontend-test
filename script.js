let indexData = null;
let detailData = null;
let favoritesData = null;

const fetchPokemon = () => {
  const url = 'http://localhost:3000/';

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      indexData = data.results;
      showIndexList(indexData);
    })
    .catch((err) => console.log('Request Failed', err));
};

const addToFavorite = (name, weight, height) => {
  console.log(name, weight, height)
  const url = 'http://localhost:3000/add';
  const data = {
    name: name,
    weight: weight,
    height: height
  };

  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  })
  .then((response) => response.json())
  .catch((err) => console.log('Request Failed', err));
}

const showIndexList = (data) => {
  const container = document.querySelector('.table-container');

  data.forEach((item, index) => {
    const el = document.createElement('li');

    const tr = document.createElement('tr');

    const th = document.createElement('th');
    th.innerText = `${index + 1}`;

    const td1 = document.createElement('td');
    td1.innerText = `${item.name}`;

    const td2 = document.createElement('td');

    const btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.innerText = 'Voir détails';
    btn.classList.add('button', 'is-link', 'js-modal-trigger');

    btn.addEventListener('click', () => {
      fetchPokemonDetails(`${item.name}`);
      showIndexModal();
    });

    container?.appendChild(tr);
    tr?.appendChild(th);
    tr?.appendChild(td1);
    tr?.appendChild(td2);
    td2?.appendChild(btn);
  });
};

const showDetails = (data) => {
  const h2 = document.querySelector('.card-content .content h2');
  const p = document.querySelector('.card-content .content p');

  const btn = document.querySelector('.card-footer-item.button');

  h2.innerText = data.name;
  p.innerText = `Poids: ${data.weight}, Taille: ${data.height} `;

  btn.addEventListener('click', () => {
    // ajouter au favoris
    addToFavorite(data.name, data.weight, data.height);
  });

};

const fetchPokemonDetails = (id) => {
  const url = `http://localhost:3000/show?id=${id}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      detailData = data;

      showDetails(data);
    })
    .catch((err) => console.log('Request Failed', err));
};

const indexModalEl = document.querySelector('.modal');
const indexModalOverlay = document.querySelector('.modal-close');

const showIndexModal = () => {
  indexModalEl.classList.add('is-active');
};

const closeIndexModal = () => {
  indexModalEl.classList.remove('is-active');
};

indexModalOverlay.addEventListener('click', () => {
  closeIndexModal();
});

fetchPokemon();
