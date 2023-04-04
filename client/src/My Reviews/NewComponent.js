import HotelButton from "./HotelButton"


function NewComponent() {



    displayedHotels = userHotels.map((hotel) => {
        return <HotelButton hotel={hotel} />
    })

    return (
        <div>
            {displayedHotels}
        </div>
    )
}

export default NewComponent