import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Avatar, Badge, Button, Pill, TextInput } from 'evergreen-ui';

const TYPES = {
  'normal': 'neutral',
  'grass': 'green',
  'fire': 'red',
  'water': 'blue',
  'fighting': 'yellow',
  'dark': 'purple',
  'poison': 'purple',
  'flying': 'orange',
  'electric': 'yellow'
}

function App() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [pokemon, setPokemon] = useState({})

  const searchPokemon = async () => {
    // 1. call the api to get pokemon details
    // 2. save the details in a state variable
    // https://pokeapi.co/api/v2/pokemon/ditto
    setLoading(true)
    if(!query) return

    try {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon/" + query)
      const data = await res?.json()
  
      console.log(data)
      setPokemon(data)
      // setQuery('')

    } catch(e) {
      console.error(e);
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="App">
      <h1 style={{color: '#fff'}}>Search Pokemon Card</h1>
      <TextInput value={query} onChange={(e) => setQuery(e.target.value)} style={{marginTop:20 }} />
      <Button isLoading={loading} disabled={loading} marginRight={16} appearance="primary" onClick={searchPokemon}>
        Search
      </Button>

      {loading && (<p>loading...</p>)}
      {/* {pokemon?.name && JSON.stringify(pokemon) } */}

      {
        pokemon?.name && (
        <div style={{border: '2px solid gray', width: '40%', margin: '5vh auto', padding: '1em', boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", borderRadius: 20, backgroundColor: '#fff'}}>
          <Avatar
            src={pokemon?.sprites?.front_default}
            name={pokemon?.name}
            size={150}
          />
          <h3>{pokemon?.name}</h3>

          <div>
            {pokemon?.types?.map(({type}, idx) => (
              <Badge key={type?.name} color={TYPES[type?.name]} marginRight={10}>
                {type?.name}
              </Badge>
            ))}
          </div>

          <div style={{marginTop: 10}}>
            <span style={{marginRight: 10}}><strong>Weight</strong>: {pokemon?.weight} Kg</span> 
            <span><strong>Height</strong>: {pokemon?.height} Ft</span>
          </div>
          
          <h3>Abilities</h3>
          <div style={{display: 'flex', gap: 2}}>
            {pokemon?.abilities?.map(({ability}, idx) => (
              <p key={ability?.name} style={{border: '1px solid gray', width: 'fit-content', marginRight: 2, padding: 4, fontSize: 14, borderRadius: 10}}>
                {ability?.name}
              </p>
            ))}
          </div>

          <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
            {pokemon?.stats?.map(({base_stat, stat}, idx) => (
              <div key={stat?.name}>
                <p style={{textTransform: 'capitalize', fontWeight: 'bold'}}>{stat?.name}</p> 
                <Pill display="inline-flex" color="teal">
                  {base_stat}
                </Pill>
              </div>
            ))}
          </div>

        
        </div>
        )
      }
    </div>
  );
}

export default App;
