const error = document.querySelector('.res');
let city = '';

document.querySelector('[data-btn]').onclick = () => {
    city = document.querySelector('[data-city]').value.trim();  
    join();
}

function join() {
    const xhm = new XMLHttpRequest();
    xhm.open('GET', `http://api.weatherapi.com/v1/current.json?key=e1132a8602054e6fa4e73823232203&q=${city}`);
    xhm.addEventListener('load', () => {
        error.textContent = ``;
        const res = JSON.parse(xhm.responseText);
        if (res.error) {
            error.textContent = `This city "${city}" doesn't exist`;
            return;
        };
        console.log(res);
        document.querySelector('[data-name-country]').textContent = res.location.country.toUpperCase();
        document.querySelector('[data-name-city]').textContent = res.location.name.toUpperCase();
        document.querySelector('[data-feel]').textContent = res.current.feelslike_c;
        document.querySelector('[data-temp-c]').textContent = res.current.temp_c;
        document.querySelector('[data-wind]').textContent = res.current.wind_kph;        
        document.querySelector('[data-condition]').textContent = res.current.condition.text;
        document.querySelector('[data-img]').setAttribute('src', `${res.current.condition.icon}`);
    });
    xhm.send();
};
