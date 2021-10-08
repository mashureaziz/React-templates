import React, { useEffect, useState } from 'react';
import ContentWrapper from '../../Components/Content/ContentWrapper';
import { countries } from './MultiInputData';

const MultiInput = (props) => {

    const initialState = {
        countries: countries,
        states: [],
        cities: [],
        areas: [],
        selectedCountry: 'Select Your Country',
        selectedState: 'Select Your State',
        selectedCity: 'Select Your City',
        selectedArea: 'Select Your Area'

    }

    const [state, setState] = useState(initialState);
    const [isLoadingCountry, setisLoadingCountry] = useState(true);

    function handleCountryChange(e) {
        const selectedCountry = e.target.value;
        const states = state.countries.find(country => country.name === selectedCountry).states;

        setState((prev) => {
            return { ...prev, selectedCountry, states,cities:[],areas:[],selectedArea: "Select your area", selectedCity: "Select your city"}
        })
    }

    function handleStateChange(e) {
        const selectedState = e.target.value;
        const cities = state.countries.find(country => country.name === state.selectedCountry).states.find(state => state.name === selectedState).cities;

        setState((prev) => {
            return { ...prev, selectedState, cities,areas:[],selectedArea:'Select Your Area' }
        })
    }

    function handleCityChange(e) {
        const selectedCity = e.target.value;
        const areas = state.countries.find(country => country.name === state.selectedCountry).states.find(stateItem => stateItem.name === state.selectedState).cities.find(city => city.name === selectedCity).Areas;

        setState((prev) => {
            return { ...prev, selectedCity, areas }
        })
    }
    function handleAreaChange(e) {
        const selectedArea = e.target.value;
        setState((prev) => {
            return { ...prev, selectedArea }
        })

    }

    const renderedCountries = state.countries.map((val, key) => {
        return (<option key={key}>{val}</option>)
    });

    const renderedStates = state.states.map((val, key) => {
        return (<option key={key}>{val.name}</option>)
    });

    const renderedCities = state.cities.map((val, key) => {
        return (<option key={key}>{val.name}</option>)
    });
    const renderedAreas = state.areas.map((val, key) => {
        return (<option key={key}>{val}</option>)
    });

    useEffect(() => {
        async function sendRequest() {
            const response = await fetch("https://wft-geo-db.p.rapidapi.com/v1/geo/countries?limit=10", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
                    "x-rapidapi-key": "aa76817ef2msh3879b385f3d5a0cp1e6541jsna6d199362056"
                }
            })
            const data = await response.json();
            const countryInfo = data.data;
            const countries = countryInfo.map(element => element.name);
            
            setState((prev) => {return {...prev, countries}});
            setisLoadingCountry(false);
        }
        sendRequest();
    },[])

    
    return (
        <ContentWrapper>
            <div className="select-wrapper">
                <select id="Country" onChange={handleCountryChange} value = {state.selectedCountry} >
                <option hidden> {isLoadingCountry ? "Loading" :  "Select Your country"}</option>
                    {!isLoadingCountry && renderedCountries}
                </select>
                <select id="State" onChange={handleStateChange}  value = {state.selectedState}>
                    <option hidden> Select Your State</option>
                    {renderedStates}
                </select>
                <select id="City" onChange={handleCityChange} value = {state.selectedCity} >
                    <option hidden> Select Your City</option>
                    {renderedCities}
                </select>
                <select id="Area" onChange={handleAreaChange} value = {state.selectedArea}>
                    <option hidden> Select Your Area </option>
                    {renderedAreas}
                </select>
            </div>
        </ContentWrapper>
    )
}

export default MultiInput;