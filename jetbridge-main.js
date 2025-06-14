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

function loadJB()
{
geofs.aircraft.instance.addParts([{
"name":"pfd9",
"model": "../../../../backend/aircraft/repository/Airbus a321-211 _427352_5086/jetwaytruck4.glb",
"position": [4.58887,12.4009,-3.88463]
}]
);
}
let offset = 0;
function changePos()
{
   let a = parseFloat(document.getElementById("moveAmount").value);
 let pos = geofs.aircraft.instance.parts.pfd9.position;
   let x = pos[0];
   let y = pos[1];
    let z = pos[2];

if(valuepressed==1){
     x+=a;
}
else if(valuepressed==2)
{
 x-=a;
}
else if(valuepressed==3)
{
 y+=a;
}
else if(valuepressed==4)
{
 y-=a;
}
else if(valuepressed==5)
{
 z+=a;
}
else if(valuepressed==6)
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


// Dynamically create the panel div
let listdiv = document.createElement("div");
listdiv.setAttribute("data-noblur", "true");
listdiv.setAttribute("data-onshow", "{geofs.initializePreferencesPanel()}");
listdiv.setAttribute("data-onhide", "{geofs.savePreferencesPanel()}");
listdiv.setAttribute("class", "geofs-list geofs-toggle-panel geofs-livery-list geofs-visible");
// Append the panel div to the UI
document.getElementsByClassName("geofs-ui-left")[0].appendChild(listdiv);


listdiv.innerHTML = `
  <h3>Jetbridge</h3>
<br>
  <label class="switch">
    <input type="checkbox" id="toggleSwitch">
    <span class="slider round"></span>Jetbridge
  </label>
<br>
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
`;
let valuepressed = null;
document.querySelectorAll(".mdl-button.mdl-js-button.geofs-f-standard-ui.geofs-mediumScreenOnly").forEach(button => {
    button.addEventListener("click", function() {
         valuepressed = getButtonValue(this);
        console.log("Returned value:", valuepressed); // returns valuepressed value
    });
});
console.log("Returned value out:", valuepressed);
// valuepressed
function getButtonValue(buttonElement) {
    return buttonElement.getAttribute("data-value");
}

document.getElementById("toggleSwitch").addEventListener("click", function () {
    let isChecked = document.getElementById("toggleSwitch").checked;
    if (isChecked) {
        loadJB();
    }
    else{
        geofs.aircraft.instance.parts['pfd9'].object3d.destroy();
    }
});

document.getElementById("LeftButton").addEventListener("click", changePos);
document.getElementById("negY").addEventListener("click", changePos);
document.getElementById("plusX").addEventListener("click", changePos);
document.getElementById("negX").addEventListener("click", changePos);
document.getElementById("plusZ").addEventListener("click", changePos);
document.getElementById("negZ").addEventListener("click", changePos);

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
