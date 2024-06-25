const getAllWainwrights = async () => {
    const response = await fetch('https://raw.githubusercontent.com/annahndr/annahndr.github.io/master/wainwrights_data/wainwrights.json');
    const jsonData = await response.json();
    return jsonData;
};

let wainwrights;

async function main(){
    wainwrights = await getAllWainwrights();
    console.log(wainwrights);
    displayWainwrights(wainwrights);
}

main();

function displayWainwrights(wainwrights) {
    const wainwrightsList = document.getElementById('wainwrights-list');
    wainwrightsList.innerHTML = ''; 

    wainwrights.forEach(wainwright => {
        const listItem = document.createElement('li');

        const nameElement = document.createElement('span');
        nameElement.style.fontWeight = 'bold'; 
        nameElement.style.fontSize = '1.5em'; 
        nameElement.textContent = `${wainwright.name},`;

        const heightElement = document.createElement('span');
        heightElement.textContent = ` Height: ${wainwright.heightMetres},`;

        const areaElement = document.createElement('span');
        areaElement.textContent = ` Area: ${wainwright.area.areaName}`;

        listItem.appendChild(nameElement);
        listItem.appendChild(document.createElement('br'));
        listItem.appendChild(heightElement);
        listItem.appendChild(document.createElement('br'));
        listItem.appendChild(areaElement);

        wainwrightsList.appendChild(listItem);

    });

    
}

async function filterWainwrights(event) {
    event.preventDefault(); 
    const searchTerm = document.getElementById("filter-input").value.toLowerCase();
    const filteredList = wainwrights.filter(element => {
        return element.name.toLowerCase().includes(searchTerm);
    });
    displayWainwrights(filteredList);
}


document.getElementById('filter-form').addEventListener('submit', filterWainwrights);
