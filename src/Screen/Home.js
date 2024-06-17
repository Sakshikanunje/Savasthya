import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Hero from "../Components/Hero";
import Info from "../Components/Info";
import About from "../Components/About";
import Doctor from '../Components/Doctor';
import './Home.css';



export default function Home() {
  return (
    <>
    <div className='home'>
    <Navbar/>
    <Hero />
      <Info />
      <Doctor/>
      <About/>
    
    <Footer/>
    </div>
    </>
  )
}
