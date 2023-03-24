import ReviewPost from "./ReviewPost";
import { useContext } from "react";
import { CurrentHotelContext } from "./App";

function Hotel({name, address, reviewTotal, id, hotel, hotels, setHotels}) {

  const [currentHotel, setCurrentHotel] = useContext(CurrentHotelContext)

  function handleShowHotel () {
    setCurrentHotel(hotel)
  }

    return (
      <div className="hotel">
        <h1>{name}</h1>
        <h2>{address}</h2>
        <h3>{reviewTotal ? reviewTotal : '0'} Reviews</h3>
        <button onClick={handleShowHotel} >Show Reviews</button>
        <ReviewPost hotel_id={id} hotels={hotels} setHotels={setHotels} />
      </div>  
    );
}

export default Hotel