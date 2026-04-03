import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { PokemonClient, type Pokemon, type Type } from "pokenode-ts";
import Stack from "@mui/material/Stack";
import { Card, CardContent, CardHeader, Divider } from "@mui/material";
import React from "react";
import TypeLabel from "./TypeLabel";



interface Props {
  team: (Pokemon | null)[];
}

function getAllPokemonTypes(pokemons : (Pokemon| null)[]) {
    const pokemonTypes = new Set<string>();

    for(const pokemon of pokemons) {
        if(pokemon == null) {
            continue;
        }

        for(const typ of pokemon.types) {
            pokemonTypes.add(typ.type.name);
        }
    }

    return [...pokemonTypes];
}

function getDefensiveWeakness(types : Type[]) {
    const doubleDamageFrom = new Set<string>();
    const halfDamageFrom = new Set<string>();
    const noDamageFrom = new Set<string>();

    for(const typ of types) {
        for(const weakness of typ.damage_relations.double_damage_from) {
            doubleDamageFrom.add(weakness.name);
        }

        for(const weakness of typ.damage_relations.half_damage_from) {
            halfDamageFrom.add(weakness.name);
        }

        for(const strength of typ.damage_relations.no_damage_from) {
            noDamageFrom.add(strength.name);
        }
    }

    for(const weakness of doubleDamageFrom) {
        for(const typ of types) {
            const doubleDamageTypeName = typ.damage_relations.half_damage_from.map((t) => t.name)
            if(doubleDamageTypeName.includes(weakness)) {
                doubleDamageFrom.delete(weakness);
            }
        }
    }

    return [...doubleDamageFrom];
}

function getOffensiveWeakness(types : Type[]) {
    const doubleDamageTo = new Set<string>();
    const halfDamageTo = new Set<string>();
    const noDamageTo = new Set<string>();

    for(const typ of types) {
        for(const strength of typ.damage_relations.double_damage_to) {
            doubleDamageTo.add(strength.name);
        }

        for(const weakness of typ.damage_relations.half_damage_to) {
            halfDamageTo.add(weakness.name);
        }

        for(const weakness of typ.damage_relations.no_damage_to) {
            noDamageTo.add(weakness.name);
        }
    }

    for(const weakness of noDamageTo) {
        for(const typ of types) {
            const noDamageTypeName = typ.damage_relations.no_damage_to.map((t) => t.name)
            if(!noDamageTypeName.includes(weakness)) {
                noDamageTo.delete(weakness);
            }
        }
    }

    for(const strength of doubleDamageTo) {
        if(halfDamageTo.has(strength)) {
            halfDamageTo.delete(strength);
        }
    }

    return [...halfDamageTo, ...noDamageTo];
}


function getOffensiveStrength(types : Type[]) {
    const doubleDamageTo = new Set<string>();

    for(const typ of types) {
        for(const strength of typ.damage_relations.double_damage_to) {
            doubleDamageTo.add(strength.name);
        }
    }

    return [...doubleDamageTo];
}

function TypeAnalysisPanel({team} : Props) {

    const numberOfPokemon = team.filter(p => p != null).length;
    const [pokemonTypes, setPokemonTypes] = React.useState<Type[]>([]); 

    const getTypes = async (types: string[]) => {
        const api = new PokemonClient();

        await Promise.all(
            types.map(async (typ) => {
                return await api.getTypeByName(typ);
            })
        ).then((data) => setPokemonTypes(data));
    };

    React.useEffect(() => {
        const types = getAllPokemonTypes(team);
        getTypes(types);
    }, [team]); 

    function displayTypes(title: string, types: string[]) {
        return (
            <Stack>
            <Typography variant="h6">{title}</Typography>
            {numberOfPokemon == 0
            ? <Typography color="info">Add some pokemon!</Typography>
            : <Grid container spacing={1} columns={{ xs: 4, sm: 6, md: 8, lg: 14}}>
                    {types.map((typ) => (
                    <Grid size={2}>
                        <TypeLabel type={typ}/>
                    </Grid>
                ))}</Grid>}
            </Stack>
        );
        
    }
    return (<>
        <Card>
            <CardHeader title='Type Analysis'/>
            <Divider></Divider>
            <CardContent>
                <Stack spacing={2}>
                    {displayTypes("Defensive Weakness", getDefensiveWeakness(pokemonTypes))}
                    <Divider></Divider>
                    {displayTypes("Offensive Weakness", getOffensiveWeakness(pokemonTypes))}
                    <Divider></Divider>
                    {displayTypes("Offensive Strength", getOffensiveStrength(pokemonTypes))}
                </Stack>
            </CardContent>
        </Card> 
    </>);
}

export default TypeAnalysisPanel