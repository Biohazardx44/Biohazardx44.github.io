const button = document.getElementsByTagName('button');
const mainDiv = document.getElementById('mainDiv');
const container = document.querySelector('.buttons-container');

async function fetchData(apiUrl) {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
};

async function generateButtons(type) {
  const apiUrl = `https://swapi.dev/api/${type}/`;

  let data = sessionStorage.getItem(type);

  if (!data) {
    data = await fetchData(apiUrl);
    sessionStorage.setItem(type, JSON.stringify(data));
  } else {
    data = JSON.parse(data);
  };

  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('buttons-container');

  for (const item of data.results) {
    const button = document.createElement('button');
    button.textContent = item.name || item.title;
    button.classList.add('box');
    button.setAttribute('id', type);
    buttonsDiv.appendChild(button);
  };

  buttonsDiv.addEventListener('click', async (event) => {
    if (event.target.tagName === 'BUTTON') {
      const name = event.target.textContent;
      const apiUrl = `https://swapi.dev/api/${type}/?search=${encodeURIComponent(name)}`;

      mainDiv.innerHTML = '';
      let data = sessionStorage.getItem(apiUrl);

      if (!data) {
        data = await fetchData(apiUrl);
        sessionStorage.setItem(apiUrl, JSON.stringify(data));
      } else {
        data = JSON.parse(data);
      };

      const itemData = data.results[0];
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('item-stats');

      const nameHeading = document.createElement('h2');
      nameHeading.textContent = itemData.name || itemData.title;
      itemDiv.appendChild(nameHeading);
      const specsList = document.createElement('ul');

      for (const specKey in itemData) {
        if (specKey !== 'name' && specKey !== 'created' && specKey !== 'edited' && specKey !== 'url') {
          const specValue = itemData[specKey];
          const specListItem = document.createElement('li');
          specListItem.textContent = `${specKey}: ${specValue}`;
          specsList.appendChild(specListItem);
        };
      };
      itemDiv.appendChild(specsList);
      mainDiv.appendChild(itemDiv);
    };
  });

  let nextPageUrl = data.next;
  while (nextPageUrl) {
    let nextPageData = sessionStorage.getItem(nextPageUrl);

    if (!nextPageData) {
      nextPageData = await fetchData(nextPageUrl);
      sessionStorage.setItem(nextPageUrl, JSON.stringify(nextPageData));
    } else {
      nextPageData = JSON.parse(nextPageData);
    };

    for (const item of nextPageData.results) {
      const button = document.createElement('button');
      button.textContent = item.name || item.title;
      button.classList.add('box');
      button.setAttribute('id', type);
      buttonsDiv.appendChild(button);
    };
    nextPageUrl = nextPageData.next;
  };
  mainDiv.appendChild(buttonsDiv);
};

const boxes = document.querySelectorAll('.box');
boxes.forEach((box) => {
  box.addEventListener('click', async () => {
    mainDiv.innerHTML = '';
    const dataType = box.id;
    await generateButtons(dataType);
  });
});

function createButton(text) {
  const button = document.createElement('button');
  button.innerText = text;
  button.style.position = 'fixed';
  button.style.bottom = '25px';
  button.style.right = '25px';
  button.style.fontSize = '2rem';
  button.style.padding = '10px 20px';
  return button;
};

const categoryButtons = document.querySelectorAll('.category-button');
categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    const backButton = document.querySelector('.back-to-main-page');
    if (backButton) {
      backButton.remove();
    };

    const backToMainButton = createButton('Back To Main Page');
    backToMainButton.addEventListener('click', () => {
      location.reload();
    });

    container.appendChild(backToMainButton);
  });
});

const itemButtons = document.querySelectorAll('.item-button');
itemButtons.forEach(button => {
  button.addEventListener('click', () => {
    const backButton = document.querySelector('.back-to-main-page');
    if (backButton) {
      backButton.remove();
    };

    const backToMainButton = createButton('Back To Main Page');
    backToMainButton.addEventListener('click', () => {
      location.reload();
    });

    container.appendChild(backToMainButton);
  });
});

const alwaysPresentButton = createButton('Back To Main Page');
alwaysPresentButton.addEventListener('click', () => {
  location.reload();
});

document.body.appendChild(alwaysPresentButton);