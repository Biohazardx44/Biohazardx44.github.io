/**
 * MyFood Website
 * Created by Nikola Ilievski
 * Version: 1.0.2
 */

const menu = document.querySelector("#menu");
const btnSend = document.querySelector('.btn-send');
const recipes = document.querySelectorAll('.recipe');

/**
 * A function that shows the navbar in mobile mode on click
 */
menu.addEventListener("click", function (e) {
    const links = document.querySelector(".nav-links");
    links.classList.toggle("show-nav-links");
});

/**
 * A function that adds an animation to the home page
 */
const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("slide-in-show");
        };
    });
});

document.querySelectorAll('.slide-in').forEach(x => observer.observe(x));

/**
 * A function that takes a
 * @param {string} category and filters the recipes on button click
 */
function filterRecipes(category) {
    recipes.forEach(recipe => {
        if (category === 'all') {
            recipe.style.display = 'block';
        } else if (recipe.classList.contains(category)) {
            recipe.style.display = 'block';
        } else {
            recipe.style.display = 'none';
        };
    });
};

const categories = {
    '#showAll': 'all',
    '#showMeat': 'meat',
    '#showSalad': 'salad',
    '#showSide': 'side',
    '#showDessert': 'dessert'
};

for (const buttonID in categories) {
    const button = document.querySelector(buttonID);
    if (button) {
        button.addEventListener('click', () => {
            filterRecipes(categories[buttonID]);
        });
    };
};

/**
 * A function that adds an alert and resets the form on click
 */
if (btnSend) {
    btnSend.addEventListener('click', function () {
        alert('Your information has been sent successfully!');
        document.querySelector('form').reset();
    });
};