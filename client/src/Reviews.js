import { UserContext } from "./App";
import { useContext, useEffect } from "react";

function Reviews() { 

    const [currentUser, setCurrentUser] = useContext(UserContext)

    if(!currentUser.reviews){
        currentUser.reviews = []
    }
    console.log(currentUser.reviews)

    if(currentUser.reviews.length > 0){

        const displayedReviews = currentUser.reviews.map((review) => {
            return (
            <div className="review" key={review.id}>
                <h2>Review for {review.hotel.name}</h2>
                <h3>{review.review}</h3>
            </div>
            )
        })

        return (
            <div className="reviews">
                <h1>Reviews Page</h1>
                {displayedReviews}
            </div>
        )

    }else{
        return <h1>Need to make some reviews!</h1>
    } 

    
}

export default Reviews;