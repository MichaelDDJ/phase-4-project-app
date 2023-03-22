import { useContext, useState } from "react";
import { UserContext } from "./App";

function Review ({hotelName, review, id}) {

    const [currentUser, setCurrentUser] = useContext(UserContext)

    
    function handleDelete() {
        fetch(`/reviews/${id}`, {method: 'DELETE'})
        .then((r) => {
            if (r.ok) {
                r.json().then((oldReview) => {
                    const newReviews = currentUser.reviews.filter((reviewToBeFiltered) => reviewToBeFiltered.id != oldReview.id)
                    currentUser.reviews = newReviews
                    setCurrentUser(currentUser)
                    
                })
            }
        });
    }

    return (
        <div className="review">
            <h2>Review for {hotelName}</h2>
            <button onClick={handleDelete} >Delete</button>
            <button>Edit</button>
            <p className="reviewPost">{review}</p>
        </div>
    )
}

export default Review