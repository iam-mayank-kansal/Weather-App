const weather_api_key = `ad9e7eef0a9786212829df522b6cac2d`;




const search_btn = document.querySelector(".Search-btn");
const input_sec = document.querySelector(".get_details");
const show_sec = document.querySelector(".showing_data")
search_btn.addEventListener("click", async () => {
    console.log(input_sec);
    input_sec.style.transform = "scale(0)";
    setTimeout(() => {
        input_sec.style.display = "none";
        console.log(show_sec);
        show_sec.style.display = "flex";
        setTimeout(() => {
            console.log(show_sec);
            show_sec.style.transform = "scale(1)";
        }, 100);
    }, 500);

    await weatherapi();
})






async function weatherapi() {
    const city = document.querySelector(`#city`).value;

    if (!city) {
        alert(`Please enter a city`);
        return;
    };

    const weather_data = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weather_api_key}`;
    const forcast_data = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weather_api_key}`;

    console.log(weather_data);
    console.log(forcast_data);

    try {

        const response1 = await fetch(weather_data);
        const response2 = await fetch(forcast_data);

        if (!response1.ok && response2.ok) {
            throw new Error(`Network error of weather api - ${response1.statusText} and forecast api - ${response2.statusText}`);
            return;

        }

        const data1 = await response1.json();
        console.log(data1);

        const data2 = await response2.json();
        console.log(data2);

        console.log(data1.weather[0].description);
        console.log(data1.main.temp);
        console.log(data1.name);
        console.log("breaak");
        console.log(data2.list[0].weather[0].description);
        console.log(data2.list[0].main.temp);
        console.log(data2.city.name);

        document.querySelector('#cityName').innerText = `${data1.name}`;

        document.querySelector('#weatherDescription').innerText = data1.weather[0].description;
        document.querySelector('#windspeed').innerText = data1.wind.speed;
        document.querySelector('#lattitude').innerText = `${data2.city.coord.lat} ° North`;
        document.querySelector('#longitude').innerText = `${data2.city.coord.lon} ° East`;
        document.querySelector('#temperature').innerText = `${data1.main.temp}K`;
        document.querySelector('#humidity').innerText = `${data1.main.humidity}`;
        document.querySelector('#pressure').innerText = `${data1.main.pressure}`;
        document.querySelector('#forecastDescription').innerText = `${data2.list[0].weather[0].description}`;


    }
    catch (error) {
        console.error(`Error in Fetching Data - ${error}`);
    }

}



