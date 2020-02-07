import { getResults } from './vote.js';

function getFlatResults(allResults) {
    const flatResults = { id : [], votes : [], views : [] };
    allResults.forEach((result) => {
        flatResults.id.push(result.id);
        flatResults.votes.push(result.votes);
        flatResults.views.push(result.views);
    });
    return flatResults;    
}

export function drawChart() {
    var ctx = document.getElementById('myChart');
    const allResults = getResults();
    // Restructure results to arrays for Chart.js display
    const flatResults = getFlatResults(allResults);
    console.log(flatResults);

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: flatResults.id,
            datasets: [{
                label: '# of Votes',
                data: flatResults.votes,
                backgroundColor: 'rgba(217,83,79,0.65)',
                categoryPercentage: .6,
            }, {
                label: '# of Views',
                data: flatResults.views,
                backgroundColor: 'rgba(92,184,92,0.65)',
                categoryPercentage: .6,
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    stacked: false,
                }],
                yAxes: [{
                    stacked: false,
                    ticks: { beginAtZero: true }
                }, {
                    stacked: false,
                    ticks: { display: false }
                }],
            }
        }
    }
    );
}