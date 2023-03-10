import React, {useState, useEffect} from "react"
import { useContext } from "react"
import { UserContext, HotelContext } from "./App"

function Review({hotel_id}) {

    const [review, setReview] = useState("")
    const [currentUser, setCurrentUser] = useContext(UserContext)
    const [hotels, setHotels] = useContext(HotelContext)
    const [errors, setErrors] = useState([])
    

    function handleReviewChange(event) {
        setReview(event.target.value)
    }

    function AddReview (review) {
        const newReviews = [...currentUser.reviews, review]
        currentUser.reviews = newReviews
        setCurrentUser(currentUser)

        const newHotels = hotels.map((hotel => {
            if (hotel.id == hotel_id){
                const newReviews = [...hotel.reviews, review]
                hotel.reviews = newReviews
                return hotel
            }else{
                return hotel
            }
        }))
        setHotels(newHotels)
    }


    function handleSubmit(e) {


        e.preventDefault()
        const user_id = currentUser.id
        const content = {
            review,
            user_id,
            hotel_id
        }
        fetch('/reviews',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(content)
        })
        .then(r => {
        if(r.ok) {
            r.json().then(review => AddReview(review))
        }else{
            r.json().then(data => setErrors(data))
        }})
    }
    
    return (
        <>
        {errors == [] ? <></> : <p className="error">{errors.error}</p>}
        <form onSubmit={handleSubmit} className="review">
            <input type="text" placeholder="Review" onChange={handleReviewChange} value={review}/>
            <button>Post</button>
        </form>
        </>
    )
}

export default Review