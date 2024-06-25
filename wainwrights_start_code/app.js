let wainwrights = [];  // Declare a global variable to hold Wainwrights data

// 1. Request to the wainwrights resource and returns the reponse as JSON. 
const getAllWainwrights = async () => {
    const response = await fetch('https://raw.githubusercontent.com/annahndr/annahndr.github.io/master/wainwrights_data/wainwrights.json');
    const jsonData = await response.json();
    return jsonData;
};

//  2. function to create a series of new HTML elements
const displayWainwrights = (wainwrights) => {
    const wainwrightsList = document.getElementById('wainwrights-list');
    wainwrightsList.innerHTML = ''; 

    wainwrights.forEach(wainwright => {
        const listItem = document.createElement('li');
        const nameElement = document.createElement('span');
        nameElement.style.fontWeight = 'bold'; 
        nameElement.style.fontSize = '1.5em'; 
        nameElement.textContent = `${wainwright.name},`;

        const heightElement = document.createElement('span');
        heightElement.textContent = ` Height(m): ${wainwright.heightMetres},`;

        const areaElement = document.createElement('span');
        areaElement.textContent = ` Area Name: ${wainwright.area.areaName}`;

        listItem.appendChild(nameElement);
        listItem.appendChild(document.createElement('br'));
        listItem.appendChild(heightElement);
        listItem.appendChild(document.createElement('br'));
        listItem.appendChild(areaElement);

        wainwrightsList.appendChild(listItem);
    });
};

// 4. Create a function which is called when the form is submitted.
const filterWainwrights = (event) => {
    event.preventDefault(); 
    const searchTerm = document.getElementById("filter-input").value.toLowerCase();
    const filteredList = wainwrights.filter(element => {
        return element.name.toLowerCase().includes(searchTerm);
    });
    displayWainwrights(filteredList);
};

// 5.  function which takes the global variable (see above, step 2) and filters it based on the value received from your form.
// attempted extension 
const fetchDataAndDisplay = async () => {
    try {
        wainwrights = await getAllWainwrights();
        console.log(wainwrights);
        displayWainwrights(wainwrights);
        document.getElementById('filter-form').addEventListener('submit', filterWainwrights);
    } catch (error) {
        console.error('Error fetching Wainwrights data:', error);
    }
};

fetchDataAndDisplay();
