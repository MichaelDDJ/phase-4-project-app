import React, {useContext, useEffect, useState} from "react";
import Hotel from "./Hotel";
import HotelForm from "./HotelForm";

function Home() {

    useEffect(() => {
        fetch('/hotels')
        .then(r => r.json())
        .then(hotels => setHotels(hotels))
      },[])

    console.log("Hotel")
    const [hotels, setHotels] = useState([])

    const displayedHotels = hotels.map((hotel) => {
        
        return <Hotel key={hotel.id} id={hotel.id} name={hotel.name} address={hotel.address} reviewTotal={hotel.reviews.length} hotel={hotel} hotels={hotels} setHotels={setHotels}/>
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