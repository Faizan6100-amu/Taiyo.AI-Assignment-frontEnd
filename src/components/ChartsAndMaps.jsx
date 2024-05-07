import React, { useEffect, useState } from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Chart from "chart.js/auto";
import "leaflet/dist/leaflet.css";
import "../Css/ChartsAndMaps.css";

// ----------------------API --------------------
const fetchChartData = async () => {
  return await axios.get(
    "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
  );
};

//----------------creating objects ----------------
const ChartsAndMaps = () => {
  const [chartData, setChartData] = useState({});
  const [countryData, setCountryData] = useState([]);
  const [windwindth, setWindwidth] = useState({ wid: window.innerWidth });

  const fetchCountryData = async () => {
    const res = await axios.get("https://disease.sh/v3/covid-19/countries");
    const data = res.data;

    const countryData = data.map((country) => ({
      name: country.country,
      lat: country.countryInfo.lat,
      long: country.countryInfo.long,
      active: country.active,
      recovered: country.recovered,
      deaths: country.deaths,
    }));

    setCountryData(countryData);
  };

  useEffect(() => {
    fetchChartData().then((res) =>
      setChartData({
        labels: Object.keys(res.data.cases),
        datasets: [
          {
            label: "COVID-19 Cases",
            data: Object.values(res.data.cases),
            backgroundColor: "red",
          },
        ],
      })
    );
    fetchCountryData();
  }, []);

  useEffect(() => {
    const chartConfig = {
      type: "line",
      data: chartData,
    };

    const myChart = new Chart(document.getElementById("myChart"), chartConfig);
    return () => {
      myChart.destroy();
    };
  }, [chartData]);

  //-----------returning below components------------
  return (
    <div>
      <Heading color={"white"} p={"10px 20px"} m={"0px"} bg={"rgb(136 19 55)"}>
        Charts and Maps
      </Heading>
      <div id="charts_page_div">
        {window.innerWidth > 900 ? (
          <Box
            padding={"10px"}
            w={"19%"}
            boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
            bg={"rgb(226 232 240)"}
          >
            <Box>
              <Link
                style={{
                  textDecoration: "none",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
                to="/"
              >
                <button>Contacts</button>
              </Link>
            </Box>
            <br />
            <br />
            <Box>
              <Link
                style={{
                  textDecoration: "none",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
                to="/chartsandmaps"
              >
                <button>Charts & Maps</button>
              </Link>
            </Box>
          </Box>
        ) : (
          <Flex
            justifyContent={"space-evenly"}
            w={"100%"}
            margin={"auto"}
            marginBottom={"20px"}
            p={"10px 0px"}
            boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
          >
            <Box>
              <Link
                style={{
                  textDecoration: "none",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
                to="/"
              >
                Contacts
              </Link>
            </Box>
            <Box>
              <Link
                style={{
                  textDecoration: "none",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
                to="/chartsandmaps"
              >
                Charts & Maps
              </Link>
            </Box>
          </Flex>
        )}
        <Box
          padding={"30px"}
          margin={"auto"}
          w={"79%"}
          boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
          border={"1px solid gray"}
          bg={"rgb(241 245 249)"}
        >
          <Heading>COVID-19 Dashboard</Heading>
          <Box>
            {window.innerWidth > 900 ? (
              <canvas id="myChart" width="800" height="300"></canvas>
            ) : (
              <canvas id="myChart" width="400" height="300"></canvas>
            )}
          </Box>
          <br />
          <br />
          <Box>
            <MapContainer center={[0, 0]} zoom={2}>
              <TileLayer url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=NLe8DG6CVIhkI4PpAXR1" />
              {countryData.map((country) => (
                <Marker
                  key={country.name}
                  position={[country.lat, country.long]}
                >
                  <Popup>
                    <h4>Name: {country.name}</h4>
                    <p>Active Cases: {country.active}</p>
                    <p>Recovered Cases: {country.recovered}</p>
                    <p>Deaths: {country.deaths}</p>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </Box>
        </Box>
      </div>
      <footer>
        <Heading
          color={"white"}
          p={"10px 10px"}
          m={"0px"}
          bg={"rgb(8 51 68)"}
          fontSize={"medium"}
        >
          Made with ❤️ by Faizan@Khan
        </Heading>
      </footer>
    </div>
  );
};

export default ChartsAndMaps;
