import React, { useEffect, useState } from 'react';
import Navbar from './components/Home/Navbar';
import Card from './components/Shows/Card'
import Carousel from './components/Home/Carousel'
import Shows from './components/Home/Shows'
import Menu from './components/Home/Menu';



import SeasonCard from './components/Shows/Season';
import Episodes from './components/Shows/Episodes';
import AudioPlayer from './components/MediaPlayer/Audioplayer';


function App() {
  const [podcast, setPodcast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedShow, setSelectedShow] = useState(null);
 

  useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows')
      .then((res) => res.json())
      .then((data) => {
        setPodcast(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading podcast data:', error);
        setLoading(false);
      });
  }, []);

  function handleSelectedShow(id) {
    fetch(`https://podcast-api.netlify.app/id/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedShow(data);
        console.log('Show Details:', data);
      })
      .catch((error) => {
        console.error('Error loading show details:', error);
        setSelectedShow(null);
      });
  }

  

  const showElements = podcast.map((show) => (
    <Card
      key={show.id}
      title={show.title}
      image={show.image}
      season={show.seasons}
      genre={show.genres}
      lastUpdated={new Date(show.updated).toLocaleDateString('en-US')}
      handleShow={() => handleSelectedShow(show.id)}
    />
  ));

  return (
    <div className='body'>
      
      <Navbar />
      <Carousel />
      <Shows />
      <main>
        {loading ?  <p className='loading'> <img src="./src/assets/starLogo.png" width="100px" alt="" /> Loading shows... </p> : (
          <div className='shows-preview'> 
            {!selectedShow && showElements}
            {selectedShow && <ShowDetails show={selectedShow} />}
          </div>
        )}
      </main>
    </div>
  );
}


function ShowDetails({show}) {

  const [selectedSeason, setSelectedSeason] = useState(null);
  const [currentTrack, setCurrentTrack] = useState('');

  function handleEpisodePlay(file){
    console.log(file)
    setCurrentTrack(file)
    console.log(currentTrack)
  }

  function handleSeasonClick(season) {
    console.log('Clicked season:', season);
    setSelectedSeason(season); 
  }

  return (
    <div className='seasons'>
      
    <div className='show-hero-banner'>
      <div className='show-image-container'>
        <img className='show-image' src={selectedSeason ? selectedSeason.image : show.image} alt={show.title} />
      </div>
      <br />
      <section className='show-metadata'>
        <h4 className='show-card-title'>{selectedSeason ? selectedSeason.title: show.title}</h4>
        <button >Favourite</button>
        <br />
        <br />
        <strong>{selectedSeason ? (selectedSeason.episodes && selectedSeason.episodes.length) :(show.seasons && show.seasons.length)} {selectedSeason? 'episodes':'seasons'}</strong><br />
        {selectedSeason ? '':<strong>Genres: <small><em>{show.genres ? show.genres.join(', ') : 'No specific Genre'}</em></small> </strong>} <br />
        <strong>Last-updated: </strong><small>{show.updated && new Date(show.updated).toLocaleDateString('en-US')}</small>
      </section>
      {selectedSeason? <section className='show-description'></section> : <section className='show-description'>
        <h4 className='description-header'>About:</h4>
        <br />
        <p className='description-paragraph'>{show.description}</p>
      </section>}
  
     
    </div>

    
    <div className='show-seasons'>
        {!selectedSeason && show.seasons && show.seasons.map((season) => (
          <SeasonCard  
            key={season.id} 
            title={season.title}
            image={season.image}
            episodes={season.episodes.length}
            handleClick={()=>handleSeasonClick(season)}
          />
        ))}
      </div>

      {selectedSeason && 
        <div className="episodes">

          <div className="season-hero-banner">
            <div className="episode-image-container">
              <img src={selectedSeason.image} alt={selectedSeason.title} />
            </div>
            <div className="season-description">
              <h3>{selectedSeason.title}</h3>
              <p>{selectedSeason.episodes.length} Episodes</p>
            </div>
          </div>


          <div className="show-episodes">
            {selectedSeason && selectedSeason.episodes.map((episode)=>{
              return(
                <Episodes 
                key ={episode.id}
                title={episode.title}
                image ={episode.image}
                play={()=>handleEpisodePlay(episode.file)}
                description={episode.description}/>
              )
              
            })}
            
          </div>
        </div>
      }
    </div>
  );
}



export default App;

