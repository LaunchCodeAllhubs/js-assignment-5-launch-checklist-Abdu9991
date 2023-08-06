// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, imageUrl, moons) {
    // Here is the HTML formatting for our mission target div.
    let missionTarget = document.getElementById("missionTarget");
    missionTarget.innerHTML = `
                 <h2>Mission Destination</h2>
                 <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter:${diameter}</li>
                  <li>Star: ${star}</li>
                    <li>Distance from Earth:${distance} </li>
                    <li>Number of Moons: ${moons}</li>
              </ol>
                <img src=${imageUrl}>`;

}

function validateInput(testInput) {
    if (testInput === "") {
        return "Empty";
    } else if (isNaN(testInput) === true) {
        return "Not a Number";
    } else if (isNaN(testInput) === false) {
        return "Is a Number";
    };
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    // Dom elements 
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let launchStatus = document.getElementById("launchStatus");
    //let list = document.getElementById("faultyItems")
    //check if user field are filled 
    if (validateInput(pilot) === `Empty` || validateInput(copilot) === `Empty` ||
        validateInput(fuelLevel) === `Empty` || validateInput(cargoLevel) === `Empty`) {
        alert(`All feilds are required`);
        list.style.visibility = 'visible';
    }
    // To check that fuelLevel and cargoLevel are numbers.chech pilot and copilot are string.
    else if (validateInput(fuelLevel) === `Not a Number` || validateInput(cargoLevel) === `Not a Number`) {
        alert(`Make sure to enter valid information for each field!`)
        list.style.visibility = visible;
    } else if (validateInput(pilot) === `Is a Number` || validateInput(copilot) === `Is a Number`) {
        alert(`Please don't enter numbers for pilot or co-pilot`);
        list.style.visibility = 'visible';
    } else {
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`
    }

    if (fuelLevel < 10000) {
        fuelStatus.innerHTML = `Fuel level too low for launch`;
        list.style.visibility = 'visible';
        launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
        launchStatus.style.color = 'rgb(199, 37, 78)';
    } else if (fuelLevel >= 10000 && cargoLevel > 10000) {
        fuelStatus.innerHTML = `Fuel level high enough for launch`;
        launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
        list.style.visibility = 'visible';
        launchStatus.style.color = 'rgb(199, 37, 78)';
        cargoStatus.innerHTML = `Cargo mass too heavy for launch`;
    } else if (cargoLevel >= 10000) {
        cargoStatus.innerHTML = `Cargo mass too heavy for launch`;
        list.style.visibility = 'visible';
        launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
        launchStatus.style.color = 'rgb(199, 37, 78)';
    } else if (cargoLevel > 10000 && fuelLevel < 10000) {
        fuelStatus.innerHTML = `Fuel level too low for launch`;
        list.style.visibility = 'visible';
        launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
        launchStatus.style.color = 'rgb(199, 37, 78)';
        cargoStatus.innerHTML = `Cargo mass too heavy for launch`;
    } else if (cargoLevel < 10000 && fuelLevel >= 10000) {
        list.style.visibility = 'visible';
        fuelStatus.innerHTML = `Fuel level high enough for launch`;
        cargoStatus.innerHTML = `Cargo mass low enough for launch`;
        launchStatus.innerHTML = `Shuttle is Ready for Launch`;
        launchStatus.style.color = 'rgb(65, 159, 106)';
    }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
        return response.json();
    });

    return planetsReturned;

}

// Function to pick a planet at random from the list
function pickPlanet(planets) {
    const randomIndex = Math.floor(Math.random() * planets.length);
    return planets[randomIndex];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
