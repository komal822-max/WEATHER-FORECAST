document.addEventListener("DOMContentLoaded", function () {
  const celsiusBtn = document.getElementById("celsiusBtn");
  const fahrenheitBtn = document.getElementById("fahrenheitBtn");
  let isCelsius = true;

  function toggleTemperatureUnit() {
    isCelsius = !isCelsius;

    if (isCelsius) {
      celsiusBtn.classList.add("active");
      fahrenheitBtn.classList.remove("active");
    } else {
      fahrenheitBtn.classList.add("active");
      celsiusBtn.classList.remove("active");
    }

    updateTemperatureDisplay();
  }

  function updateTemperatureDisplay() {
    const currentTemp = document.getElementById("currentTemp");
    const feelsLike = document.getElementById("feelsLike");

    if (isCelsius) {
      currentTemp.textContent = "22°";
      feelsLike.textContent = "25°";
    } else {
      currentTemp.textContent = "72°";
      feelsLike.textContent = "77°";
    }
  }

  celsiusBtn.addEventListener("click", () => {
    if (!isCelsius) toggleTemperatureUnit();
  });

  fahrenheitBtn.addEventListener("click", () => {
    if (isCelsius) toggleTemperatureUnit();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const searchSuggestions = document.getElementById("searchSuggestions");
  const locationBtn = document.getElementById("locationBtn");

  const mockCities = [
    "New York, NY",
    "Los Angeles, CA",
    "Chicago, IL",
    "Houston, TX",
    "Phoenix, AZ",
    "Philadelphia, PA",
    "San Antonio, TX",
    "San Diego, CA",
    "Dallas, TX",
    "San Jose, CA",
    "Austin, TX",
    "Jacksonville, FL",
    "London, UK",
    "Paris, France",
    "Tokyo, Japan",
    "Sydney, Australia",
  ];

  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase().trim();

    if (query.length === 0) {
      searchSuggestions.classList.add("hidden");
      return;
    }

    const filteredCities = mockCities
      .filter((city) => city.toLowerCase().includes(query))
      .slice(0, 5);

    if (filteredCities.length > 0) {
      searchSuggestions.innerHTML = filteredCities
        .map(
          (city) =>
            `<div class="px-4 py-2 hover:bg-white/20 cursor-pointer transition-colors border-b border-white/10 last:border-b-0" data-city="${city}">${city}</div>`
        )
        .join("");
      searchSuggestions.classList.remove("hidden");
    } else {
      searchSuggestions.classList.add("hidden");
    }
  });

  searchSuggestions.addEventListener("click", function (e) {
    if (e.target.dataset.city) {
      searchInput.value = e.target.dataset.city;
      searchSuggestions.classList.add("hidden");
      updateWeatherData(e.target.dataset.city);
    }
  });

  locationBtn.addEventListener("click", function () {
    if (navigator.geolocation) {
      showLoading();
      navigator.geolocation.getCurrentPosition(
        (position) => {
          hideLoading();
          updateWeatherData("Current Location");
        },
        (error) => {
          hideLoading();
          alert("Unable to get your location. Please search manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  });

  document.addEventListener("click", function (e) {
    if (
      !searchInput.contains(e.target) &&
      !searchSuggestions.contains(e.target)
    ) {
      searchSuggestions.classList.add("hidden");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  function updateWeatherData(location) {
    showLoading();

    setTimeout(() => {
      document.getElementById("currentLocation").textContent = location;
      populateHourlyForecast();
      populateWeeklyForecast();
      updateTemperatureChart();
      hideLoading();
    }, 1000);
  }

  function populateHourlyForecast() {
    const hourlyContainer = document.getElementById("hourlyForecast");
    const hours = [];
    const now = new Date();

    for (let i = 0; i < 24; i++) {
      const time = new Date(now.getTime() + i * 60 * 60 * 1000);
      const hour = time.getHours();
      const temp = 22 + Math.sin(i * 0.3) * 5;
      const icons = [
        "ri-sun-line",
        "ri-cloudy-line",
        "ri-cloudy-2-line",
        "ri-rainy-line",
      ];
      const icon = icons[Math.floor(Math.random() * icons.length)];

      hours.push(`
                        <div class="glass-effect rounded-xl p-4 text-center min-w-[80px] weather-card">
                            <p class="text-sm text-white/70 mb-2">${
                              hour === 0
                                ? "12 AM"
                                : hour <= 12
                                ? hour + " AM"
                                : hour - 12 + " PM"
                            }</p>
                            <div class="w-8 h-8 flex items-center justify-center mx-auto mb-2">
                                <i class="${icon} text-2xl"></i>
                            </div>
                            <p class="font-semibold">${Math.round(temp)}°</p>
                            <p class="text-xs text-white/60 mt-1">${Math.floor(
                              Math.random() * 30
                            )}%</p>
                        </div>
                    `);
    }

    hourlyContainer.innerHTML = hours.join("");
  }

  function populateWeeklyForecast() {
    const weeklyContainer = document.getElementById("weeklyForecast");
    const days = [
      "Today",
      "Tomorrow",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const conditions = [
      "Sunny",
      "Partly Cloudy",
      "Cloudy",
      "Light Rain",
      "Thunderstorms",
    ];
    const icons = [
      "ri-sun-line",
      "ri-cloudy-line",
      "ri-cloudy-2-line",
      "ri-rainy-line",
      "ri-thunderstorms-line",
    ];

    const weeklyCards = days
      .map((day, index) => {
        const high = 25 + Math.floor(Math.random() * 10);
        const low = high - 8 - Math.floor(Math.random() * 5);
        const conditionIndex = Math.floor(Math.random() * conditions.length);

        return `
                        <div class="glass-effect rounded-xl p-4 flex items-center justify-between weather-card">
                            <div class="flex items-center gap-4">
                                <div class="w-10 h-10 flex items-center justify-center">
                                    <i class="${
                                      icons[conditionIndex]
                                    } text-2xl"></i>
                                </div>
                                <div>
                                    <p class="font-semibold">${day}</p>
                                    <p class="text-sm text-white/70">${
                                      conditions[conditionIndex]
                                    }</p>
                                </div>
                            </div>
                            <div class="text-right">
                                <p class="font-semibold">${high}° / ${low}°</p>
                                <p class="text-sm text-white/70">${Math.floor(
                                  Math.random() * 40
                                )}% rain</p>
                            </div>
                        </div>
                    `;
      })
      .join("");

    weeklyContainer.innerHTML = weeklyCards;
  }

  function updateTemperatureChart() {
    const chartDom = document.getElementById("temperatureChart");
    const myChart = echarts.init(chartDom);

    const hours = [];
    const temperatures = [];
    const now = new Date();

    for (let i = 0; i < 24; i++) {
      const time = new Date(now.getTime() + i * 60 * 60 * 1000);
      hours.push(time.getHours() + ":00");
      temperatures.push(22 + Math.sin(i * 0.3) * 5 + Math.random() * 2);
    }

    const option = {
      animation: false,
      grid: { top: 0, right: 0, bottom: 0, left: 0 },
      xAxis: {
        type: "category",
        data: hours,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: "#ffffff",
          fontSize: 12,
          interval: 3,
        },
      },
      yAxis: {
        type: "value",
        show: false,
      },
      series: [
        {
          data: temperatures,
          type: "line",
          smooth: true,
          symbol: "none",
          lineStyle: {
            color: "#ffffff",
            width: 3,
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: "rgba(255, 255, 255, 0.3)" },
                { offset: 1, color: "rgba(255, 255, 255, 0.05)" },
              ],
            },
          },
        },
      ],
      tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        textStyle: { color: "#1f2937" },
        formatter: function (params) {
          return `${params[0].name}<br/>Temperature: ${Math.round(
            params[0].value
          )}°C`;
        },
      },
    };

    myChart.setOption(option);

    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }
  function showLoading() {
    document.getElementById("loadingState").classList.remove("hidden");
  }
  function hideLoading() {
    document.getElementById("loadingState").classList.add("hidden");
  }
  window.updateWeatherData = updateWeatherData;
  window.showLoading = showLoading;
  window.hideLoading = hideLoading;
  populateHourlyForecast();
  populateWeeklyForecast();
  updateTemperatureChart();
});
document.addEventListener("DOMContentLoaded", function () {
  const toggleDetails = document.getElementById("toggleDetails");
  const detailsContent = document.getElementById("detailsContent");
  const toggleIcon = document.getElementById("toggleIcon");
  const refreshBtn = document.getElementById("refreshBtn");

  toggleDetails.addEventListener("click", function () {
    const isHidden = detailsContent.classList.contains("hidden");

    if (isHidden) {
      detailsContent.classList.remove("hidden");
      toggleIcon.style.transform = "rotate(180deg)";
    } else {
      detailsContent.classList.add("hidden");
      toggleIcon.style.transform = "rotate(0deg)";
    }
  });

  refreshBtn.addEventListener("click", function () {
    const icon = refreshBtn.querySelector("i");
    icon.style.animation = "spin 1s linear";

    showLoading();

    setTimeout(() => {
      hideLoading();
      icon.style.animation = "";

      const temps = [20, 21, 22, 23, 24, 25];
      const randomTemp = temps[Math.floor(Math.random() * temps.length)];
      document.getElementById("currentTemp").textContent = randomTemp + "°";
      document.getElementById("feelsLike").textContent = randomTemp + 3 + "°";

      const humidityValues = [55, 60, 65, 70, 75];
      document.getElementById("humidity").textContent =
        humidityValues[Math.floor(Math.random() * humidityValues.length)] + "%";

      updateWeatherData(document.getElementById("currentLocation").textContent);
    }, 1500);
  });
});
