import { useState, useContext } from "react"


function HotelForm ({hotels, setHotels}) {

    const [name, setHotelName] = useState("")
    const [address, setHotelAddress] = useState("")
    const [errors, setErrors] = useState([])

    function handleHotelChange (event) {
        setHotelName(event.target.value)
    }

    function handleAddressChange (event) {
        setHotelAddress(event.target.value)
    }

    function AddHotel(hotel) {
        const newHotel = hotel
        newHotel.reviews = []
        setHotels([...hotels, newHotel])
    }

    function handleHotelSubmit (event) {
        event.preventDefault();
        const newHotel = {
            name,
            address
        }

        fetch('/hotels',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(newHotel)
        })
        .then(res => {
            if(res.ok){
                res.json().then(hotel => {
                    AddHotel(hotel)
                    setHotelName("")
                    setHotelAddress("")
                })
            }else{
                res.json().then(error => setErrors(error.error))
            }
        })
    }


    const displayedErrors = errors.map((error) => {
        return <p key={error} className="error">{error}</p>
    })

    return (
        <>
        {displayedErrors}
        <form onSubmit={handleHotelSubmit}>
            <input type="text" placeholder="Hotel" onChange={handleHotelChange} value={name}/>
            <input type="text" placeholder="Address" onChange={handleAddressChange} value={address}/>
            <button>Add Hotel</button>
        </form>
        </>
    )
}

export default HotelForm