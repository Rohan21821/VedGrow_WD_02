const category =
document.getElementById("category");

const inputValue =
document.getElementById("inputValue");

const fromUnit =
document.getElementById("fromUnit");

const toUnit =
document.getElementById("toUnit");

const result =
document.getElementById("result");

const historyList =
document.getElementById("historyList");

const clearHistory =
document.getElementById("clearHistory");

const units = {

temperature:[
"Celsius",
"Fahrenheit",
"Kelvin"
],

length:[
"Millimeter",
"Centimeter",
"Meter",
"Kilometer",
"Inch",
"Foot",
"Yard",
"Mile"
],

weight:[
"Milligram",
"Gram",
"Kilogram",
"Pound",
"Ounce",
"Ton"
],

area:[
"Square Meter",
"Square Kilometer",
"Square Foot",
"Acre",
"Hectare"
],

time:[
"Second",
"Minute",
"Hour",
"Day",
"Week"
],

speed:[
"m/s",
"km/h",
"mph"
]

};

function loadUnits(){

fromUnit.innerHTML="";
toUnit.innerHTML="";

units[category.value]
.forEach(unit=>{

fromUnit.innerHTML +=
`<option>${unit}</option>`;

toUnit.innerHTML +=
`<option>${unit}</option>`;
});

convert();
}

function convert(){

let value =
parseFloat(inputValue.value);

if(isNaN(value) || value===""){

result.innerText =
"Enter valid number";

return;
}

let output = value;

if(category.value==="temperature"){

if(fromUnit.value==="Celsius" &&
toUnit.value==="Fahrenheit")
output=(value*9/5)+32;

else if(fromUnit.value==="Fahrenheit" &&
toUnit.value==="Celsius")
output=(value-32)*5/9;

else if(fromUnit.value==="Celsius" &&
toUnit.value==="Kelvin")
output=value+273.15;

else if(fromUnit.value==="Kelvin" &&
toUnit.value==="Celsius")
output=value-273.15;

else if(fromUnit.value==="Fahrenheit" &&
toUnit.value==="Kelvin")
output=(value-32)*5/9+273.15;

else if(fromUnit.value==="Kelvin" &&
toUnit.value==="Fahrenheit")
output=(value-273.15)*9/5+32;
}


if(category.value==="length"){

const meter={
Meter:1,
Kilometer:1000,
Centimeter:0.01,
Mile:1609.34
};

output=
value*
meter[fromUnit.value]/
meter[toUnit.value];
}

if(category.value==="weight"){

const kg={
Kilogram:1,
Gram:0.001,
Pound:0.453592
};

output=
value*
kg[fromUnit.value]/
kg[toUnit.value];
}

if(category.value==="area"){

const area={
"Square Meter":1,
"Square Kilometer":1000000,
"Square Foot":0.092903
};

output=
value*
area[fromUnit.value]/
area[toUnit.value];
}

if(category.value==="time"){

const time={
Second:1,
Minute:60,
Hour:3600
};

output=
value*
time[fromUnit.value]/
time[toUnit.value];
}

result.innerText =
Number(output).toLocaleString(
undefined,
{
maximumFractionDigits:4
}
);

const now =
new Date().toLocaleTimeString();

const record =
`${value} ${fromUnit.value}
→ ${output.toFixed(2)}
${toUnit.value}
(${now})`;

clearTimeout(window.historyTimer);

window.historyTimer =
setTimeout(() => {

saveHistory(record);

},500);
}

function saveHistory(record){

let history =
JSON.parse(
localStorage.getItem("history")
) || [];

history.unshift(record);

history = history.slice(0,10);

localStorage.setItem(
"history",
JSON.stringify(history)
);

displayHistory();
}

function displayHistory(){

let history =
JSON.parse(
localStorage.getItem("history")
) || [];

historyList.innerHTML="";

history.forEach(item=>{

historyList.innerHTML +=
`<li>${item}</li>`;
});
}

clearHistory.addEventListener("click",()=>{

localStorage.removeItem("history");

historyList.innerHTML="";
});

category.addEventListener(
"change",
loadUnits
);

inputValue.addEventListener(
"input",
convert
);

fromUnit.addEventListener(
"change",
convert
);

toUnit.addEventListener(
"change",
convert
);

loadUnits();
displayHistory();

const swapBtn =
document.getElementById("swapBtn");

swapBtn.addEventListener(
"click",
()=>{

const temp =
fromUnit.value;

fromUnit.value =
toUnit.value;

toUnit.value =
temp;

convert();

});

document
.getElementById("copyBtn")
.addEventListener(
"click",
()=>{

navigator.clipboard.writeText(
result.innerText
);

copyBtn.innerText="✅ Copied";

setTimeout(()=>{
copyBtn.innerText="📋 Copy Result";
},1500);
});

if(history.length===0){
historyList.innerHTML=
"<li>No recent conversions</li>";
return;
}

inputValue.addEventListener(
"keydown",
(e)=>{
if(e.key==="Enter"){
convert();
}
});