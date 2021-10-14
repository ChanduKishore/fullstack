

import {useState,useEffect} from 'react';
import axios from 'axios';
import './App.css'
function capitalize(string) {return  (string.length)?string[0].toUpperCase() + string.slice(1):''}

function Note({note,label}){
  return <div><strong>{label}</strong> {note}</div>
}

function Image({src,alt,className}){
 return <img src={src}
             alt={alt}
             className={className}/>
}

function ListElement({name,element}){
  return <li>{name} {element}</li>
  }
  
function LanguageList({languages}){
    return( <>
              <h3>Spoken languages</h3>
              <ul>
                  {languages.map(language=>
                  <ListElement key={language} name={language}/>)}
              </ul>
            </>);
  }
  
function CountriesList({countries,select}){
    return(<ul>
            {countries.map(country=> 
              <ListElement 
              key={country.name.common}
              name={country.name.common}
              element={<button onClick={()=>select(country)}>Show</button>}/>
             
              )}
          </ul>);
  }

function CountryDetails({country}){
  const [weather,setWeather]=useState({temperature:'unknown',
  wind_speed:'unknown',
  wind_dir:'',
  weather_icons:["https://cdn2.iconfinder.com/data/icons/loading-3/100/load06-512.png"],
  weather_descriptions:['unknown']});
  const baseURL='http://api.weatherstack.com/';
  const access_key=process.env.REACT_APP_API_KEY;
  const query=country.name.common;

 useEffect(()=>{
    axios.get(baseURL+'current?access_key='+access_key+'&query='+query)
    .then(response=>
        setWeather(response.data.current))
  },[])
  
  return(<>
  
          <h2>{country.name.common}</h2>
          <Note note={'capital ' +country.capital} />
          <Note note= {'population '+ country.population} />
          <LanguageList languages={Object.values(country.languages)}/>
          <Image  src={country.flags.png}
                  alt={country.name.common +' flag'}
                  className='flagImg'/>

          <h3>Weather in {country.name.common} </h3>
          <Note label='temperature:' note={weather.temperature +' Celcius'}/>
          <Image src={weather.weather_icons[0]}
                  alt={weather.weather_descriptions[0]}
                  className='weathericon'/>
          <Note label='wind:' note={`${weather.wind_speed} mph direction ${weather.wind_dir}`} />

          </>)
}



function FilterCountries({filter,countries,selected,setSelected}){
      
      if(selected!==null)
      {
        return <CountryDetails country={selected}/>
      }

      let countriesFiltered=countries.filter(country=> 
        country.name.common.indexOf(filter)!==-1);
     
      if(countriesFiltered.length===1)
      {
          const country =countriesFiltered[0];
          return (<CountryDetails country={country}/>)
            }
        
      if(!countriesFiltered.length && countries.length!==0)
      {
        return <Note note='no match found'/>
      }

      return (countriesFiltered.length < 10)
        ?<CountriesList  countries={countriesFiltered} select={setSelected}/>
        :(!filter.length)
          ? null
          :<Note note='Too mant matches specify another filter'/>

    
}

export default function App(){
  const url='https://restcountries.com/v3.1/all';
  const [countries,setCountries]=useState([]);
  const [filtered, setFilter]=useState('');
  const [selected,setSelected]=useState(null);


  useEffect(()=>{
    axios.get(url)
    .then(response=>{
      const countriesInfo= response.data;
      setCountries(countriesInfo);
    })
  },[])
  
  function handleFilter(e){
    setFilter(e.target.value);
    setSelected(null)
  }

  return (
          <>
          <input type='text' value={filtered} onChange={handleFilter} placeholder='find country'/>
          <FilterCountries 
            filter={capitalize(filtered)} 
            countries={countries} 
            selected={selected} 
            setSelected={setSelected}/>
            </>);
}