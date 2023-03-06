import React, {useContext} from "react";
import { HotelContext } from "./App";
import Hotel from "./Hotel";

function Home() {

    const [hotels, setHotels] = useContext(HotelContext)

    const displayedHotels = hotels.map((hotel) => {
        return <Hotel key={hotel.id} name={hotel.name} address={hotel.address} reviewTotal={hotel.reviews.length} />
    })

    return (
        <div className="home-page">
            <h1>Home Page</h1>
            {displayedHotels}
        </div>
    );
}

export default Home;