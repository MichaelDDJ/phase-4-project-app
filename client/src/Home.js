import React, { useContext, useEffect, useState} from "react";
import { HotelContext } from "./App";
import Hotel from "./Hotel";
import HotelForm from "./HotelForm";

function Home() {

    
    const [hotels, setHotels] = useContext(HotelContext)

    

    const displayedHotels = hotels.map((hotel) => {
        
        return <Hotel key={hotel.id} id={hotel.id} name={hotel.name} address={hotel.address} reviewTotal={hotel.reviews.length} hotel={hotel} hotels={hotels} setHotels={setHotels} />
    })

    return (
        <div className="home-page">
            <h1>Home Page</h1>
            <HotelForm hotels={hotels} setHotels={setHotels}/>
            {displayedHotels}
        </div>
    );
}

export default Home;