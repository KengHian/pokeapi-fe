import Box from "@mui/material/Box";
import type { Pokemon } from "pokenode-ts";
import localSprite from "../assets/pokeball.png";

interface Props {
  pokemon: Pokemon;
}

function AnimatedSprite({pokemon} : Props) {

	const sprite = pokemon.sprites.versions['generation-v']['black-white'].animated.front_default;
	const fallBackSprite = pokemon.sprites.front_default;

	return (<>
    <Box
		component={'img'} 
		src={sprite ?? fallBackSprite ?? localSprite}
		sx={{
            height: '100px',
            width: '100px',
            objectFit: 'contain',
          }}
	/>
    </>);
}

export default AnimatedSprite