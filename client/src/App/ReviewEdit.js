import { useContext, useEffect, useState } from "react"


function ReviewEdit ({currentUser, setCurrentUser, currentReview, setCurrentReview}) {

    const [review, setReview] = useState("")
    
    useEffect(() => {
        setReview(currentReview.review)
    },[])
    
    function handleReviewChange(event) {
        setReview(event.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        
        fetch(`/reviews/${currentReview.id}`, {
            method: 'PATCH',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({review: review})
        })
        .then(r => r.json())
        .then(review => {
            console.log(currentUser)
            const newUser = {...currentUser}
            const newReviews = newUser.reviews.map((reviewToBeFiltered) => {
                if (reviewToBeFiltered.id === review.id) {
                    return review
                }else {
                    return reviewToBeFiltered
                }
            })

            newUser.reviews = newReviews
            setCurrentUser(newUser)
        })
        
        setCurrentReview("")

    }

    return(
        <form onSubmit={handleSubmit} >
            <h1>Review for {currentReview.hotel.name}</h1>
            <button>Submit Edit</button>
            <textarea onChange={handleReviewChange} value={review}/>
        </form>
    )
}

export default ReviewEdit