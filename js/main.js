/**
 * 1. créer une IIFE asynchrone
 * 
 * 2. Récupérer les 8 éléments HTML sur la page pour l'affichage
 * 
 * 3. À l'aide de la variable moduleAPI utiliser la fonction 'getBaseInfos' pour charger les données
 * Ce code devra être dans une fonction appelée 'insertDataToDocument' et sera asynchrone
 * 
 * 4. Utiliser les boutons pour changer de pokémon
 * 
 * 5. Utiliser la barre de recherche pour changer de pokémon.
 * 
 */



(async function () {
  const randomIndex = Math.floor(Math.random() * 1009) + 1;

  const pokemonNameElement = document.getElementById('pokemonName');
  const searchBar = document.getElementById('search');
  const typeListElements = document.getElementById('typeList');
  const descriptionElement = document.getElementById('description');
  const statsElements = document.getElementById('stats');
  const ButtonPrevious = document.getElementById('btnPrevious');
  const ButtonNext = document.getElementById('btnNext');
  const imgElement = document.querySelector('img');

  let currentIndex = randomIndex;
  let totalPokemonCount = 0;

  const data = await moduleAPI.getBaseInfos(randomIndex);

  console.log(data);

  pokemonNameElement.innerText = data.id + ' - ' + data.name;
  typeListElements.innerHTML = ''; // Réinitialise les types
  statsElements.innerHTML = ''; // Réinitialise les statistiques
  descriptionElement.innerText = data.description;
  imgElement.src = data.img;

  for (let i = 0; i < data.types.length; i++) {
    // += sert à faire une boucle
    typeListElements.innerHTML += `<span class="type bg-type-${data.types[i]}">${data.types[i]}</span>`;
  }

  for (const [stat, value] of Object.entries(data.stats)) {
    statsElements.innerHTML += `
      <div class="progress">
        <div class="label">
          <span class="label-title">${stat}</span>
          <span class="label-value">${value}</span>
        </div>
        <progress max="200" value="${value}"></progress>
      </div>
    `;
  }

  document.body.className = 'theme-' + data.types[0];






  ButtonPrevious.addEventListener('click', loadPreviousPokemon);
  ButtonNext.addEventListener('click', loadNextPokemon);

  async function loadPreviousPokemon() {
    if (currentIndex > 1) {
      currentIndex--;
      await loadPokemonData(currentIndex);
    }
  }

  async function loadNextPokemon() {
    if (currentIndex < 1009) {
      currentIndex++;
      await loadPokemonData(currentIndex);
    }
  }
	
	
		//search
	
  searchBar.addEventListener('keyup', handleSearchInputChange);

	async function handleSearchInputChange(event) {
	const searchValue = event.target.value.trim();

  if (event.keyCode == 13) {
    try {
     loadPokemonData(searchValue.toLowerCase());
	 event.target.value = ""
	 
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la recherche du Pokémon', error);
    }
  }
}
  
  
	
	
  async function loadPokemonData(index) {
    try {
      const pokemonData = await moduleAPI.getBaseInfos(index);
	 currentIndex = pokemonData.id;
      pokemonNameElement.innerText = pokemonData.id + ' - ' + pokemonData.name;
      typeListElements.innerHTML = '';
      statsElements.innerHTML = '';
      descriptionElement.innerText = pokemonData.description;
      imgElement.src = pokemonData.img;

      for (let i = 0; i < pokemonData.types.length; i++) {
        typeListElements.innerHTML += `<span class="type bg-type-${pokemonData.types[i]}">${pokemonData.types[i]}</span>`;
      }

      for (const [stat, value] of Object.entries(pokemonData.stats)) {
        statsElements.innerHTML += `
          <div class="progress">
            <div class="label">
              <span class="label-title">${stat}</span>
              <span class="label-value">${value}</span>
            </div>
            <progress max="200" value="${value}"></progress>
          </div>
        `;
      }

      document.body.className = 'theme-' + pokemonData.types[0];

      console.log('Données chargées avec succès');
    } catch (error) {
      console.error('Une erreur s\'est produite lors du chargement des données', error);
    }
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
})();

