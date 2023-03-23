import { UserContext } from "./App";
import { useContext} from "react";
import Review from "./Review";

function Reviews({reviews, handleRender}) { 

    console.log("sup")

    const [currentUser, setCurrentUser] = useContext(UserContext)

    

    if(reviews.length > 0){

        const displayedReviews = reviews.map((review) => {
            return (
                <Review key={review.id} id={review.id} hotelName={review.hotel.name} reviewText={review.review} review={review} />
            )
        })

        return (
            <div className="reviews">
                <h1>Reviews Page</h1>
                <button onClick={handleRender}>Re-Render</button>
                {displayedReviews}
            </div>
        )

    }else{
        return <h1>Need to make some reviews!</h1>
    }
 
}

export default Reviews;