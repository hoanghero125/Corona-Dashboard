import React from "react";
import Axios from "axios";
import "./style.css"; 

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.getCountryData = this.getCountryData.bind(this); 
    }

    state = {
        confirmed: 0,
        recovered: 0,
        deaths: 0,
        countries: [],
        rawCountriesData: []
    }

    componentDidMount() {
        this.getData();
}

    async getData () {
        const resApi = await Axios.get("https://covid19.mathdro.id/api");
        const resCountries = await Axios.get("https://covid19.mathdro.id/api/countries");
        const countries = [];
        for ( let i = 0; i < resCountries.data.countries.length ; i++){
            countries.push(resCountries.data.countries[i].name);
        }
        console.log(resCountries);
        console.log(countries)
        this.setState({
            confirmed: resApi.data.confirmed.value,
            recovered: resApi.data.recovered.value,
            deaths: resApi.data.deaths.value,   
            countries, 
            rawCountriesData : resCountries.data.countries
        }); 
}

    async getCountryData(e) {
        let countriesCode = ""
        for ( let i =-0; i< this.state.countries.length; i ++){
            if ( this.state.countries[i] === e.target.value){
                //lay ra duoc index can thiet
                // truy cap vao rawData 
                countriesCode = this.state.rawCountriesData[i].iso2;
                console.log(countriesCode)
            }
        }
        const res = await Axios.get(`https://covid19.mathdro.id/api/countries/${countriesCode}`);
        this.setState({
            confirmed: res.data.confirmed.value,
            recovered: res.data.recovered.value,
            deaths: res.data.deaths.value, 
        }) 
    }

    renderCountryOptions() {
        return this.state.countries.map((country, i) => {
            return <option key={i}>{country}</option>
        });
    }

    render() {
         return (
        <div className="container">
            <h1>Corona update</h1>
            <select onChange={this.getCountryData}>
                {this.renderCountryOptions()}
            </select>


            <div className="flex">
                <div className="box confirmed">
                    <h3>Sỗ ca nhiễm</h3>
                    <h4>{this.state.confirmed}</h4>
                </div>
                <div className="box recovered">
                    <h3>Sỗ ca đã khỏi</h3>
                    <h4>{this.state.recovered}</h4>
                </div>
                <div className="box deaths">
                    <h3>Số ca chết</h3>
                    <h4>{this.state.deaths}</h4>
                </div>
            </div>

        </div>);
     }
}