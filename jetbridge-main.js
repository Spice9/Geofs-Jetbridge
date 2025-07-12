// ==UserScript==
// @name         Jetbridge
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Jetbridge Addon
// @author     spice9
// @match http://*/geofs.php*
// @match https://*/geofs.php*
// @run-at document-end
// @grant        none
// @require http://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

// This addon is still in its development and may get more tweaks in future

//backend/aircraft/repository/Boeing 737-600_427352_5203/
function loadJB()
{
    if(modelOption=="option1")
    {
geofs.aircraft.instance.addParts([{
"name":"pfd9",
"model": "../../../../backend/aircraft/repository/Airbus a321-211 _427352_5086/jwt11.glb",
"position": [0,0,0],
"rotation":[0,0,0]
}]
);
    }
    else if(modelOption=="option2")
    {
    geofs.aircraft.instance.addParts([{
"name":"pfd9",
"model": "../../../../backend/aircraft/repository/Airbus a321-211 _427352_5086/jwt6.glb",
"position": [0,0,0],
"rotation":[0,0,0]
}]
);
    }
    else if(modelOption=="option3")
    {
    geofs.aircraft.instance.addParts([{
"name":"pfd9",
"model": "../../../../backend/aircraft/repository/Airbus a321-211 _427352_5086/jetwaytruck4.glb",
"position": [0,0,0],
"rotation":[0,0,0]
}]
);
    }
    else if(modelOption=="option4")
    {
    geofs.aircraft.instance.addParts([{
"name":"pfd9",
"model": "../../../../backend/aircraft/repository/Airbus a321-211 _427352_5086/jwt8.glb",
"position": [0,0,0],
"rotation":[0,0,0]
}]
);
    }
      else if(modelOption=="option5")
    {
    geofs.aircraft.instance.addParts([{
"name":"pfd9",
"model": "../../../../backend/aircraft/repository/Boeing 737-600_427352_5203/jwt12.glb",
"position": [0,0,0],
"rotation":[0,0,0]
}]
);
    }
}
let offset = 0;
function changePos()
{
   let a = parseFloat(document.getElementById("moveAmount").value);
 let pos = geofs.aircraft.instance.parts.pfd9.position;
   let x = pos[0];
   let y = pos[1];
    let z = pos[2];

if(valuepressed==1&& JBlockCheckValue==0){
     x+=a;
}
else if(valuepressed==2 && JBlockCheckValue==0)
{
 x-=a;
}
else if(valuepressed==3 && JBlockCheckValue==0)
{
 y+=a;
}
else if(valuepressed==4&& JBlockCheckValue==0)
{
 y-=a;
}
else if(valuepressed==5&& JBlockCheckValue==0)
{
 z+=a;
}
else if(valuepressed==6&& JBlockCheckValue==0)
{
 z-=a;
}
else{
console.log("invalid");
}
    console.log("Returned value out:", valuepressed);
  geofs.api.addFrameCallback(function(){geofs.aircraft.instance.parts.pfd9.object3d._position = [x, y, z];})
    geofs.aircraft.instance.parts.pfd9.position = [x,y,z];
    console.log(geofs.aircraft.instance.parts.pfd9.position);
}

//rotate
function rotate()
{
let r = parseFloat(document.getElementById("rotateAmount").value);
 let rot = geofs.aircraft.instance.parts.pfd9.rotation;
    let x = rot[1];
if(valuepressed==7&& JBlockCheckValue==0)
{
 x+=r;
 console.log(x);
}
else if(valuepressed==8&& JBlockCheckValue==0)
{
x-=r;
}
     geofs.api.addFrameCallback(function(){
    var part = geofs.aircraft.instance.parts['pfd9'];
    if (part && part.object3d) {
        part.object3d.rotateZ(x*(Math.PI / 180));
    }
     geofs.aircraft.instance.parts.pfd9.rotation[2] = x;
});
    console.log(geofs.aircraft.instance.parts.pfd9.object3d._rotation);
    console.log(x);
}

// Dynamically create the panel div
let listdiv = document.createElement("div");
listdiv.setAttribute("data-noblur", "true");
listdiv.setAttribute("data-onshow", "{geofs.initializePreferencesPanel()}");
listdiv.setAttribute("data-onhide", "{geofs.savePreferencesPanel()}");
listdiv.setAttribute("class", "geofs-list geofs-toggle-panel geofs-livery-list geofs-visible");
// Append the panel div to the UI
document.getElementsByClassName("geofs-ui-left")[0].appendChild(listdiv);


listdiv.innerHTML = `
<style>
      .dropdown {
      position: relative;
      display: inline-block;
    }

    .dropdown button {
      background-color: rgb(188, 192, 195);
      color: black;
      border: none;
      padding: 8px 12px;
      cursor: pointer;
    }

    .dropdown-content {
      display: none;
      position: absolute;
      background-color: rgb(213, 213, 205);
      min-width: 100px;
      z-index: 1;
      box-shadow: 0px 2px 5px rgba(0,0,0,0.2);
    }

    .dropdown .option {
      padding: 7px 9px;
      cursor: pointer;
      color: black;
    }

    .dropdown .option:hover {
      background-color: #ccc;
    }

    .dropdown.show .dropdown-content {
      display: block;
    }
    </style>
  <h3>Jetbridge</h3>
<br>
  <label class="switch">
    <input type="checkbox" id="toggleSwitch">
    <span class="slider round"></span>Jetbridge
  </label>
<br>
 <label><input type="radio" name="option" value="option1"  data-value="1"> Jetbridge 1</label><br>
  <label><input type="radio" name="option" value="option2"  data-value="2"> Jetbridge 2</label><br>
  <label><input type="radio" name="option" value="option3"  data-value="3"> Jetbridge 3</label><br>
  <label><input type="radio" name="option" value="option4"  data-value="4"> Jetbridge 4</label><br>
  <label><input type="radio" name="option" value="option5"  data-value="5"> Jetbridge 5</label><br>
  <label for="moveAmount">Move Amount:</label>
<select id="moveAmount">
 <option value="0.05">0.05</option>
  <option value="0.1 selected">0.1</option>
  <option value="0.25">0.25</option>
  <option value="0.5">0.5</option>
  <option value="1">1</option>
   <option value="3">3</option>
</select>
<br>
<ul id="listitem">
</ul>

<div id="vehSwitch">

</div>
<div>
  <button id="raise"  class="mdl-button mdl-js-button geofs-f-standard-ui geofs-mediumScreenOnly" data-value="9">
    Raise
  </button>
  <button id="lower" data-value="10" class="mdl-button mdl-js-button geofs-f-standard-ui geofs-mediumScreenOnly">
   Lower
  </button>
  <br>
</div>
<div>
  <button id="door"  class="mdl-button mdl-js-button geofs-f-standard-ui geofs-mediumScreenOnly" data-value="11">
    Open doors
  </button>
   <button id="door2"  class="mdl-button mdl-js-button geofs-f-standard-ui geofs-mediumScreenOnly" data-value="12">
    Close doors
  </button>
  <br>
</div>
<br>
  <button id="plusX"  class="mdl-button mdl-js-button geofs-f-standard-ui geofs-mediumScreenOnly" data-value="1">
    +X
  </button>
  <button id="negX" data-value="2" class="mdl-button mdl-js-button geofs-f-standard-ui geofs-mediumScreenOnly">
    -X
  </button>
  <br>
  <button id="LeftButton" data-value="3" class="mdl-button mdl-js-button geofs-f-standard-ui geofs-mediumScreenOnly">
    +Y
  </button>
  <button id="negY" data-value="4" class="mdl-button mdl-js-button geofs-f-standard-ui geofs-mediumScreenOnly">
    -Y
  </button>
  <br>

  <button id="plusZ" data-value="5" class="mdl-button mdl-js-button geofs-f-standard-ui geofs-mediumScreenOnly">
    +Z
  </button>
  <button id="negZ" data-value="6" class="mdl-button mdl-js-button geofs-f-standard-ui geofs-mediumScreenOnly">
    -Z
  </button>
  <br>
    <label for="rotateAmount">Rotate Amount:</label>
<select id="rotateAmount">
 <option value="11.25">11.25</option>
  <option value="22.5 selected">22.5</option>
  <option value="45">45</option>
  <option value="90">90</option>
  <option value="180">180</option>
</select>

<div>
  <button id="cw"  class="mdl-button mdl-js-button geofs-f-standard-ui geofs-mediumScreenOnly" data-value="7">
    <-Clockwise
  </button>
  <button id="acw" data-value="8" class="mdl-button mdl-js-button geofs-f-standard-ui geofs-mediumScreenOnly">
    Anticlockwise->
  </button>
  <br>
</div>

<br>
   <label class="switch">
    <input type="checkbox" id="jbLock">
    <span class="slider round"></span>lock Jetbridge
  </label>

  <div id="lockMenu">
  </div>
   <div class="dropdown">
      <button>Lock vehicles</button>
      <div id="lockContent">

      </div>

    </div>

`;
// valuepressed
let valuepressed = null;
document.querySelectorAll(".mdl-button.mdl-js-button.geofs-f-standard-ui.geofs-mediumScreenOnly").forEach(button => {
    button.addEventListener("click", function() {
         valuepressed = getButtonValue(this);
        console.log("Returned value:", valuepressed); // returns valuepressed value
    });
});
console.log("Returned value out:", valuepressed);

function getButtonValue(buttonElement) {
    return buttonElement.getAttribute("data-value");
}
//model option
  let modelOption = null;
  let modelOptionChecked = null;
let JBlockCheckValue = 0;
  // Add event listeners to all radio buttons with name="choice"
  document.querySelectorAll('input[name="option"]').forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        modelOption = radio.value;
         modelOptionChecked = true;
          // Update the modelOption variable
        console.log("Selected model option:", modelOption);
      }
        else{
            modelOptionChecked = false;
        }
    });
  });


document.getElementById("toggleSwitch").addEventListener("click", function () {
    let isChecked = document.getElementById("toggleSwitch").checked;
    if (isChecked) {
        loadJB();
    }
    else{
        geofs.aircraft.instance.parts['pfd9'].object3d.destroy();
    }
});
document.getElementById("jbLock").addEventListener("click", function () {
    let isCheckedJBlock = document.getElementById("jbLock").checked;
    JBlockCheckValue = isCheckedJBlock ? 1 : 0;
    console.log("Jetbridge Lock:", JBlockCheckValue);
});


document.getElementById("LeftButton").addEventListener("click", changePos);
document.getElementById("negY").addEventListener("click", changePos);
document.getElementById("plusX").addEventListener("click", changePos);
document.getElementById("negX").addEventListener("click", changePos);
document.getElementById("plusZ").addEventListener("click", changePos);
document.getElementById("negZ").addEventListener("click", changePos);

document.getElementById("cw").addEventListener("click", rotate);
document.getElementById("acw").addEventListener("click", rotate);

const listel = document.querySelector('#listitem');
const listelCheckbox = document.querySelector('#vehSwitch');
const lockItem = document.querySelector('#lockContent');
let listData = null;
let len = null;
let poslist = null;
let lockValue = false;


let nameArr = [];
fetch('https://raw.githubusercontent.com/Spice9/Geofs-Jetbridge/refs/heads/main/ground-vehicles.json')
    .then(res => res.json())
    .then(data => {
        listData = data;
        len = data.length;
        data.forEach(post => {
            listelCheckbox.insertAdjacentHTML("beforeend", ` <label">
    <input type="checkbox" id="checkVeh">
    <span class="slider-round-veh"></span>${post.name}
  </label><br>`)
 lockItem.insertAdjacentHTML("beforeend",` <label">
    <input type="checkbox" id="checkLockList">
    <span class="slider-round-lock"></span>${post.name}
  </label><br>`)

        });

for(let i=0;i<len+12;i++)
{
 nameArr[i] = 0;
}
document.querySelectorAll('#lockContent input').forEach((lockedItem, index) => {
    lockedItem.addEventListener("click", () => {
       lockValue = lockedItem.checked;
        console.log(lockValue);
        if(lockValue)
        {
          nameArr[index]=1;
        }
        else{
        nameArr[index]=0;
        }
        console.log(nameArr);
    });
});


        // Moved the event listener here, after list is loaded
        document.querySelectorAll('#vehSwitch input').forEach((listItem, index) => {
            listItem.addEventListener("click", () => {
               let isCheckedVeh = listItem.checked;
                if (isCheckedVeh)
                {
                const partsveh = [{
                    "name": listData[index].name,
                    "model": listData[index].model,
                    "position": [0,0,0],
                    "rotation":[0,0,0]
                }];
                geofs.aircraft.instance.addParts(partsveh);

                    console.log(nameArr);
                poslist = geofs.aircraft.instance.parts[listData[index].name].position;
               console.log(geofs.aircraft.instance.parts[listData[index].name].position);

                }
            else {
                 geofs.aircraft.instance.parts[listData[index].name].object3d.destroy();
            }
        //change position using parameters
function rotateVeh()
{
let r = parseFloat(document.getElementById("rotateAmount").value);
 let rot = geofs.aircraft.instance.parts[listData[index].name].rotation;
    let x = rot[1];
if(valuepressed==7&& nameArr[index]==0)
{
 x+=r;
 console.log(x);
}
else if(valuepressed==8&& nameArr[index]==0)
{
x-=r;
}
     geofs.api.addFrameCallback(function(){
    var part = geofs.aircraft.instance.parts[listData[index].name];
    if (part && part.object3d) {
        part.object3d.rotateZ(x*(Math.PI / 180));
    }
     geofs.aircraft.instance.parts[listData[index].name].rotation[2] = x;
});
    console.log(geofs.aircraft.instance.parts[listData[index].name].object3d._rotation);
    console.log(x);
}
                function changePosPara()
                {
                   let a = parseFloat(document.getElementById("moveAmount").value);
 let pos = geofs.aircraft.instance.parts[listData[index].name].position;
   let x = pos[0];
   let y = pos[1];
   let z = pos[2];
    if(valuepressed==1 && nameArr[index]==0){
     x+=a;
}
else if(valuepressed==2 && nameArr[index]==0)
{
 x-=a;
}
else if(valuepressed==3 && nameArr[index]==0)
{
 y+=a;
}
else if(valuepressed==4 && nameArr[index]==0)
{
 y-=a;
}
else if(valuepressed==5 && nameArr[index]==0)
{
 z+=a;
}
else if(valuepressed==6 && nameArr[index]==0)
{
 z-=a;
}
else{
console.log("invalid");
}
    console.log("Returned value out:", valuepressed);
  geofs.api.addFrameCallback(function(){geofs.aircraft.instance.parts[listData[index].name].object3d._position = [x, y, z];})
    geofs.aircraft.instance.parts[listData[index].name].position = [x,y,z];
    console.log(geofs.aircraft.instance.parts[listData[index].name].position);
}
                changePosPara();
//rotate


document.getElementById("LeftButton").addEventListener("click", changePosPara);
document.getElementById("negY").addEventListener("click", changePosPara);
document.getElementById("plusX").addEventListener("click", changePosPara);
document.getElementById("negX").addEventListener("click", changePosPara);
document.getElementById("plusZ").addEventListener("click", changePosPara);
document.getElementById("negZ").addEventListener("click", changePosPara);
document.getElementById("cw").addEventListener("click", rotateVeh);
document.getElementById("acw").addEventListener("click", rotateVeh);

     //Cube.009
geofs.animation.values.jetbridgeRaiseValue = 0;
geofs.animation.values.dooropen = 0;

      geofs.aircraft.instance.addParts([{
"name":"cater_arm_1",
"parent":"Catering Truck",
"node":"cater_arm_1",
"animations": [{
				"type": "rotate",
				"axis": "X",
				"value": "jetbridgeRaiseValue",
				"ratio": -50
			},{
				"type": "translate",
				"axis": "Z",
				"value": "jetbridgeRaiseValue",
				"ratio": -4
			}]
}]
);
                  geofs.aircraft.instance.addParts([{
"name":"cater_arm_2",
"parent":"Catering Truck",
"node":"cater_arm_2",
"animations": [{
				"type": "rotate",
				"axis": "X",
				"value": "jetbridgeRaiseValue",
				"ratio": 50
			},{
				"type": "translate",
				"axis": "Z",
				"value": "jetbridgeRaiseValue",
				"ratio": 4
			}]
}]
);

                geofs.aircraft.instance.addParts([{
"name":"cater_box",
"parent":"Catering Truck",
"node":"Cube.009",
"animations": [{
				"type": "translate",
				"axis": "Y",
				"value": "jetbridgeRaiseValue",
				"ratio": 20
			}]
}]
);
                  geofs.aircraft.instance.addParts([{
"name":"cater_box2",
"parent":"Catering Truck",
"node":"Cube.005",
"animations": [{
				"type": "translate",
				"axis": "Y",
				"value": "jetbridgeRaiseValue",
				"ratio": 20
			}]
}]
);
                     geofs.aircraft.instance.addParts([{
"name":"cater_box3",
"parent":"Catering Truck",
"node":"Cylinder",
"animations": [{
				"type": "translate",
				"axis": "Y",
				"value": "jetbridgeRaiseValue",
				"ratio": 20
			}]
}]
);
 geofs.aircraft.instance.addParts([{
  "name": "doorF1",
  "parent":"Airport bus",
 "type": "frame",
  "node": "Cube.024",
            "animations": [
                {"type": "rotate", "axis": "Y", "value": "dooropen", "ratio": -80}
            ]
}]
);
                      geofs.aircraft.instance.addParts([{
  "name": "doorF2",
  "parent":"Airport bus",
  "type": "frame",
  "node": "Cube.025",
            "animations": [
                {"type": "rotate", "axis": "Y", "value": "dooropen", "ratio": 170}
            ]
}]
);
       geofs.aircraft.instance.addParts([{
  "name": "doorF3",
  "parent":"Airport bus",
  "type": "frame",
  "node": "Cube.016",
            "animations": [
                {"type": "rotate", "axis": "Y", "value": "dooropen", "ratio": 80}
            ]
}]
);
                   geofs.aircraft.instance.addParts([{
  "name": "doorF4",
  "parent":"Airport bus",
  "type": "frame",
  "node": "Cube.015",
            "animations": [
                {"type": "rotate", "axis": "Y", "value": "dooropen", "ratio": -170}
            ]
}]
);
                geofs.aircraft.instance.addParts([{
  "name": "doorB1",
  "parent":"Airport bus",
  "type": "frame",
  "node": "Cube.021",
            "animations": [
                {"type": "rotate", "axis": "Y", "value": "dooropen", "ratio": -80}
            ]
}]
);
                   geofs.aircraft.instance.addParts([{
  "name": "doorB2",
  "parent":"Airport bus",
  "type": "frame",
  "node": "Cube.022",
            "animations": [
                {"type": "rotate", "axis": "Y", "value": "dooropen", "ratio": 170}
            ]
}]
);
                               geofs.aircraft.instance.addParts([{
  "name": "doorB3",
  "parent":"Airport bus",
  "type": "frame",
  "node": "Cube.013",
            "animations": [
                {"type": "rotate", "axis": "Y", "value": "dooropen", "ratio": 80}
            ]
}]
);
                   geofs.aircraft.instance.addParts([{
  "name": "doorB4",
  "parent":"Airport bus",
  "type": "frame",
  "node": "Cube.023",
            "animations": [
                {"type": "rotate", "axis": "Y", "value": "dooropen", "ratio": -170}
            ]
}]
);


document.getElementById("door").addEventListener("click", function() {
    geofs.animation.values.dooropen += 1;
});
document.getElementById("door2").addEventListener("click", function() {
    geofs.animation.values.dooropen -= 1;
});

            });
        });
    });

document.getElementById("raise").addEventListener("click", function() {
    geofs.animation.values.jetbridgeRaiseValue += 0.1;
});

document.getElementById("lower").addEventListener("click", function() {
    geofs.animation.values.jetbridgeRaiseValue -= 0.1;
});
// Creates a button to toggle the panel
let button1 = document.createElement("div");
button1.setAttribute("data-noblur", "true");
button1.innerHTML = '<button class="mdl-button mdl-js-button geofs-f-standard-ui geofs-mediumScreenOnly" data-tooltip-classname="mdl-tooltip--top" id="ebutton">Button</button>';

// Append the button for the panel toggle
let buttonDiv = document.createElement("div");
buttonDiv.innerHTML = '<button class="mdl-button mdl-js-button geofs-f-standard-ui geofs-mediumScreenOnly" data-toggle-panel=".geofs-livery-list" data-tooltip-classname="mdl-tooltip--top" tabindex="0" id="cambutton" size="50%">Jetbridge</button>';
document.body.appendChild(buttonDiv);

//Geofs UI
let element = document.getElementById("cambutton");
if (geofs.version >= 3.6) {
    document.getElementsByClassName("geofs-ui-bottom")[0].insertBefore(element, document.getElementsByClassName("geofs-ui-bottom")[0].children[4]);
} else {
    document.getElementsByClassName("geofs-ui-bottom")[0].insertBefore(element, document.getElementsByClassName("geofs-ui-bottom")[0].children[3]);
}

// Function to clear list panel (if needed)
function listPanel() {
    document.getElementById("ListPanel").innerHTML = "";
}
