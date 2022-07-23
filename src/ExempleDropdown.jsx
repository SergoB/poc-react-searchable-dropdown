import React from "react";
import ReactCountryFlag from "react-country-flag"
import './ExempleDropdown.css';

class ExempleDropdown extends React.Component {

  countries = [
    {name:"France", countryCode:"FR"},
    {name:"Espagne", countryCode:"ES"},
    {name:"Allemagne", countryCode:"DE"},
    {name:"Suisse", countryCode:"CH"},
    {name:"Luxembourg", countryCode:"LU"},
    {name:"Belgique", countryCode:"BE"},
  ];

  constructor(props) {
    super(props);
    this.state = {
      countriesDisplayed: this.countries,
      inputValue: '',
      isDropdownDisplayed: false
    }
    this.filterCountries =this.filterCountries.bind(this);
    this.handleOptionClick =this.handleOptionClick.bind(this);
    this.toggleDropdown =this.toggleDropdown.bind(this);
    this.hideDropdown =this.hideDropdown.bind(this);
  }


  filterCountries(event) {
    this.setState({
      isDropdownDisplayed: true
    })
    let filteredCountries = [];
    const input = event.target.value;

    if (!input) {
      filteredCountries = this.countries;
    } else {
      filteredCountries = this.countries.filter(country => country.name.toLowerCase().includes(input.toLowerCase()));
    }
    this.setState({
      countriesDisplayed: filteredCountries,
      inputValue: input
    })
  }

  toggleDropdown() {
    console.log("toggle Dropdown");
    this.setState({
      isDropdownDisplayed: !this.state.isDropdownDisplayed
    })
  }

  hideDropdown() {
    console.log("hideDropdown");
    this.setState({
      isDropdownDisplayed: false
    })
  }

  handleOptionClick(e) {
    const countryName = e.target.getAttribute("value");
    this.setState({
      inputValue:countryName
    })
    console.log("click and hideDropdown");
    this.hideDropdown();
  }
  
  renderCountries() {
    if (this.state.isDropdownDisplayed) {
      const countryList = [];

      this.state.countriesDisplayed.forEach(country => {
        const countryDiv = (
          
          <div key={country.countryCode} className="option" value={country.name} onClick={this.handleOptionClick}>
            <span>
              <ReactCountryFlag countryCode={country.countryCode} svg/>
            </span> &nbsp;
            {country.name}
          </div>
        );
        countryList.push(countryDiv);
      });
      return (
        <div className="dropdownOptions">
          {countryList}
        </div>
      );
    }
  }

  render() {
    const placeHolder = "Select a country";
    return (
      <div className="dropdownWrapper">
          <div className="inputFilter">
            <input 
              type="text"
              onChange={this.filterCountries}
              onClick={this.toggleDropdown}
              value= {this.state.inputValue}
              placeholder={placeHolder}
            />
            <span className="dropdownArrow"></span>
          </div>
          {this.renderCountries()}
      </div>
    );
  }
}

export default ExempleDropdown;
