import React, {useState} from "react"

function Review() {

    const [review, setReview] = useState("")

    function handleReviewChange(event) {
        setReview(event.target.value)
    }

    function handleSubmit() {

        fetch('/reviews',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(review)
        })
        .then(r => r.json())
        .then(data => console.log(data))
    }
    
    return (
        <form onSubmit={handleSubmit} className="review">
            <input type="text" placeholder="Review" onChange={handleReviewChange} value={review}/>
            <button></button>
        </form>
    )
}

export default Review