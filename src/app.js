import productsSeed from '../data/products.js';
const productsKey = 'marketingProducts';

const marketingResults = {
    clickedTimes: 0,
    shownTimes: 0,
};

function getProducts() {
    const myProductsTest = localStorage.getItem(productsKey);

    if (!myProductsTest || myProductsTest === '[]') {
        const productsSeedString = JSON.stringify(productsSeed);
        localStorage.setItem(productsKey, productsSeedString);
    }

    const myProductsString = localStorage.getItem(productsKey);
    const myProducts = JSON.parse(myProductsString);
    return myProducts;
}


function saveProducts(products) {
    const productsString = JSON.stringify(products);
    localStorage.setItem(productsKey, productsString);
}

function setRandomImage(image, index, marketingProducts) {
    image.src = marketingProducts[index].image;
    image.alt = marketingProducts[index].name;
}

function chooseProduct() {
    
}

function showNewImages() {
    const imageOne = document.getElementById('marketing-image-1');
    const imageTwo = document.getElementById('marketing-image-2');
    const imageThree = document.getElementById('marketing-image-3');
    const imageSet = [imageOne, imageTwo, imageThree];

    imageOne.addEventListener('click', () => chooseProduct());

    const marketingProducts = getProducts();
    const totalProducts = marketingProducts.length;
    let randomIndexSet = [0, 0, 0];
    let randomNumber = Math.floor(Math.random() * totalProducts);
    for (let i = 0; i < randomIndexSet.length; i++) {
        if (i > 0) {
            do { randomNumber = Math.floor(Math.random() * totalProducts); 
            }
            while (randomIndexSet.includes(randomNumber)); 
        }
        randomIndexSet[i] = randomNumber;
    }

    for (let i = 0; i < randomIndexSet.length; i++) {
        setRandomImage(imageSet[i], randomIndexSet[i], marketingProducts);
    }

}

// Run On Load
showNewImages();
