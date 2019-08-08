window.onload = function () {

    var index = 0;

    // index = setInterval(showData, 10000);
    document.getElementById("next").addEventListener("click", showData);

    function weatherData(val) {

        console.log("Index : " + index);
        return new Promise(function (resolve, reject) {
            const request = new XMLHttpRequest();

            request.onload = function () {
                var resData = JSON.parse(request.responseText);
                console.log(resData);
                resolve(resData);
            };

            request.onerror = function () {
                reject(new Error("404 Data Not Found"));
            };

            request.open("GET", "weather.json", true);
            request.send();
            index++;
        });
    }



    function showData() {
        weatherData("weather.json")
            .then(function (data) {
                console.log(index);
                document.getElementById("city").innerHTML = data.city.name;
                document.getElementById("country").innerHTML =
                    "<label> Country : </label>" + data.city.country +
                    "<br>Coordinates" +
                    "<br><label> Latitude : </label>" + data.city.coord.lat +
                    "<br><label> Longutide : </label>" + data.city.coord.lon +
                    "<br><label> Data Count : </label>" + data.cnt +
                    "<br><label> Cod : </label>" + data.cod;


                document.getElementById("tmp").innerHTML =
                    "<label> Temperature: </label>" + data.list[index].main.temp +
                    "<br><label> Max Temperature : </label>" + data.list[index].main.temp_max +
                    "<br><label> Min Temperature : </label>" + data.list[index].main.temp_min +
                    "<br><label> KF Temperature : </label>" + data.list[index].main.temp_kf +
                    "<br><label> Pressure : </label>" + data.list[index].main.pressure +
                    "<br><label> Sea Level : </label>" + data.list[index].main.sea_level +
                    "<br><label> Ground level : </label>" + data.list[index].main.grnd_level +
                    "<br><label> Humidity : </label>" + data.list[index].main.humidity;


                document.getElementById("wstatus").innerHTML =
                    "<label> Weather ID : </label>" + data.list[index].weather[0].id +
                    "<br><label> Weather : </label>" + data.list[index].weather[0].main +
                    "<br><label> Condition: </label>" + data.list[index].weather[0].description +
                    "<br><label> Icon: </label>" + data.list[index].weather[0].icon;

                document.getElementById('windinfo').innerHTML =
                    "<label> Wind Speed : </label>" + data.list[index].wind.speed + " km/h " +
                    "<br><label> Degree : </label>" + data.list[index].wind.deg;


                document.getElementById('xinfo').innerHTML =
                    "<label> DT : </label>" + data.list[index].dt +
                    "<br><label> Cloud : </label>" + data.list[index].clouds.all +
                    "<br><label> Rain : </label>" + data.list[index].rain +
                    "<br><label> Sys Pod: </label>" + data.list[index].sys.pod +
                    "<br><label> Date/Time: </label>" + data.list[index].dt_txt;


            })
            .catch(function (error) {
                console.log(error);
                alert(" 404 Data not found !!");
            });
    }
};