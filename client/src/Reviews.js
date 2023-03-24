import { UserContext } from "./App";
import { useContext} from "react";
import Review from "./Review";

function Reviews() { 

    

    const [currentUser, setCurrentUser] = useContext(UserContext)


    if(currentUser.reviews.length > 0){

        const displayedReviews = currentUser.reviews.map((review) => {
            return (
                <Review key={review.id} id={review.id} hotel={review.hotel} reviewText={review.review} review={review} />
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