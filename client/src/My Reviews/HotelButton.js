
function HotelButton({hotel}) {

    return (
        <div>
            <h2>{hotel.name}</h2>
            <h3>{hotel.address}</h3>
        </div>
    )
}

export default HotelButton