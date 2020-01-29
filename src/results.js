import { 
    getProducts, 
    getResults,
    findById } from './vote.js';

function renderLineItem(result, allProducts) {
    const matchingProduct = findById(result.id, allProducts);
    const newTr = document.createElement('tr');

    const nameTd = document.createElement('td');
    nameTd.textContent = matchingProduct.name;
    nameTd.classList.add('left');
    newTr.appendChild(nameTd);

    const sessionVotesTd = document.createElement('td');
    sessionVotesTd.textContent = result.votes;
    newTr.appendChild(sessionVotesTd);

    // const sessionViewsTd = document.createElement('td');
    // sessionVotesTd.textContent = result.views;
    // newTr.appendChild(sessionVotesTd);

    return newTr;
}

export function renderResults() {
    const results = document.getElementById('results-body');
    const allProducts = getProducts();
    const allResults = getResults();
    
    // Clear HTML before rendering results
    results.innerHTML = '';

    allResults.forEach((thisResult) => {
        const newRow = renderLineItem(thisResult, allProducts);
        results.appendChild(newRow);
    });

}

// Run on load
renderResults();