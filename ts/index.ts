const form: HTMLInputElement | null = document.querySelector(
  "#search-form > form"
);
const input: HTMLInputElement | null = document.querySelector(
  "#input-localization"
);

const sectionWeatherInfo = document.querySelector("#weather-info");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!input || !sectionWeatherInfo) return;

  const localization = input.value;

  if (localization.length < 3) {
    alert("O local precisa conter pelo menos 3 carácteres");
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${localization}&appid=add4ed201882bf60ece3c64cb6373410&lang=pt_br&units=metric`
    );
    const data = await response.json();

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
  } catch (err) {
    console.log("Deu um erro na obtenção dos dados da API.", err);
  }
});
