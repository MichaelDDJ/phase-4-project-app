import { useContext } from "react";
import { UserContext, CurrentReviewContext, HotelContext } from "../Context/Context";


function Review ({hotel, reviewText, id, review}) {

    const [currentUser, setCurrentUser] = useContext(UserContext)
    const [currentReview, setCurrentReview] = useContext(CurrentReviewContext)
    const [hotels, setHotels] = useContext(HotelContext)
    
    function handleDelete() {
        fetch(`/reviews/${id}`, {method: 'DELETE'})
        .then((r) => {
            if (r.ok) {
                r.json().then((oldReview) => {
    
                    const newUser = {...currentUser}
                    newUser.reviews = newUser.reviews.filter((reviewToBeFiltered) => reviewToBeFiltered.id != oldReview.id)
                    setCurrentUser(newUser)
                    
                    //get hotels
                    const newHotels = [...hotels]
                    //filter for correct hotel to change
                    let newHotel = newHotels.find((hotelToBeFiltered) => hotelToBeFiltered.id == hotel.id)
                    //filter out the oldReview
                    newHotel.reviews = newHotel.reviews.filter((reviewToBeFiltered) => reviewToBeFiltered.id != oldReview.id)
                    //place new hotel back into hotels
                    const filteredHotels = newHotels.map((hotel) => {
                        if(hotel.id == newHotel.id) {
                            return newHotel
                        }else{
                            return hotel
                        }
                    })
                    //update state
                    setHotels(filteredHotels)
                })
            }
        });
    }

    function showReviewEdit(){
        setCurrentReview(review)
    }
    

    return (
        <div className="review">
            <h2>Review for {hotel.name}</h2>
            <button onClick={handleDelete} >Delete</button>
            <button onClick={showReviewEdit} >Edit</button>
            <p className="reviewPost">{reviewText}</p>
        </div>
    )
}

export default Review