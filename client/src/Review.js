import React, {useState} from "react"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext, HotelContext, ErrorsContext } from "./App"

function Review({hotel_id}) {

    const [review, setReview] = useState("")
    const [currentUser, setCurrentUser] = useContext(UserContext)
    const [hotels, setHotels] = useContext(HotelContext)
    const [errors, setErrors] = useContext(ErrorsContext)
    const navigate = useNavigate()

    function handleReviewChange(event) {
        setReview(event.target.value)
    }


    function handleSubmit(e) {

        e.preventDefault()
        if(currentUser) {
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
                r.json().then(review => console.log(review))
                navigate("/")
            }else {
                r.json().then((errorMessage) => setErrors(errorMessage))
            }
            })
        }
    }
    
    return (
        <form onSubmit={handleSubmit} className="review">
            <input type="text" placeholder="Review" onChange={handleReviewChange} value={review}/>
            <button>Post</button>
        </form>
    )
}

export default Review