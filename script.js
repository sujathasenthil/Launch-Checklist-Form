// Write your JavaScript code here!

window.addEventListener("load", function() {
   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {
      event.preventDefault();
      let pilotNameInput = document.querySelector("input[name=pilotName]");
      let coPilotNameInput = document.querySelector("input[name=copilotName]");
      let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
      let cargoMasslInput = document.querySelector("input[name=cargoMass]");
      if (pilotNameInput.value === "" || coPilotNameInput.value === "" || fuelLevelInput.value === "" || cargoMasslInput.value === "") {
         alert("All fields are required!");
         return;
         }
      
      if((isNaN(fuelLevelInput.value)) || (isNaN(cargoMasslInput.value)) || (!isNaN(pilotNameInput.value)) || (!isNaN(coPilotNameInput.value)) )
      {
         alert("Make sure to enter valid information for each field!");
         return;
      }
      if(Number(fuelLevelInput.value) < 10000)
      {
         document.getElementById("launchStatus").innerHTML=("Shuttle not ready for launch").fontcolor("red");
         document.getElementById("faultyItems").style.visibility = "visible";
         document.getElementById("fuelStatus").innerHTML= "There is not enough fuel for the journey";
         document.getElementById("pilotStatus").innerHTML = pilotNameInput.value + " is ready for launch";
         document.getElementById("copilotStatus").innerHTML = coPilotNameInput.value + " is ready for launch";
      }
      if(Number(cargoMasslInput.value) > 10000)
      {
        // alert("Too much mass");
         document.getElementById("faultyItems").style.visibility = "visible";
         document.getElementById("launchStatus").innerHTML=("Shuttle not ready for launch").fontcolor("red");
         document.getElementById("cargoStatus").innerHTML="There is too much mass for the shuttle to take off.";
         document.getElementById("pilotStatus").innerHTML = pilotNameInput.value + " is ready for launch";
         document.getElementById("copilotStatus").innerHTML = coPilotNameInput.value + " is ready for launch";
      }
      if((Number(fuelLevelInput.value) > 10000) && (Number(cargoMasslInput.value) < 10000))
      {
        document.getElementById("faultyItems").style.visibility = "visible";
         document.getElementById("launchStatus").innerHTML=("Shuttle is ready for launch").fontcolor("green");
         document.getElementById("pilotStatus").innerHTML = pilotNameInput.value + " is ready for launch";
         document.getElementById("copilotStatus").innerHTML = coPilotNameInput.value + " is ready for launch";
         
      }      
        
      fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
         response.json().then(function(json) {  
            let div=document.getElementById("missionTarget");
            let jsonLength=Object.keys(json).length;
            //console.log(jsonLength);
            let randomNumber=Math.floor(Math.random()*jsonLength)
            //console.log(randomNumber);
            div.innerHTML=`
            <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${json[randomNumber].name}</li>
               <li>Diameter: ${json[randomNumber].diameter}</li>
               <li>Star: ${json[randomNumber].star}</li>
               <li>Distance from Earth: ${json[randomNumber].distance}</li>
               <li>Number of Moons: ${json[randomNumber].moons}</li>
            </ol>
            <img src="${json[randomNumber].image}">`
         });
      });
});
});
