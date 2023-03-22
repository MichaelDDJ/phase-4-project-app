import { UserContext } from "./App";
import { useContext} from "react";
import Review from "./Review";

function Reviews({reviews}) { 

    
    

    if(reviews.length > 0){

        const displayedReviews = reviews.map((review) => {
            return (
                <Review key={review.id} id={review.id} hotelName={review.hotel.name} review={review.review} />
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