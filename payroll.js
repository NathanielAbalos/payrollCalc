const morningStartHour = document.querySelector(".morningStartHour");
const morningEndHour = document.querySelector(".morningEndHour");
const morningStartMinute = document.querySelector(".morningStartMinute");
const morningEndMinute = document.querySelector(".morningEndMinute");
const afternoonStartHour = document.querySelector(".afternoonStartHour");
const afternoonEndHour = document.querySelector(".afternoonEndHour");
const afternoonStartMinute = document.querySelector(".afternoonStartMinute");
const afternoonEndMinute = document.querySelector(".afternoonEndMinute");

const hourRateInput = document.querySelector(".hourRateInput");
const minuteRateInput = document.querySelector(".minRateInput");

const clearButton = document.querySelector("#clearButton");
const clearLogButton = document.querySelector(".clearLogButton");
const saveButton = document.querySelector(".saveButton");
const logButton = document.querySelector("#logButton");
const gearIcon =document.querySelector(".gearIcon");

const results = document.querySelectorAll(".result");
const payBox= document.querySelector(".payBox");
const timeBox = document.querySelector(".timeBox");
const buttonBox = document.querySelector(".buttons");

const displayMorningTime = document.querySelector(".totalMorningTime");
const displayMorningPay = document.querySelector(".morningPay");
const displayAfternoonTime = document.querySelector(".totalAfternoonTime");
const displayAfternoonPay = document.querySelector(".afternoonPay");
const displayTotalTime = document.querySelector(".totalTime");
const displayTotalPay = document.querySelector(".totalPay");
const logBox = document.querySelector(".logBox");

let payPerHour = 10;
let payPerMin = 0.17;

let morningHours=0;
let morningMinutesExtra=0;
let morningPay=0;
let afternoonHours=0;
let afternoonMinutesExtra=0;
let afternoonPay=0;
let addedHours=0;
let totalHours=0;
let totalHoursPay=0;
let totalMinutesExtra=0;
let totalMinutesExtraPay=0;
let totalPay=0;

let HoursMinutesPayEachDay = [];

let tickSound=new Audio("tickSound.wav");

window.onload = function(){
    if(localStorage.getItem("hourlyPay")){
        payPerHour=localStorage.getItem("hourlyPay");
        payPerMin=localStorage.getItem("minutePay");
    }
    hourRateInput.value=payPerHour;
    minuteRateInput.value=payPerMin;
    morningStartHour.focus();
}

window.addEventListener("keyup",(event)=>{
    if(event.code==="Space"){
        clearResults();
    }
    if(event.code==="Enter"){
        addedHours=0;
        calculateMorningPay();
    }
});

window.addEventListener("keyup",(event)=>{
    
    if(Number(morningStartHour.value)>=2 && Number(morningStartHour.value)<=9){
        morningStartMinute.focus();
    }
    else if(morningStartHour.value.length===morningStartHour.maxLength){
        morningStartMinute.focus();
    }
    
    if(morningStartMinute.value.length===morningStartMinute.maxLength){
        morningEndHour.focus();
    }

    if(Number(morningEndHour.value)>=2 && Number(morningEndHour.value)<=9){
        morningEndMinute.focus();
    }
    else if(morningEndHour.value.length===morningEndHour.maxLength){
        morningEndMinute.focus();
    }
    
    if(morningEndMinute.value.length===morningEndMinute.maxLength){
        afternoonStartHour.focus();
    }

    if(Number(afternoonStartHour.value)>=1 && Number(afternoonStartHour.value)<=9){
        afternoonStartMinute.focus();
    }
    else if(afternoonStartHour.value.length===afternoonStartHour.maxLength){
        afternoonStartMinute.focus();
    }

    if(afternoonStartMinute.value.length===afternoonStartMinute.maxLength){
        afternoonEndHour.focus();
    }

    if(Number(afternoonEndHour.value)>=1 && Number(afternoonEndHour.value)<=9){
        afternoonEndMinute.focus();
    }
    else if(afternoonEndHour.value.length===afternoonEndHour.maxLength){
        afternoonEndMinute.focus();
    }
    
    if(event.code==="ArrowDown"){
        afternoonStartHour.focus();
    }
    if(event.code==="ArrowUp"){
        morningStartHour.focus();
    }
});

morningEndMinute.addEventListener("input",()=>{
    if(morningEndMinute.value.length===morningEndMinute.maxLength){
        calculateMorningPay();
    }
});
afternoonEndMinute.addEventListener("input",()=>{
    if(afternoonEndMinute.value.length===afternoonEndMinute.maxLength){
        calculateAfternoonPay();
    }
})

clearButton.addEventListener("click",clearResults);
gearIcon.addEventListener("click",()=>{
    gearIcon.classList.toggle("rotate");
    document.querySelector(".outerContentBox").classList.toggle("disappear");
});
    
saveButton.addEventListener("click", ()=>{
    payPerHour=Number(hourRateInput.value);
    payPerMin=Number(minuteRateInput.value);
    
    localStorage.setItem("hourlyPay", hourRateInput.value);
    localStorage.setItem("minutePay", minuteRateInput.value);
    alert(`Settings saved! The rate is ${payPerHour} php/h, ${payPerMin} php/min`);
})  
    
hourRateInput.addEventListener("keyup",()=>{
    minuteRateInput.value=hourRateInput.value/60;
}); 
    
logButton.addEventListener("click",()=>{
    tickSound.play();
    
    HoursMinutesPayEachDay.push([totalHours, totalMinutesExtra, totalPay]);
    
    const dayBox = document.createElement("div");
    dayBox.style="padding-top: 15px;";
    dayBox.innerHTML=`<h4>Day ${HoursMinutesPayEachDay.length}</h4><br><p>${totalHours} h, ${totalMinutesExtra} min.</p><p>${totalPay} php</p>`;
    logBox.lastElementChild.appendChild(dayBox);
    
    let totalHoursForMonth = HoursMinutesPayEachDay.reduce((accumulator,currentRow)=>{
        return accumulator+currentRow[0];
    },0);
    let totalMinutesForMonth = HoursMinutesPayEachDay.reduce((accumulator,currentRow)=>{
        return accumulator+currentRow[1];
    },0);
    if(totalMinutesForMonth>=60){
        totalHoursForMonth=totalHoursForMonth+(totalMinutesForMonth/60)-((totalMinutesForMonth%60)/60);
        totalMinutesForMonth=totalMinutesForMonth%60;
    }
    let totalPayForMonth = HoursMinutesPayEachDay.reduce((accumulator,currentRow)=>{
        return accumulator+currentRow[2];
    },0);
    logBox.firstElementChild.firstElementChild.innerHTML=`<b>TOTAL HRS:</b> ${totalHoursForMonth} h, ${totalMinutesForMonth} min. <br><b>TOTAL PAY: </b>${totalPayForMonth} php`;

    if(logBox.style.display="none"){
        logBox.style.display="grid";
    }
    
    console.log(`hours, minutes, pay each day: ${HoursMinutesPayEachDay}`);
});

clearLogButton.addEventListener("click", ()=>{
    logBox.lastElementChild.innerHTML="";
    HoursMinutesPayEachDay.length=0;
    logBox.firstElementChild.firstElementChild.innerHTML="";
    logBox.style.display="none";
});

function clearResults(){
    document.querySelectorAll("input").forEach((element)=>{
        element.value='';
    });
    results.forEach((result)=>{
        result.innerHTML="";
    });
    hourRateInput.value=payPerHour;
    minuteRateInput.value=payPerMin;
    addedHours=0;
    morningHours=0;
    afternoonHours=0;
    morningMinutesExtra=0;
    afternoonMinutesExtra=0;
    totalMinutesExtra=0;
    totalHours=0;
    totalPay=0;
    totalHoursPay=0;
    totalMinutesExtraPay=0;
    morningStartHour.focus();
    payBox.style.display="none";
}

function calculateMorningPay(){
    
    if(Number(morningStartHour.value)<8){
        morningStartHour.value=8;
        morningStartMinute.value="00";
    }
    if(Number(morningEndHour.value)>=12){
        morningEndHour.value=12;
        
        if(Number(morningEndMinute.value)>0){
            morningEndMinute.value="00";
        }
    }
    if(Number(morningStartMinute.value)<Number(morningEndMinute.value)||Number(morningStartMinute.value)===Number(morningEndMinute.value)){
        morningHours=Number(morningEndHour.value) - Number(morningStartHour.value);
        morningMinutesExtra=Number(morningEndMinute.value) - Number(morningStartMinute.value);
    }
    else{
        if(Number(morningEndHour.value)-Number(morningStartHour.value)===1){
            morningHours=0;
        }
        else{
            morningHours=Number(morningEndHour.value)-Number(morningStartHour.value)-1;
        }
        morningMinutesExtra=(60-Number(morningStartMinute.value))+Number(morningEndMinute.value);
    }
    morningPay=(payPerHour*morningHours)+(payPerMin*morningMinutesExtra);
    calculateTotalPay();
}

function calculateAfternoonPay(){
    if(!(Number(afternoonStartHour.value)>=1 && Number(afternoonStartHour.value)<=4)){
        afternoonStartHour.value=1;
        afternoonStartMinute.value="00";
    }
    if(Number(afternoonEndHour.value)>=5){
        afternoonEndHour.value=5;

        if( Number(afternoonEndMinute.value)>0){
            afternoonEndMinute.value="00";
        }
    }
    if(Number(afternoonStartMinute.value)<Number(afternoonEndMinute.value)||Number(afternoonStartMinute.value)===Number(afternoonEndMinute.value)){
        afternoonHours=Number(afternoonEndHour.value) - Number(afternoonStartHour.value);
        afternoonMinutesExtra=Number(afternoonEndMinute.value) - Number(afternoonStartMinute.value);
    }
    else{
        if(Number(afternoonEndHour.value)-Number(afternoonStartHour.value)===1){
            afternoonHours=0;
        }
        else{
            afternoonHours=Number(afternoonEndHour.value)-Number(afternoonStartHour.value)-1;
        }
        afternoonMinutesExtra=(60-Number(afternoonStartMinute.value))+Number(afternoonEndMinute.value);
    }
    afternoonPay=(payPerHour*afternoonHours)+(payPerMin*afternoonMinutesExtra);
    calculateTotalPay();
}

function calculateTotalPay(){
    totalMinutesExtra=morningMinutesExtra + afternoonMinutesExtra;
    if(totalMinutesExtra>=60){
        addedHours = (totalMinutesExtra/60)-((totalMinutesExtra%60)/60);
        totalMinutesExtra = totalMinutesExtra%60;
        console.log(`addedHours: ${addedHours}`);
        console.log(`extra minutes: ${totalMinutesExtra}`);
    }
    totalMinutesExtraPay=payPerMin*totalMinutesExtra;

    totalHours = morningHours+afternoonHours+addedHours;
    totalHoursPay = payPerHour*totalHours;

    totalPay = totalHoursPay+totalMinutesExtraPay;
    
    display();
}


function display(){
    if(totalPay>=0 && totalHours>=0){
        payBox.style.display="block";
        displayMorningTime.firstElementChild.innerHTML=` ${morningHours} hours, ${morningMinutesExtra} minutes`;
        //displayMorningPay.firstElementChild.innerHTML=` ${morningPay} php`;
        displayAfternoonTime.firstElementChild.innerHTML=` ${afternoonHours} hours, ${afternoonMinutesExtra} minutes`;
        //displayAfternoonPay.firstElementChild.innerHTML=` ${afternoonPay} php`;
        displayTotalTime.firstElementChild.innerHTML=` ${totalHours} hours, ${totalMinutesExtra} minutes`;
        displayTotalPay.firstElementChild.innerHTML=` ${totalPay} php`;
    }
    else{
        alert("Invalid or incomplete Information. Please Fill in the fields correctly");
        clearResults();
    }
}
