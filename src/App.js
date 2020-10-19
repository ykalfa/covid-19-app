import React, { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core';

import './App.css';
import './InfoBox/InfoBox.css'
import InfoBox from './InfoBox/InfoBox';
import Map from './Map/Map';
import Table from './Table/Table';
import LineGraph from './LineGraph';
import Logo from './Logo/Logo'
import { sortData, prettyPrintStat } from './util';

function App() {

  const [countries, setCountries] = useState([]);
  const [choosenCountry, setChoosenCountry] = useState('worldwid');
  const [infoCountry, setInfoCountry] = useState({});
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  //israel: lat: 31.771959, lng: 35.217018
  const [zoom, setZoom] = useState(3)
  const [mapCountries, setMapCountries] = useState([])
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setInfoCountry(data);
      }).catch(err => console.log(err))
  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then(response => response.json())
        .then(data => {
          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso2
            }
          ))
          setMapCountries(data)
          setCountries(countries);
          setTableData(sortData(data));
        }).catch(err => console.log(err))
    }
    getCountriesData();
  }, [])

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setChoosenCountry(countryCode);
    const url = countryCode === "worldwid" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log("DATA", data)
        setInfoCountry(data);
        if (countryCode === "worldwid") {
          setMapCenter({ lat: 34.80746, lng: -40.4796 })
          setZoom(2)
        } else {
          setMapCenter([data.countryInfo.lat, data.countryInfo.long])
          setZoom(4)
        }
      })

  }

  return (
    <div className="app">
      <div className="app__left">
        < div className="app__header">
          <Logo />
          <h1> Covid 19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={choosenCountry} >
              <MenuItem value="worldwid">Worldwid</MenuItem>
              {countries.map((country, i) => {
                return <MenuItem key={i} value={country.value}>{country.name}</MenuItem>
              })}
            </Select>
          </FormControl>
        </div>
        <div className="app__infobox">
          <InfoBox
            isRed="true"
            active={casesType === "cases"}
            title="Coronavirus cases"
            cases={infoCountry.todayCases < 1000 ? infoCountry.todayCases : prettyPrintStat(infoCountry.todayCases)}
            total={prettyPrintStat(infoCountry.cases)}
            onClick={(e) => setCasesType("cases")} />
          <InfoBox
            active={casesType === "recovered"}
            title="Recovered"
            cases={infoCountry.todayRecovered < 1000 ? infoCountry.todayRecovered : prettyPrintStat(infoCountry.todayRecovered)}
            total={prettyPrintStat(infoCountry.recovered)}
            onClick={(e) => setCasesType("recovered")} />
          <InfoBox
            isRed="true"
            active={casesType === "deaths"}
            title="Deaths"
            cases={infoCountry.todayDeaths < 1000 ? infoCountry.todayDeaths : prettyPrintStat(infoCountry.todayDeaths)}
            total={prettyPrintStat(infoCountry.deaths)}
            onClick={(e) => setCasesType("deaths")} />
        </div>
        <Map center={mapCenter} zoom={zoom} countries={mapCountries} casesType={casesType} className="map" />
      </div>


      <Card className="app__rigth" >
        <CardContent>
          <div className="app__information">
            <h3>Live cases by country</h3>
            <Table countries={tableData} />
            <h3>Worldwid new {casesType}</h3>
            <LineGraph className="app__graph" casesType={casesType} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;