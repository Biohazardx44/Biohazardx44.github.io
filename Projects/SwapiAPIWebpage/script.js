/**
 * Swapi API Webpage
 * Created by Nikola Ilievski
 * Version: 1.1.2
 */

const button = document.getElementsByTagName('input');
const mainDiv = document.getElementById('mainDiv');
const container = document.querySelector('.buttons-container');

/**
 * A function that fetches the data from the Swapi API
 * @param {string} apiUrl and stores the response and
 * @returns the data
 */
async function fetchData(apiUrl) {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
};

/**
 * A function that generates buttons for a given
 * @param {string} type
 */
async function generateButtons(type) {
  const apiUrl = `https://swapi.dev/api/${type}/`;

  /**
   * A function that is used to get data from storage. It takes
   * @param {string} apiUrl 
   * @param {string} storageKey 
   * @returns the data
   */
  async function getDataFromStorage(apiUrl, storageKey) {
    let data = sessionStorage.getItem(storageKey);

    if (!data) {
      data = await fetchData(apiUrl);
      sessionStorage.setItem(storageKey, JSON.stringify(data));
    } else {
      data = JSON.parse(data);
    };
    return data;
  };

  data = await getDataFromStorage(apiUrl, type);

  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('buttons-container');

  for (const item of data.results) {
    const button = document.createElement('button');
    button.textContent = item.name || item.title;
    button.classList.add('box');
    button.setAttribute('id', type);
    buttonsDiv.appendChild(button);
  };

  /**
   * A function that gets the text content of the button and uses it to create an API URL and
   * it will use this URL to get data from storage and print a heading and list of item specs
   */
  buttonsDiv.addEventListener('click', async (event) => {
    if (event.target.tagName === 'BUTTON') {
      const name = event.target.textContent;
      const apiUrl = `https://swapi.dev/api/${type}/?search=${encodeURIComponent(name)}`;

      mainDiv.innerHTML = '';

      data = await getDataFromStorage(apiUrl, apiUrl);

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

/**
 * A function that clears the innerHTML when a button is clicked and
 * calls the generateButtons after that
 */
const boxes = document.querySelectorAll('.box');
boxes.forEach((box) => {
  box.addEventListener('click', async () => {
    mainDiv.innerHTML = '';
    const dataType = box.id;
    await generateButtons(dataType);
  });
});

/**
 * A function that creates a button element with the given
 * @param {string} text as its innerText
 * @returns the created button element
 */
function createButton(text) {
  const button = document.createElement('button');
  button.innerText = text;
  button.style.position = 'fixed';
  button.style.bottom = '25px';
  button.style.right = '25px';
  button.style.fontSize = '2rem';
  button.style.padding = '10px 20px';
  button.style.border = '2px solid var(--primary-yellow)';
  button.style.cursor = 'pointer';
  return button;
};

/**
 * A function to remove the 'Main Page' button and add a new one
 */
const buttons = document.querySelectorAll('.category-button, .item-button');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const backButton = document.querySelector('.back-to-main-page');
    if (backButton) {
      backButton.remove();
    };

    const backToMainButton = createButton('Main Page');
    backToMainButton.addEventListener('click', () => {
      location.reload();
    });

    container.appendChild(backToMainButton);
  });
});

/**
 * A function that reloads the page on a button click
 */
const alwaysPresentButton = createButton('Main Page');
alwaysPresentButton.addEventListener('click', () => {
  location.reload();
});

document.body.appendChild(alwaysPresentButton);