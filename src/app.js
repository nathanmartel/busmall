import productsSeed from '../data/products.js';
const productsKey = 'products';
const resultsKey = 'marketingResults';

const viewLocalStorageButton = document.getElementById('view-localStorage-button');
viewLocalStorageButton.addEventListener('click', () => { 
    console.log(localStorage);
});

const clearLocalStorageButton = document.getElementById('clear-all-localStorage-button');
clearLocalStorageButton.addEventListener('click', () => { 
    localStorage.clear();
    console.log(localStorage);
});

const clearSessionButton = document.getElementById('clear-session-button');
clearSessionButton.addEventListener('click', () => { 
    localStorage.setItem(productsKey, '[]');
    localStorage.setItem(resultsKey, '[]');
    console.log(localStorage);
});


const productsForm = document.getElementById('marketing-form');
productsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(productsForm);
    const selectedId = formData.get('marketing-image');
    console.log('formData is: ', formData);
    console.log('marketing-image is: ', selectedId);
    const allProducts = getProducts();
    const selectedProduct = findById(selectedId, allProducts);
    const message = document.getElementById('marketing-message');
    message.textContent = selectedProduct.name;

    addVote(selectedId);

    renderNewImages();
});


function findById(someId, someArray) {
    return someArray.find((thisItem) => { 
        if (thisItem.id === someId) return thisItem;
    });
}

function initializeStorage() {
    getProducts();
    getResults();
}



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

function getResults() {
    const myResults = localStorage.getItem(resultsKey);
    if (!myResults) {
        const myEmptyResults = [];
        return myEmptyResults;
    } else {
        const myExistingResults = JSON.parse(myResults);
        return myExistingResults;
    }
}


function saveResults(results) {
    const resultsString = JSON.stringify(results);
    localStorage.setItem(resultsKey, resultsString);
}

function renderRandomImage(imageDiv, index, marketingProducts) {
    const myImage = imageDiv.querySelector('img');
    const myInput = imageDiv.querySelector('input');
    myImage.src = marketingProducts[index].image;
    myImage.alt = marketingProducts[index].name;
    myInput.value = marketingProducts[index].id;
}

function addVote(selectedId) {
    const allResults = getResults();
    const selectedProduct = findById(selectedId, allResults);
    if (selectedProduct) {
        selectedProduct.votes++;
        saveResults(allResults);
    } else {
        const newProductInResults = {
            id : selectedId,
            votes : 1,
        };
        allResults.push(newProductInResults);
        saveResults(allResults);
    }
    console.log('allResults is: ', allResults);
}

function renderNewImages() {
    const imageOne = document.getElementById('marketing-image-1-container');
    const imageTwo = document.getElementById('marketing-image-2-container');
    const imageThree = document.getElementById('marketing-image-3-container');
    const imageSet = [imageOne, imageTwo, imageThree];

    const allProducts = getProducts();
    const totalProducts = allProducts.length;
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
        renderRandomImage(imageSet[i], randomIndexSet[i], allProducts);
    }

}

// Run On Load
initializeStorage();
renderNewImages();
