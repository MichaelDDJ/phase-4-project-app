import ReviewPost from "./ReviewPost";
import { useContext } from "react";
import { CurrentHotelContext, UserContext } from "../Context/Context";

function Hotel({name, address, reviewTotal, id, hotel, hotels, setHotels}) {

  const [currentHotel, setCurrentHotel] = useContext(CurrentHotelContext)
  const [currentUser, setCurrentUser] = useContext(UserContext)

  function handleShowHotel () {
    setCurrentHotel(hotel)
  }

  function handleDelete() {
    fetch(`/hotels/${id}`, { method: "DELETE" }).then((r) => {
      if (r.ok) {
        const newUser = {...currentUser}
        
        const filteredReviews = newUser.reviews.filter((review) => {
          if (review.hotel.id !== id) {
            return review
          }
        })

        newUser.reviews = filteredReviews
        setCurrentUser(newUser)

        const newHotels = hotels.filter((hotelToBeFiltered) => hotelToBeFiltered.id !== id)
        setHotels(newHotels)

        
      }
    });
  }

  return (
    <div className="hotel">
      <h1>{name}</h1>
      <h2>{address}</h2>
      <h3>{reviewTotal ? reviewTotal : '0'} Reviews</h3>
      <button onClick={handleShowHotel} >Show Reviews</button>
      <button onClick={handleDelete}>Delete Hotel</button>
      <ReviewPost hotel_id={id} hotels={hotels} setHotels={setHotels} />
    </div>  
  );
}

export default Hotel