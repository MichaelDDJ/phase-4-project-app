import { UserContext } from "./App";
import { useContext, useEffect } from "react";

function Reviews() { 

    const [currentUser, setCurrentUser] = useContext(UserContext)
    useEffect(() => {
        fetch('/user_reviews')
        .then(r => r.json())
        .then(data => AddReviews(data))  
    },[])

    function AddReviews (userReviews) {
        currentUser.reviews = userReviews
    }

    if(currentUser.reviews.length > 0){

        const displayedReviews = currentUser.reviews.map((review) => {
            return (
            <div className="review" key={review.id}>
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