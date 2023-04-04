
function ReviewedHotel({hotel, setCurrentHotel}) {

    return (
        <div className="user_hotel" onClick={() => setCurrentHotel(hotel) }>
            <h2>{hotel.name}</h2>
            <h3>{hotel.address}</h3>
        </div>
    )
}

export default ReviewedHotel