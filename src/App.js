import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Avatar, Badge, Button, TextInput } from 'evergreen-ui';

const TYPES = {
  'fire': 'red',
  'water': 'blue',
  'grass': 'green',
  'electric': 'yellow',
  'ghost': 'purple',
  'dark': 'purple',
  'poision': 'purple',
  'fight': 'orange',
  'flying': 'orange'
}

function App() {
  const [query, setQuery] = useState('')
  const [pokemon, setPokemon] = useState({})
  const [loading, setLoading] = useState(false)

  const searchPokemon = async () => {
    // 1. call api to get details
    // 2. save details to state
    // https://pokeapi.co/api/v2/pokemon/ditto
    setLoading(true)
    try {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon/" + query)
      const data = await res?.json()
  
      console.log(data)
  
      setPokemon(data)
    } catch(e) {
      console.error(e);
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="App">

      <TextInput value={query} onChange={(e) => setQuery(e.target.value)} />
      <Button onClick={searchPokemon} appearance="primary" isLoading={loading} disabled={loading}>
        Search
      </Button>
      {loading && <p>loading...</p>}

      {pokemon?.name && (
        <div style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", width: '40%', margin: '5vh auto', padding: '2em', textAlign: 'center'}}>
          <Avatar
            src={pokemon?.sprites?.front_default}
            name={pokemon?.name}
            size={150}
          />
          <h3 style={{textTransform: 'capitalize'}}>{pokemon?.name}</h3>

          <div>
            {pokemon?.types?.map(({type}, idx) => (
              <Badge key={type?.name} color={TYPES[type?.name]} marginRight={8}>
                {type?.name}
              </Badge>
            ))}
          </div>

          <div style={{marginTop: 10}}>
            <span style={{marginRight: 10}}><strong>Weight:</strong> {pokemon?.weight} Kg</span>
            <span><strong>Height:</strong> {pokemon?.height} Ft</span>
          </div>

          
          <div>
            <h3>Abilities</h3>
            {pokemon?.abilities?.map(({ability}, idx) => (
              <Badge key={ability?.name} color={'neutral'} marginRight={8}>
                {ability?.name}
              </Badge>
            ))}
          </div>

          <div>
            <h3>Stats</h3>
            {pokemon?.stats?.map(({stat, base_stat}, idx) => (
              
            <span>{stat?.name}:
            <Badge key={stat?.name} color={'neutral'} marginRight={8}>
                 {base_stat}
              </Badge>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
