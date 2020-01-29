import { 
    getProducts, 
    getResults,
    getAllTimeResults,
    findById, 
    initializeStorage,
    saveSessionToAllTimeResults 
} from './vote.js';

function getAllTimeResult(productId) {
    const allTimeResults = getAllTimeResults();
    const productAllTimeResult = {
        id : productId,
        votes : 0,
        views: 0,
    };
    allTimeResults.forEach((resultArray) => {
        resultArray.forEach((result) => {
            if (result.id === productId) {
                if (result.votes) {
                    productAllTimeResult.votes += result.votes;
                    console.log(`Adding ${result.votes} votes`);
                }
                if (result.views) {
                    productAllTimeResult.views += result.views;
                    console.log(`Adding ${result.views} views`);
                }
            }
        });
    });
    return productAllTimeResult;
}

function renderLineItem(result, allTimeResult, allProducts) {
    const matchingProduct = findById(result.id, allProducts);
    const newTr = document.createElement('tr');

    const imageTd = document.createElement('td');
    const imageTdFigure = document.createElement('figure');
    const imageTdFigureImg = document.createElement('img');
    const imageTdFigcaption = document.createElement('figcaption');
    imageTdFigureImg.src = matchingProduct.image;
    imageTdFigureImg.alt = `${matchingProduct.name} photo`;
    imageTdFigcaption.textContent = matchingProduct.name;
    imageTdFigure.appendChild(imageTdFigureImg);
    imageTdFigure.appendChild(imageTdFigcaption);
    imageTd.appendChild(imageTdFigure);
    newTr.appendChild(imageTd);

    const nameTd = document.createElement('td');
    nameTd.textContent = matchingProduct.name;
    nameTd.classList.add('left');
    newTr.appendChild(nameTd);

    const sessionVotesTd = document.createElement('td');
    sessionVotesTd.textContent = result.votes;
    newTr.appendChild(sessionVotesTd);

    const sessionViewsTd = document.createElement('td');
    sessionViewsTd.textContent = result.views;
    newTr.appendChild(sessionViewsTd);

    const allTimeVotesTd = document.createElement('td');
    allTimeVotesTd.textContent = allTimeResult.votes;
    newTr.appendChild(allTimeVotesTd);

    const allTimeViewsTd = document.createElement('td');
    allTimeViewsTd.textContent = allTimeResult.views;
    newTr.appendChild(allTimeViewsTd);


    return newTr;
}

export function renderResults() {
    const results = document.getElementById('results-body');
    const allProducts = getProducts();
    const allResults = getResults();
    
    // Clear HTML before rendering results
    results.innerHTML = '';

    allResults.forEach((thisResult) => {
        const allTimeResult = getAllTimeResult(thisResult.id);
        const newRow = renderLineItem(thisResult, allTimeResult, allProducts);
        results.appendChild(newRow);
    });

}

// Run on load
saveSessionToAllTimeResults();
renderResults();