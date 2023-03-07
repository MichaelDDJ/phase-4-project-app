import Review from "./Review";

function Hotel({name, address, reviewTotal, id}) {


    return (
      <div className="hotel">
        <h1>{name}</h1>
        <h2>{address}</h2>
        <h3>{reviewTotal} Reviews</h3>
        <Review hotel_id={id}/>
      </div>  
    );
}

export default Hotel