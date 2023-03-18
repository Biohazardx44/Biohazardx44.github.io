/**
 * Fake Store
 * Created by Nikola Ilievski
 * Version: 1.0.0
 */

document.getElementById("loginForm").style.display = "block";

let logoutTimer;

/**
 * A function that shows the login form
 */
function showLoginForm() {
    clearTimeout(logoutTimer);
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("registerForm").style.display = "none";
}

/**
 * A function that shows the register form
 */
function showRegisterForm() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
}

/**
 * A function that saves the users information on register and
 * @returns an error message if the user made a mistake on register
 */
function saveUserInformation() {
    const username = document.getElementById("new_username").value;
    const password = document.getElementById("new_password").value;

    if (username.length < 5 || password.length < 5) {
        alert("Username & Password must be at least 5 characters long!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(user => user.username === username)) {
        alert("This username is already taken, please choose another one!");
        return;
    }

    const user = {
        username,
        password
    };

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    document.getElementById("registerForm").reset();
    alert("You have successfully registered!");
}

/**
 * A function that will log you in the website
 * if you enter the correct information saved from registering
 */
function handleLoginForm() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users"));

    const matchedUser = users && users.find(user => user.username === username && user.password === password);

    //Automatically log out after 3 hours
    if (matchedUser) {
        alert("Login successful!");
        logoutTimer = setTimeout(logout, 3 * 60 * 60 * 1000);
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("registerForm").style.display = "none";
        document.querySelector(".mainPage").style.display = "block";
    } else {
        alert("Invalid Username or Password!");
    }
}

/**
 * A function to log you out of the website on logout button click
 */
function logout() {
    document.querySelector(".mainPage").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("loginForm").reset();
    document.getElementById("registerForm").reset();
}
const logoutButton = document.getElementById("logout-button");
logoutButton.addEventListener("click", function () {
    clearTimeout(logoutTimer);
    logout();
});

const container = document.getElementById("container");

/**
 * A function to clear the website container
 */
const clearContainer = () => {
    container.innerHTML = "";
}

/**
 * A function that takes in a
 * @param {Object} element and creates the card information and finally
 * @returns the cardInnerHTML
 */
const cardInfo = (element) => {
    const cardInnerHTML = `
    <div class="card">
    <div class="image"><img src="${element.image}"></div>
    <div class="title">${element.title}</div>
    <div class="desc"><strong>Description:<br></strong> ${element.description}</div>
    <div class="btn-container"><button class="buyBtn">Buy: ${element.price} $</button></div>
    </div>`;
    return cardInnerHTML;
}

/**
 * A function that accepts a
 * @param {Object} json and
 * prints the cards in the html
 */
const handleData = async (json) => {
    json.forEach((element) => {
        const card = cardInfo(element);
        container.innerHTML += card;
    });
}

/**
 * A function that takes a
 * @param {string} category and fetches the data
 * from the FakeStore API
 */
const fetchData = async (category) => {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
        const json = await res.json();
        sessionStorage.setItem(category, JSON.stringify(json));
        handleData(json);
    } catch (error) {
        console.error(error);
    }
}

/**
 * A function that handles the fetched data for all products on button click
 */
const handleAllProducts = async () => {
    clearContainer();
    const mensClothingData = JSON.parse(sessionStorage.getItem("men's clothing"));
    const womensClothingData = JSON.parse(sessionStorage.getItem("women's clothing"));
    const electronicsData = JSON.parse(sessionStorage.getItem("electronics"));
    const jeweleryData = JSON.parse(sessionStorage.getItem("jewelery"));
    if (mensClothingData && womensClothingData && electronicsData && jeweleryData) {
        handleData(mensClothingData.concat(womensClothingData, electronicsData, jeweleryData));
    } else {
        await fetchData("men's clothing");
        await fetchData("women's clothing");
        await fetchData("electronics");
        await fetchData("jewelery");
    }
}

/**
 * A function that handles the fetched data for mens clothing on button click
 */
const handleMensClothing = async () => {
    clearContainer();
    const mensClothingData = JSON.parse(sessionStorage.getItem("men's clothing"));
    if (mensClothingData) {
        handleData(mensClothingData);
    } else {
        await fetchData("men's clothing");
    }
}

/**
 * A function that handles the fetched data for womens clothing on button click
 */
const handleWomensClothing = async () => {
    clearContainer();
    const womensClothingData = JSON.parse(sessionStorage.getItem("women's clothing"));
    if (womensClothingData) {
        handleData(womensClothingData);
    } else {
        await fetchData("women's clothing");
    }
}

/**
 * A function that handles the fetched data for electronics on button click
 */
const handleElectronics = async () => {
    clearContainer();
    const electronicsData = JSON.parse(sessionStorage.getItem("electronics"));
    if (electronicsData) {
        handleData(electronicsData);
    } else {
        await fetchData("electronics");
    }
}

/**
 * A function that handles the fetched data for jewelery on button click
 */
const handleJewelery = async () => {
    clearContainer();
    const jeweleryData = JSON.parse(sessionStorage.getItem("jewelery"));
    if (jeweleryData) {
        handleData(jeweleryData);
    } else {
        await fetchData("jewelery");
    }
}

document.getElementById("btn-all-products").addEventListener("click", handleAllProducts);
document.getElementById("btn-mens-clothing").addEventListener("click", handleMensClothing);
document.getElementById("btn-womens-clothing").addEventListener("click", handleWomensClothing);
document.getElementById("btn-electronics").addEventListener("click", handleElectronics);
document.getElementById("btn-jewelery").addEventListener("click", handleJewelery);

/**
 * Function is under maintenance
 */
function toggleCart() {
    clearContainer();
    alert("Cart is still under maintenance!")
}