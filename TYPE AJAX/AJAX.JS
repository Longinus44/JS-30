// let url = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
//  fetch (url)
//  .then(res => res.json())
//  .then(data =>{ 
//  console.log(data);
//      let url2 = []
//      url2 = data;
//      console.log(url2)

//      let writetext = url2.map(post =>{
//          return`<h1>${post.title}</h1>
//         <p>${post.body}</p> `
//      })
//      document.getElementById('div').innerHTML = writetext
//     })

let endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
      
  let cities = [];
  fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data));
    let text = cities.map(post =>{
        return`<h1>${post.cities}</h1>`
    })
  document.getElementById('div').innerHTML = cities
  console.log(cities);

  function findMatches(wordToMatch, cities) {
        return cities.filter(place => {
          // here we need to figure out if the city or state matches what was searched
          const regex = new RegExp(wordToMatch, 'gi');
          return place.city.match(regex) || place.state.match(regex)
        });
      }
      
      function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
      
      function displayMatches() {
        const matchArray = findMatches(this.value, cities);
        const html = matchArray.map(place => {
          const regex = new RegExp(this.value, 'gi');
          const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
          const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
          return `
            <h2>
              <span class="name">${cityName}, ${stateName}</span>
              <span class="population">${numberWithCommas(place.population)}</span>
            </h2>
          `;
        }).join('');
        suggestions.innerHTML = html;
      }
      
      const searchInput = document.querySelector('.search');
      const suggestions = document.querySelector('.suggestions');
      
      searchInput.addEventListener('change', displayMatches);
      searchInput.addEventListener('keyup', displayMatches);
      