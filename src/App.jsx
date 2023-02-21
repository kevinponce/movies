import { useState, useEffect } from 'react'
import axios from 'axios';

const Styles = {
  wrapper: {
    width: '100%',
  },
  container: {
    width: '100%',
    clear: 'both',
    float: 'left',
  },
  buttonWrapper: {
    margin: '10px 0px',
    padding: '0px 10px',
    float: 'left',
    width: '24%',
    display: 'flex',
  },
  button: {
    backgroundColor: '#4CAF50',
    border: 'none',
    color: 'white',
    padding: '15px 32px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    width: '100%',
    flex: '1 1',
  }
}

function App() {
  const [movies, setMovides] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:1234/movies`)
     .then(res => {
       setMovides(res.data.movies)
     })
     .catch(err => {
       console.log('Error: ', err.message);
     });
  }, [])

  useEffect(() => {
    if (selectedMovie) {
      axios.get(`http://localhost:1234/find`, {
        params: { movie: selectedMovie}
      })
       .then(res => {
         setSimilarMovies(res.data.movies)
       })
       .catch(err => {
         console.log('Error: ', err.message);
       });
    }
  }, [selectedMovie])

  const renderMovies = () => {
    return movies.map(movie => (
      <div key={`movies-${ movie.id }`} style={ Styles.buttonWrapper }>
        <a style={ Styles.button } onClick={ e => setSelectedMovie(movie.title) }>
          { movie.title }
        </a>
      </div>
    ));
  }

  const renderSimilarMovies = () => {
    return similarMovies.map(movie => (
      <div key={`movies-${ movie.id }`} style={ Styles.buttonWrapper }>
        <a style={ Styles.button } onClick={ e => setSelectedMovie(movie.title) }>
          { movie.title }
        </a>
      </div>
    ));
  }

  return (
    <div style={ Styles.wrapper }>
      <div style={ Styles.container }>
        <h2>Movies</h2>
        { renderMovies() }
      </div>

      <div>
        <h2>Similar Movies</h2>
        { renderSimilarMovies() }
      </div>
    </div>
  )
}

export default App
