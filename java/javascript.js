const resultList = document.querySelector('.results-list');
const debounce = (fn, debounceTime = 500) => {
  let timer = 0;
  return function (...arg) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, arg), debounceTime);
  }
};

const fetchRepos = (val) => {
  if (val === '') {
    resultList.innerHTML = ''; 
    return;
  }

  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(val)}&per_page=5`;
  fetch(url)
  .then(response => response.json())
  .then(data => {
    resultList.innerHTML = '';

      data.items.forEach(e => { 
        const serchLi = document.createElement('li');
        serchLi.textContent = e.name;
        serchLi.classList.add('search-result')
        resultList.appendChild(serchLi);

         serchLi.dataset.name = e.name
         serchLi.dataset.owner = e.owner.login
         serchLi.dataset.rate = e.stargazers_count

        const addedList = document.querySelector('.added-users');

function pickedEl () {
   let info = {
        name : this.dataset.name,
        owner : this.dataset.owner,
        stars : this.dataset.rate
    }
   const addedLi = document.createElement('li'); 
   addedLi.classList.add('added-result')
    addedLi.textContent = `Name: ${info.name}
    Owner: ${info.owner}✭˚･ﾟ✧: ${info.stars}`;
  
     addedList.appendChild(addedLi);

     function delite () {
       addedList.removeChild(addedLi)
        return;
     }

      const canseledButton = document.createElement('button'); 
         canseledButton.textContent = 'X'
     addedLi.appendChild(canseledButton);

     canseledButton.addEventListener("click", delite)
}

serchLi.addEventListener("click", pickedEl);
      });
  })
  .catch(err => console.error(err));
};

const debouncedFetch = debounce(fetchRepos, 500);

document.querySelector('.search-input').oninput = function () {
  const val = this.value.trim();
  debouncedFetch(val);
}