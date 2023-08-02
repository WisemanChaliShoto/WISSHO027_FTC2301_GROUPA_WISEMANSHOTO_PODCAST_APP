
export default function Card ({title,image,season,genre,lastUpdated,handleShow}){

    return(  
    <div className='card' onClick={handleShow}>
        <img className='card-image' src={image} />
      <section>
        <h3 className="card-title">{title}</h3>
        <div className='card-info'>
          <h4>{season} seasons</h4>
          <h4>Genres: {genre} </h4>
          <h4>Last-updated: <small>{lastUpdated}</small> </h4>
        </div>
      </section>
    </div>
    )
    }