import { useState, useContext } from "react"
import { HotelContext } from "./App"


function HotelForm () {

    const [name, setHotelName] = useState("")
    const [address, setHotelAddress] = useState("")
    const [hotels, setHotels] = useContext(HotelContext)
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
                res.json().then(hotel => AddHotel(hotel))
            }else{
                res.json().then(error => setErrors(error.error))
            }
        })
    }

    return (
        <>
        {errors == [] ? <></> : <p className="error">{Object.keys(errors)[0]} {errors[Object.keys(errors)[0]]}</p>}
        <form onSubmit={handleHotelSubmit}>
            <input type="text" placeholder="Hotel" onChange={handleHotelChange} value={name}/>
            <input type="text" placeholder="Address" onChange={handleAddressChange} value={address}/>
            <button>Add Hotel</button>
        </form>
        </>
    )
}

export default HotelForm