import Box from "@mui/material/Box";
import type { Pokemon } from "pokenode-ts";
import localSprite from "../assets/pokeball.png";

interface Props {
  pokemon: Pokemon | null;
  size? : number;
}

function PokeBoxSprite({pokemon, size} : Props) {

	const sprite = pokemon?.sprites.versions['generation-viii'].icons.front_default;
	const fallBackSprite = pokemon?.sprites.front_default;

	return (<>
    <Box 
	component={'img'} 
	src={sprite ?? fallBackSprite ?? localSprite}
	sx={{
		width: size ?? 100
	}}
	/>
    </>);
}

export default PokeBoxSprite