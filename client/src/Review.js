import { useContext, useState } from "react";
import { UserContext, CurrentReviewContext } from "./App";


function Review ({hotelName, reviewText, review, id}) {

    const [currentReview, setCurrentReview] = useContext(CurrentReviewContext)
    const [currentUser, setCurrentUser] = useContext(UserContext)

    function handleSetReview () {
        setCurrentReview(review)
    }

    
    function handleDelete() {
        fetch(`/reviews/${id}`, {method: 'DELETE'})
        .then((r) => {
            if (r.ok) {
                r.json().then((oldReview) => {
                    console.log(oldReview)
                    const newUser = currentUser
                    newUser.reviews = newUser.reviews.filter((reviewToBeFiltered) => reviewToBeFiltered.id != oldReview.id)
                    setCurrentUser(newUser)
                    console.log(currentUser)
                })
            }
        });
    }

    console.log("hello")

    return (
        <div className="review">
            <h2>Review for {hotelName}</h2>
            <button onClick={handleDelete} >Delete</button>
            <p className="reviewPost">{reviewText}</p>
        </div>
    )
}

export default Review