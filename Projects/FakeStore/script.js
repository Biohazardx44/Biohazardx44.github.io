const container = document.getElementById("container");
const mensClothing = document.getElementById("mens-clothing");
const womensClothing = document.getElementById("womens-clothing");
const electronics = document.getElementById("electronics");
const jewelry = document.getElementById("jewelery");

const cardInfo = (element, category) => {
    const cardInnerHTML = `
    <div id="${category}Container">
      <div class="image"><img src="${element.image}"></div>
      <div class="title">${element.title}</div>
      <div class="desc"><strong>Description:<br></strong> ${element.description}</div>
      <div class="btn-container"><button>Buy: ${element.price} $</button></div>
    </div>`;
    return cardInnerHTML;
};

const handleData = (json, category) => {
    let container;
    switch (category) {
        case "men's clothing":
            container = mensClothing;
            break;
        case "women's clothing":
            container = womensClothing;
            break;
        case "electronics":
            container = electronics;
            break;
        case "jewelery":
            container = jewelry;
            break;
    }
    json.forEach(element => {
        const card = cardInfo(element, category);
        container.innerHTML += card;
    });
};

const fetchData = (category) => {
    if (sessionStorage.getItem(`${category}Products`)) {
        handleData(JSON.parse(sessionStorage.getItem(`${category}Products`)), category);
    } else {
        fetch(`https://fakestoreapi.com/products/category/${category}`)
            .then(res => res.json())
            .then((json) => {
                handleData(json, category);
                sessionStorage.setItem(`${category}Products`, JSON.stringify(json));
            });
    }
}

fetchData("men's clothing");
fetchData("women's clothing");
fetchData("electronics");
fetchData("jewelery");

window.onload = function() {
    // hide all elements except login and register forms
    document.getElementById("container").style.display = "none";
    document.getElementById("buttons").style.display = "block";
    document.getElementById("login-form").style.display = "block";
    document.getElementById("register-form").style.display = "none";
  
    // add event listener to login button
    document.getElementById("login-button").addEventListener("click", function() {
      document.getElementById("container").style.display = "block";
      document.getElementById("buttons").style.display = "none";
      document.getElementById("login-form").style.display = "none";
    });
  
    // add event listener to register button
    document.getElementById("register-button").addEventListener("click", function() {
      document.getElementById("container").style.display = "none";
      document.getElementById("buttons").style.display = "none";
      document.getElementById("login-form").style.display = "none";
      document.getElementById("register-form").style.display = "block";
    });
  };