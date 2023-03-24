

function HotelPage ({currentHotel, setCurrentHotel}) {

    function handleResetHotel() {
        setCurrentHotel("")
    }

    return (
        <div>
            <h1>{currentHotel.name}</h1>
            <button onClick={handleResetHotel}>Return</button>
            <h2>Reviews</h2>
            {currentHotel.reviews.map((review) => {
                console.log(review)
                return <div key={review.id} className="review">
                         <h3>Posted by: {review.user.first_name}</h3>
                         <p>{review.review}</p>
                       </div>
            })}
        </div>
    )
}

export default HotelPage