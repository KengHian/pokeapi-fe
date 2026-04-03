import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { darken } from "@mui/material/styles";

const TYPE_COLORS = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
} as const;

const getTypeColor = (key: string) => {
	if (key in TYPE_COLORS) {
		return TYPE_COLORS[key as keyof typeof TYPE_COLORS];
	} else {
		return '#FFFFFF';
	}

};

interface Props {
  type: string;
}

function TypeLabel({type} : Props) {

return (<>
    <Box
    sx={{
        bgcolor: getTypeColor(type),
        py: 0.25,
        px: 1,
        color: "white",
        border: 2,
        borderColor: darken(getTypeColor(type), 0.2),
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'center'
    }}>
        <Typography sx={{
        textShadow: '2px 2px 4px rgba(0,0,0,0.75)',
        }} variant='caption'>{type.toUpperCase()}</Typography>
    </Box>
    </>);
}

export default TypeLabel