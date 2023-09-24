const inputCam = document.querySelector("input");
const fahrenheitCamp = document.querySelector(".fahrenheit").querySelector("textarea");
const kelvinCamp = document.querySelector(".kelvin").querySelector("textarea");

inputCam.addEventListener('keyup', handleInputCamKeyUp);

function handleInputCamKeyUp(e){
    if (!validateNum(e.target.value)){
        fahrenheitCamp.textContent = "-";
        kelvinCamp.textContent = "-";
    } else {
        fahrenheitCamp.textContent = converterFahrenheit(e.target.value) + "°F"
        kelvinCamp.textContent = converterKelvin(e.target.value) + "K"
    }
}

function validateNum(num){
    if (Number (num)){
        return true;
    } else {
        return false;
    }
}

function converterFahrenheit(num) {
    return (Number (num) * 9/5) + 32;
}

function converterKelvin(num) {
    return Number (num) + 273.15;
}