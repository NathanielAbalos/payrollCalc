const morningStartHour = document.querySelector(".morningStartHour");
const morningEndHour = document.querySelector(".morningEndHour");
const morningStartMinute = document.querySelector(".morningStartMinute");
const morningEndMinute = document.querySelector(".morningEndMinute");
const afternoonStartHour = document.querySelector(".afternoonStartHour");
const afternoonEndHour = document.querySelector(".afternoonEndHour");
const afternoonStartMinute = document.querySelector(".afternoonStartMinute");
const afternoonEndMinute = document.querySelector(".afternoonEndMinute");

const results = document.querySelectorAll(".result");
const clearButton = document.querySelector("#clearButton");
const displayMorningTime = document.querySelector(".totalMorningTime");
const displayMorningPay = document.querySelector(".morningPay");
const displayAfternoonTime = document.querySelector(".totalAfternoonTime");
const displayAfternoonPay = document.querySelector(".afternoonPay");
const displayTotalTime = document.querySelector(".totalTime");
const displayTotalPay = document.querySelector(".totalPay");

const payPerHour = 10;
const payPerMin = 0.17;

let morningHours;
let morningMinutesExtra;
let morningPay;
let afternoonHours;
let afternoonMinutesExtra;
let afternoonPay;
let totalHours;
let totalHoursPay;
let totalMinutesExtra;
let totalMinutesExtraPay;
let totalPay;

window.onload = function(){
    morningStartHour.focus();
}

window.addEventListener("keyup",(event)=>{
    if(event.code==="Enter"){
        clearResults();
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
    else if(event.code==="ArrowRight"||morningEndHour.value.length===morningEndHour.maxLength){
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

    if(afternoonEndMinute.value.length===afternoonStartMinute.maxLength){
        calculateMorningPay();
    }

});
//morningEndHour.addEventListener("input",calculateMorningPay);
//morningStartMinute.addEventListener("input",calculateMorningPay);
//morningEndMinute.addEventListener("input",calculateMorningPay);
//afternoonStartHour.addEventListener("input",calculateMorningPay);
//afternoonEndHour.addEventListener("input",calculateMorningPay);
//afternoonStartMinute.addEventListener("input",calculateMorningPay);
//afternoonEndMinute.addEventListener("input",calculateMorningPay);

clearButton.addEventListener("click",clearResults);

function clearResults(){
    document.querySelectorAll("input").forEach((element)=>{
        element.value='';
    });
    results.forEach((result)=>{
        result.innerHTML="";
    });
    morningStartHour.focus();
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
    calculateAfternoonPay();
}

function calculateAfternoonPay(){
    if(Number(afternoonStartHour.value)<=12 && Number(afternoonStartHour.value)>5){
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
    totalHours = morningHours+afternoonHours;
    totalHoursPay = payPerHour*totalHours;

    totalMinutesExtra=morningMinutesExtra + afternoonMinutesExtra;
    totalMinutesExtraPay=payPerMin*totalMinutesExtra;
    
    totalPay = totalHoursPay+totalMinutesExtraPay;
    display();
}

function display(){
    displayMorningTime.firstElementChild.innerHTML=` ${morningHours} hours, ${morningMinutesExtra} minutes`;
    displayMorningPay.firstElementChild.innerHTML=` ${morningPay} php`;
    displayAfternoonTime.firstElementChild.innerHTML=` ${afternoonHours} hours, ${afternoonMinutesExtra} minutes`;
    displayAfternoonPay.firstElementChild.innerHTML=` ${afternoonPay} php`;
    displayTotalTime.firstElementChild.innerHTML=` ${totalHours} hours, ${totalMinutesExtra} minutes`;
    displayTotalPay.firstElementChild.innerHTML=` ${totalPay} php`;
}