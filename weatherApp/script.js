window.addEventListener('load', () => {
  const containerInner = document.querySelector('.container__inner');
  const form = document.querySelector('form');
  const input = document.querySelector('input');
  const apiKey = '125067d076d7a01052d6ab356be5c2af';
  const url = (location) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

  async function getWeather(city) {
    const res = await fetch(url(city), {origin: 'cors'});
    const data = await res.json();

    console.log(data);

    addWeather(data);
  }

  function addWeather(data) {
    const temp = Math.round(data.main.temp - 273.15);
    containerInner.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('weather');
    div.innerHTML = `
    <h2>${data.name}</h2>
    <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
    <small>${data.weather[0].main}</small>
    `;
    containerInner.append(div);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
      getWeather(input.value);
      input.value = '';
    }
  });
});
