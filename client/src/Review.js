import { useContext } from "react";
import { UserContext, CurrentReviewContext } from "./App";


function Review ({hotel, reviewText, id, review}) {

    const [currentUser, setCurrentUser] = useContext(UserContext)
    const [currentReview, setCurrentReview] = useContext(CurrentReviewContext)

    
    function handleDelete() {
        fetch(`/reviews/${id}`, {method: 'DELETE'})
        .then((r) => {
            if (r.ok) {
                r.json().then((oldReview) => {
                    const newUser = {...currentUser}
                    newUser.reviews = newUser.reviews.filter((reviewToBeFiltered) => reviewToBeFiltered.id != oldReview.id)
                    setCurrentUser(newUser)
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