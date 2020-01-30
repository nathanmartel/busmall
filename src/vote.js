import productsSeed from '../data/products.js';
const productsKey = 'products';
const resultsKey = 'sessionResults';
const allTimeResultsKey = 'allTimeResults';


export function initializeAdminButtons() {

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
}

export function saveSessionToAllTimeResults() {
    const previousSessionResults = getResults();
    let allTimeResults;
    if (!localStorage.getItem(allTimeResultsKey)) {
        allTimeResults = [];
    } else {
        const allTimeResultsString = localStorage.getItem(allTimeResultsKey);
        allTimeResults = JSON.parse(allTimeResultsString); 
    }
    allTimeResults.push(previousSessionResults);
    const newAllTimeResultsString = JSON.stringify(allTimeResults);
    localStorage.setItem(allTimeResultsKey, newAllTimeResultsString);
}

export function initializeStorage() {
    getProducts();
    if (!localStorage.getItem(allTimeResultsKey)) {
        localStorage.setItem(allTimeResultsKey, '[]');        
    }
    localStorage.setItem(resultsKey, '[]');
}

export function initializeListenToProducts() {
    const productsForm = document.getElementById('marketing-form');
    productsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(productsForm);
        const selectedId = formData.get('marketing-image');
        const allProducts = getProducts();
        const selectedProduct = findById(selectedId, allProducts);
        const message = document.getElementById('marketing-message');
        message.textContent = selectedProduct.name;

        addVote(selectedId);

        renderNewImages();
    });
}

export function findById(someId, someArray) {
    return someArray.find((thisItem) => { 
        if (thisItem.id === someId) return thisItem;
    });
}


export function getProducts() {
    const myProductsTest = localStorage.getItem(productsKey);

    if (!myProductsTest || myProductsTest === '[]') {
        const productsSeedString = JSON.stringify(productsSeed);
        localStorage.setItem(productsKey, productsSeedString);
    }

    const myProductsString = localStorage.getItem(productsKey);
    const myProducts = JSON.parse(myProductsString);
    return myProducts;
}


export function getAllTimeResults() {
    const myResults = localStorage.getItem(allTimeResultsKey);
    if (!myResults) {
        const myEmptyResults = [];
        return myEmptyResults;
    } else {
        const myExistingResults = JSON.parse(myResults);
        return myExistingResults;
    }
}


export function getResults() {
    const myResults = localStorage.getItem(resultsKey);
    if (!myResults) {
        const myEmptyResults = [];
        return myEmptyResults;
    } else {
        const myExistingResults = JSON.parse(myResults);
        return myExistingResults;
    }
}


function saveResults(allResults) {
    const resultsString = JSON.stringify(allResults);
    localStorage.setItem(resultsKey, resultsString);
}

function saveAllTimeResults(allResults) {
    const resultsString = JSON.stringify(allResults);
    console.log('saving alltime: ', resultsString);
    localStorage.setItem(allTimeResultsKey, resultsString);
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
    // addView is called before addVote, so product must have been already initialized in results
    if (selectedProduct) {
        if (selectedProduct.votes) selectedProduct.votes++;
        else selectedProduct.votes = 1;
        saveResults(allResults);
    }

    const allTimeResults = getAllTimeResults();
    const selectedAllTimeProduct = findById(selectedId, allTimeResults);
    if (selectedAllTimeProduct) {
        if (selectedAllTimeProduct.votes) selectedAllTimeProduct.votes++;
        else selectedAllTimeProduct.votes = 1;
        saveAllTimeResults(allTimeResults);
    }
}


function addView(selectedId) {
    const allResults = getResults();
    const selectedProduct = findById(selectedId, allResults);
    if (selectedProduct) {
        selectedProduct.views++;
        saveResults(allResults);
    } else {
        const newProductInResults = {
            id : selectedId,
            votes : 0,
            views : 1,
        };
        allResults.push(newProductInResults);
        saveResults(allResults);
    }

    const allTimeResults = getAllTimeResults();
    const selectedAllTimeProduct = findById(selectedId, allTimeResults);
    if (selectedAllTimeProduct) {
        selectedAllTimeProduct.views++;
        saveAllTimeResults(allTimeResults);
    } else {
        const newProductInResults = {
            id : selectedId,
            votes : 0,
            views : 1,
        };
        allTimeResults.push(newProductInResults);
        saveAllTimeResults(allTimeResults);
    }

}



export function renderNewImages() {
    const imageOne = document.getElementById('marketing-image-1-container');
    const imageTwo = document.getElementById('marketing-image-2-container');
    const imageThree = document.getElementById('marketing-image-3-container');
    const imageSet = [imageOne, imageTwo, imageThree];

    const allProducts = getProducts();
    const totalProducts = allProducts.length;
    let randomIndexSet = [];
    const numberOfProducts = imageSet.length;
    let randomNumber = Math.floor(Math.random() * totalProducts);
    for (let i = 0; i < numberOfProducts; i++) {
        if (i > 0) {
            do { randomNumber = Math.floor(Math.random() * totalProducts); 
            }
            while (randomIndexSet.includes(randomNumber)); 
        }
        randomIndexSet[i] = randomNumber;
    }

    const allResults = getResults();
    imageSet.forEach( (thisImageDiv, i) => { 
        renderRandomImage(thisImageDiv, randomIndexSet[i], allProducts);
        const myProductIndex = randomIndexSet[i];
        const myProductId = allProducts[myProductIndex].id;
        addView(myProductId);
    });
}