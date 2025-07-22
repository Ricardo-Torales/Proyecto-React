import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CocktailList = () => {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('all');

  const fetchCocktails = (term) => {
    setLoading(true);
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        setCocktails(data.drinks || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching cocktails:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCocktails(searchTerm);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchCocktails(searchTerm);
    }
  };

  return (
    <div style={styles.container}>
      <h2>🍸 Explorar Cócteles</h2>
      <form onSubmit={handleSearch} style={styles.searchForm}>
        <input
          type="text"
          placeholder="Buscar cóctel..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Buscar</button>
      </form>

      <div style={{ margin: '1rem 0' }}>
        <Link to="/" style={styles.backLink}>← Volver al inicio</Link>
      </div>

      {loading ? (
        <p>Cargando cócteles...</p>
      ) : cocktails.length === 0 ? (
        <p>No se encontraron resultados.</p>
      ) : (
        <div style={styles.grid}>
          {cocktails.map((drink) => (
            <div key={drink.idDrink} style={styles.card}>
              <img
                src={drink.strDrinkThumb}
                alt={drink.strDrink}
                style={styles.image}
              />
              <h3>{drink.strDrink}</h3>
              <p style={styles.instructions}>{drink.strInstructions}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { padding: '1rem' },
  searchForm: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem'
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    flex: 1
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#28A745',
    color: '#fff',
    border: 'none'
  },
  backLink: {
    textDecoration: 'none',
    color: '#2A3F54',
    fontWeight: 'bold'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem'
  },
  card: {
    background: '#f9f9f9',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  image: {
    width: '100%',
    borderRadius: '8px'
  },
  instructions: {
    fontSize: '0.9rem',
    color: '#444'
  }
};

export default CocktailList;