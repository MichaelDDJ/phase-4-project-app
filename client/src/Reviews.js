import { UserContext } from "./App";
import { useContext } from "react";

function Reviews() { 

    const [currentUser, setCurrentUser] = useContext(UserContext)
    
    
    if(currentUser){
        const displayedReviews = currentUser.reviews.map((review) => {
            console.log(review)
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
        return <h1>Please go to Login</h1>
    } 

    
}

export default Reviews;