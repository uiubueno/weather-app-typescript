"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector("#search-form > form");
const input = document.querySelector("#input-localization");
const sectionWeatherInfo = document.querySelector("#weather-info");
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    if (!input || !sectionWeatherInfo)
        return;
    const localization = input.value;
    if (localization.length < 3) {
        alert("O local precisa conter pelo menos 3 carácteres");
    }
    try {
        const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localization}&appid=add4ed201882bf60ece3c64cb6373410&lang=pt_br&units=metric`);
        const data = yield response.json();
        const infos = {
            temperatura: Math.round(data.main.temp),
            local: data.name,
            icone: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        };
        sectionWeatherInfo.innerHTML = `<div class="weather-data">
      <h2>${infos.local}</h2>
      <span>${infos.temperatura}</span>
    </div>
    <img width="100px" src="${infos.icone}" />`;
    }
    catch (err) {
        console.log("Deu um erro na obtenção dos dados da API.", err);
    }
}));
