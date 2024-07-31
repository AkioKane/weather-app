async function getWeatherData(location="london", date1, date2) {
  const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=2YNM5FU77T2A8AGV4NNP2Z9T2`, {mode: "cors"})
  const data = await response.json()
  return await getDayInfo(data)
}

async function getDayInfo(data, num=0) {
  const day = data.days[num]
  return console.log("List days", day)
}

getWeatherData()