import { useState, useContext } from "react"
import { HotelContext, UserContext } from "./App"


function HotelForm () {

    const [name, setHotelName] = useState("")
    const [address, setHotelAddress] = useState("")
    const [hotels, setHotels] = useContext(HotelContext)
    const [currentUser, setCurrentUser] = useContext(UserContext)

    function handleHotelChange (event) {
        setHotelName(event.target.value)
    }

    function handleAddressChange (event) {
        setHotelAddress(event.target.value)
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
                res.json().then(hotel => setHotels([...hotels, hotel].flat()))
            }else{
                res.json().then(console.log("Hotel error"))
            }
        })
    }

    if(!currentUser) return <></>

    return (
        <form onSubmit={handleHotelSubmit}>
            <input type="text" placeholder="Hotel" onChange={handleHotelChange} value={name}/>
            <input type="text" placeholder="Address" onChange={handleAddressChange} value={address}/>
            <button>Add Hotel</button>
        </form>
    )
}

export default HotelForm