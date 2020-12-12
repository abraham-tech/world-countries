import Head from 'next/head'
import styles from './styles/Home.module.css'
import Layout from "./components/Layout/Layout"
import SearchInput from "./components/SearchInput/SearchInput"
import CountriesTable from  "./components/CountriesTable/CountriesTable"
import {useState} from "react";

export default function Home(countries) {
  console.log(countries)
  const [keyword, setKeyword] = useState("")

  const filteredCountries = countries.countries.filter((country) => 
  country.name.toLowerCase().includes(keyword) || 
  country.region.toLowerCase().includes(keyword) || 
  country.subregion.toLowerCase().includes(keyword)
  ) 

  const onInputChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  }
  
  return (
    <Layout>
    <dev className={styles.counts}> Found {countries.length} countries</dev>

    <SearchInput 
    placeholder="filter by Name, Region"
    onChange={onInputChange}

    />
    <CountriesTable countries={filteredCountries}/>
   
    </Layout>
  )
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json()

  return {
    props: {
      countries,
    },
  };
};