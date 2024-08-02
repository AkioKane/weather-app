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

  loadHead(name, temp, max, min, weather)

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
