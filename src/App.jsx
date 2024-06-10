import { useState, useEffect } from 'react';
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all")
      .then(response => setCountries(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCountries(filtered);
    if (filtered.length === 1) {
      setSelectedCountry(filtered[0]);
    } else {
      setSelectedCountry(null);
    }
  };

  const handleOptionClick = (country) => {
    setSearchTerm(country.name.common);
    setFilteredCountries([]);
    setSelectedCountry(country);
  };

  return (
    <div>
      <h1>List of Countries</h1>
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          placeholder="Search for a country"
          value={searchTerm}
          onChange={handleChange}
        />
        {filteredCountries.length > 1 && searchTerm !== '' && (
          <ul style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: 'white', border: '1px solid gray', zIndex: 1 }}>
            {filteredCountries.map(country => (
              <li key={country.cca2} onClick={() => handleOptionClick(country)}>
                {country.name.common}
              </li>
            ))}
          </ul>
        )}
      </div>
      {selectedCountry && (
        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>
          <h2>{selectedCountry.name.common}</h2>
          <p>Capital: {selectedCountry.capital}</p>
          <img src={selectedCountry.flags.png} alt="Country Flag" style={{ width: '200px', height: 'auto' }} />
        </div>
      )}
    </div>
  );
}

export default App;
