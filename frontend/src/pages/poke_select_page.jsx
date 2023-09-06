import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const PokemonSelectionPage = () => {
  const [pokemons, setPokemons] = useState([]);
  const carouselRef = useRef()

  useEffect(() => {
    fetch('/initial_Load') // Replace with your actual backend API endpoint
      .then(response => response.json())
      .then(data => setPokemons(data))
      .catch(error => console.error('Error:', error));
    if (carouselRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const width = entry.target.scrollWidth - entry.target.offsetWidth;
          console.log('Updated width:', width);
        }
      });

      resizeObserver.observe(carouselRef.current);
   
      return () => resizeObserver.disconnect();
    }
  }, [carouselRef.current]);

  console.log('Rendering PokemonSelectionPage with pokemons:', pokemons); // Log the pokemons prop

  return (
    pokemons && pokemons.length > 0 && (
      <motion.div className='carousel-container' ref={carouselRef} drag='x'>
        <div className='inner-carousel flex cursor-grab'>
          {pokemons.map((pokemon) => {
            console.log('Rendering pokemon:', pokemon); // Log each pokemon
            return (
              <motion.div
                key={pokemon.id}
                className='item min-h-[30rem] min-w-[30rem] w-[300px] p-[90px] transition-all duration-300 ease-in-out border-none mb-[30px] overflow-hidden'
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <Link to={`/pokemon/${pokemon.id}`}>
                  <div className='relative h-full'>
                    <img 
                      className='w-full h-full rounded-2xl border-double border-opacity-20 shadow-md object-cover shadow-lg border-double rounded-2xl'
                      src={pokemon.sprites.front_default} // Assumes the pokemon object has a 'sprites' property with a 'front_default' subproperty for the image
                      alt={pokemon.name} // Assumes the pokemon object has a 'name' property
                      style={{ borderColor: 'rgba(240, 248, 255, 0.207)', boxShadow: '0 0 5px #ffffffb2, 0 0 15px #ffffff53, 0 0 20px #ffffff78, 0 0 25px #ffffff82, 0 0 30px #ffffff84' }} 
                    />
                    <h4 className='text-white text-center absolute top-1/2 left-0 right-0 -translate-y-1/2 opacity-0 mt-[20px] transition-all duration-300 ease-in'>
                      {pokemon.name}
                    </h4>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    )
  )
}

export default PokemonSelectionPage