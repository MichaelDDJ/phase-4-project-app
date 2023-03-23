

function ReviewEdit ({currentUser, setCurrentUser, currentReview, setCurrentReview}) {

    function handleRemoveReview(oldReview) {
        console.log(oldReview)
        const newUser = currentUser
        newUser.reviews = newUser.reviews.filter((reviewToBeFiltered) => reviewToBeFiltered.id != oldReview.id)
        setCurrentUser(newUser)
        setCurrentReview("")
    }
    
    function handleDelete() {
        fetch(`/reviews/${currentReview.id}`, {method: 'DELETE'})
        .then((r) => {
            if (r.ok) {
                r.json().then((oldReview) => handleRemoveReview(oldReview))
            }
        });
    }

    return(
        <div>
            <h1>Review for {currentReview.hotel.name}</h1>
            <button onClick={handleDelete}>Delete</button>
            <button>Edit</button>
            <p>{currentReview.review}</p>
        </div>
    )
}

export default ReviewEdit