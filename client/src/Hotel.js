import Review from "./Review";

function Hotel({name, address}) {

  function handleReviewForm() {

  }

    return (
      <div className="hotel">
        <h1>{name}</h1>
        <h2>{address}</h2>
        <button onClick={handleReviewForm}>Review</button>
        <Review />
      </div>  
    );
}

export default Hotel