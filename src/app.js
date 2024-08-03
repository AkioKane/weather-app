async function getWeatherData(location="london") {
  try {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=2YNM5FU77T2A8AGV4NNP2Z9T2`, {mode: "cors"})
    const data = await response.json()
    return getDayInfo(data, location)
  } catch (err) {
    console.error(err)
  }
}

function getDayInfo(data, location, num=0) {
  const day = data.days[num]
  const temp = day.temp
  const max = day.tempmax
  const min = day.tempmin
  const weather = day.preciptype[0]
  const name = location
  const hours = day.hours

  loadHead(name, temp, max, min, weather)
  loadHoursWeather(hours)

  return console.log("Options", day)
}

function loadHead(name, temp, max, min, preciptype) {
  const headName = document.querySelector(".head-name")
  const headTemp = document.querySelector(".head-temp")
  const headMax = document.querySelector(".head-max")
  const headMin = document.querySelector(".head-min")
  const headWeather = document.querySelector(".head-weather")

  const tempCelsium = ((temp - 32) / 1.8).toFixed(0) + "°"
  const maxCelsium = ((max - 32) / 1.8).toFixed(0) + "°"
  const minCelsium = ((min - 32) / 1.8).toFixed(0) + "°"
  const weather = preciptype.charAt(0).toUpperCase() + preciptype.slice(1)
  const nameTag = name.charAt(0).toUpperCase() + name.slice(1)

  headName.innerHTML = nameTag
  headTemp.innerHTML = tempCelsium
  headMax.innerHTML = maxCelsium
  headMin.innerHTML = minCelsium
  headWeather.innerHTML = weather
}

function loadHoursWeather(data) {
  const hours = document.querySelectorAll(".hours-weather")
  console.log(data)

  let i = 0

  hours.forEach(hour => {
    // const clock = document.querySelector(".clock-panel")
    // const weather = document.querySelector(".weather-panel")
    // const temperature = document.querySelector(".temp-panel")
    const datetime = data[i].datetime
    const preciptype = data[i].conditions
    const temp = data[i].temp

    const clock = document.createElement("h5")
    clock.classList.add("clock-panel")
    clock.innerHTML = datetime.charAt(0) + datetime.charAt(1)
    hour.appendChild(clock)

    const weather = document.createElement("h1")
    weather.classList.add("weather-panel")
    weather.innerHTML = preciptype
    hour.appendChild(weather)

    const temperature = document.createElement("h5")
    temperature.classList.add("temp-panel")
    temperature.innerHTML = temp
    hour.appendChild(temperature)

    i++
  })
}

function eventInput() {
  const input = document.querySelector(".input-find-city")
  const btn = document.querySelector(".search-city")

  btn.addEventListener("click", () => {
    console.log("active")
    if (input.value !== "") {
      console.log("active-find")
      getWeatherData(input.value)
      input.value = ""
    }
  })
}

(async () => {
  try {
    await getWeatherData()
    eventInput()
  } catch (err) {
    console.error(err)
  }
})()
