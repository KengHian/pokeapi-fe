import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PokemonClient, type Pokemon } from "pokenode-ts";
import React from "react";
import PokeBoxSprite from "./PokeBoxSprite";

// Estimated
const MAX_PAGE = 65; 
const PAGE_LIMIT = 20;

interface Props {
  onSelect : (pokemon: Pokemon) => void;
}

function SelectionPanel({onSelect} : Props) {

    const [loading, setLoading] = React.useState<boolean>(true);
    const [pokemons, setPokemons] = React.useState<Pokemon[]>([]);
    const [currentPage, setCurrentPage] = React.useState<number>(0);

    const getListOfPokemon = async (page: number) => {
        const api = new PokemonClient();

        let list: string[] = [];
        
        await api
            .listPokemons(page * PAGE_LIMIT, PAGE_LIMIT)
            .then((data) => data.results.map((p) => p.name))
            .then((res) => list = res)
            .catch((error) => console.error(error));

        await Promise.all(
            list.map(async (l) => {
                return await api.getPokemonByName(l);
            })
            ).then((data) => setPokemons(data))
            .then(() => setLoading(false));
    };

    React.useEffect(() => {
        setLoading(true);
        getListOfPokemon(currentPage);
    }, [currentPage]); 

    const pokemonGrid = (<>
        <Grid container spacing={2} columns={{ xs: 9, md: 12, lg: 15}}>
            {pokemons?.map((pokemon, idx) => (
            <Grid size={3} key={idx}>
                <Button variant="text"
                sx={{
                    width:'100%',
                    p:0,
                    m:0,
                    textTransform: 'none'}}> 
                    <Stack>
                        <Box 
                        key={idx} 
                        onClick={() => onSelect(pokemons[idx])}
                        sx={{
                            transition: 'transform 0.2s ease-in-out infinite alternate',
                            '&:hover': {
                                animation: 'bounce 0.5s infinite alternate',
                                '@keyframes bounce': {
                                    '0%, 100%': { transform: 'translateY(0)' },
                                    '50%': { transform: 'translateY(-10px)' },
                                },
                            },
                        }}>
                            <PokeBoxSprite pokemon={pokemon}/>
                        </Box>
                        
                        <Typography variant="caption" color="grey">{pokemon.name}</Typography>
                    </Stack>
                </Button>
            </Grid>
            ))}
        </Grid>
    </>);

    const loadingPage = (<>
        <Box minWidth={300} minHeight={300} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <CircularProgress/>
        </Box>
    </>);

    return (<>
        <Stack p={2} spacing={2}>
            {loading
            ? loadingPage
            : pokemonGrid}
            <Box width={'100%'} justifyContent={'center'} display={'flex'}>
                <Stack direction={'row'} spacing={2}>
                    <Button variant="contained" disabled={currentPage <= 0} onClick={() => setCurrentPage(currentPage - 1)}>Prev</Button>
                    <Button variant="contained" disabled={currentPage >= MAX_PAGE} onClick={() => setCurrentPage(currentPage + 1)}>Next</Button>
                </Stack>
            </Box>
        </Stack>
    </>);
}

export default SelectionPanel