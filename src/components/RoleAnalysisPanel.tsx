import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Card, CardContent, CardHeader, Divider } from "@mui/material";
import type { Pokemon } from "pokenode-ts";
import PokeBoxSprite from "./PokeBoxSprite";


interface Props {
  team: (Pokemon | null)[];
}

function getPokemonSpeed(pokemons: (Pokemon | null)[]) {
    const speeds: (number | null)[] = [];

    for(const pokemon of pokemons) {
        if(pokemon == null) {
            speeds.push(null);
        } else {
            const spd = pokemon.stats.find(s => s.stat.name == "speed")?.base_stat ?? null;
            speeds.push(spd);
        }
    }   

    return speeds;
}


function getPokemonRole(pokemons: (Pokemon | null)[]) {
    const roles: (string | null)[] = [];

    for(const pokemon of pokemons) {

        if(pokemon == null) {
            roles.push(null);
            continue;
        }

        const atk = pokemon.stats.find(s => s.stat.name == "attack")?.base_stat;
        const spa = pokemon.stats.find(s => s.stat.name == "special-attack")?.base_stat;
        const statsNoSpeed = pokemon.stats.filter(s => s.stat.name != "speed");
        const base_stats = statsNoSpeed.map(s => s.base_stat);
        const avgStat = base_stats.reduce((a, b) => a + b, 0) / base_stats.length;

        if(atk && atk > 1.1 * avgStat) {
            roles.push("physical");
        } else if(spa && spa > 1.1 * avgStat) {
            roles.push("special");
        } else {
            roles.push("defensive");
        }
    }   

    return roles;
}

function pokemonDisplayGrid(pokemons : (Pokemon | null)[]) {
    return (
        <Grid container spacing={1} columns={{ xs: 4, sm: 6, md: 8, lg: 14}}>
            {pokemons.map((pokemon, idx) => (
            <Grid key={idx} size={2}>
                <PokeBoxSprite pokemon={pokemon}></PokeBoxSprite>
            </Grid>
        ))}</Grid>
    );
}

function RoleAnalysisPanel({team} : Props) {

    const numberOfPokemon = team.filter(p => p != null).length;
    const pokemonRoles = getPokemonRole(team);

    function displayPokemonByRole(title: string, role: string) {
        const pokemonOfRole = team.filter((_, idx) => pokemonRoles[idx] == role);
        const matched = pokemonOfRole.length;
        return (
        <Stack>
            <Typography variant="h6">{`${title} : ${matched}`}</Typography>
            {numberOfPokemon == 0
            ? <Typography color="info">Add some pokemon!</Typography>
            : matched == 0
                ? <Typography variant="body1" color="error">{`None, add some ${role} pokemon!`}</Typography>
                : pokemonDisplayGrid(pokemonOfRole)}
        </Stack>
        );
    }

    const speedLegend = (
        <Box width={'100%'} height={25} borderTop={1}>
            <Stack justifyContent={'space-between'} width={'100%'} direction={'row'}>
            {[0, 50, 100, 150, 200].map((spd, idx) => (
                <Typography key={idx}>
                    {spd}
                </Typography>
            ))}
            </Stack>
        </Box>
    );

    function getSpeedDistribution() {

        const pokemonSpeed = getPokemonSpeed(team);
        const avgSpeed = (pokemonSpeed.reduce((acc, curr) => (acc == null ? 0 : acc) + (curr == null ? 0 : curr), 0) ?? 0) / numberOfPokemon;
        let nearAverage : number = 0;

        for(const spd of pokemonSpeed) {
            if(spd == null) {
                continue;
            } else if (spd >=  avgSpeed * 0.75 && spd <=  avgSpeed * 1.25) {
                nearAverage = nearAverage + 1;
            }
        }

        return (
        <Stack>
            <Typography variant="h6">{`Speed Distribution : Average ${numberOfPokemon == 0 ? "-" : avgSpeed}`}</Typography>
            {numberOfPokemon == 0
            ? <Typography color="info">Add some pokemon!</Typography>
            : <>
            <Box width={'100%'} height={100} position={'relative'}>
                {pokemonSpeed.map((spd, idx) => (
                    spd && 
                    <Box key={idx} 
                    position={'absolute'} 
                    left={`${spd/200 * 100}%`} 
                    ml={`-50px`}>
                        <PokeBoxSprite pokemon={team[idx]}></PokeBoxSprite>
                    </Box>
                ))}
            </Box>
            {speedLegend}
            </>}
            {nearAverage >=3 && <Typography variant="body1" color="error">{`Add more pokemon with different speed!`}</Typography>}
            
        </Stack>
        );
    }

    return (<>
        <Card>
            <CardHeader title='Role Analysis'/>
            <Divider></Divider>
            <CardContent>
                <Stack spacing={2}>
                    {displayPokemonByRole("Physical Attacker", "physical")}
                    <Divider></Divider>
                    {displayPokemonByRole("Special Attacker", "special")}
                    <Divider></Divider>
                    {displayPokemonByRole("Defensive Pokemon", "defensive")}
                    <Divider></Divider>
                    {getSpeedDistribution()}                
                </Stack>
            </CardContent>
        </Card>
    </>);
}

export default RoleAnalysisPanel