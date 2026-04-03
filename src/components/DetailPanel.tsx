import { type Pokemon } from 'pokenode-ts';
import Box from '@mui/material/Box';
import { Card, Collapse, Stack, Typography } from '@mui/material';
import { darken } from '@mui/material/styles';
import TypeLabel from './TypeLabel';
import AnimatedSprite from './AnimatedSprite';

interface Props {
  pokemon?: Pokemon;
  showDetail : boolean;
}

const statAcronym = new Map<string, string>([
  ["hp", "HP"],
  ["attack", "Atk"],
  ["defense", "Def"],
  ["special-attack", "SpA"],
  ["special-defense", "SpD"],
  ["speed", "Spd"],
]);

const getStatAcronym = (stat_name: string) => {
  const acroynym = statAcronym.get(stat_name);
  if(acroynym == undefined) {
    throw new Error("Assertion: Unknown Stat name");
  }

  return acroynym;
}

const getStatBar = (stat_val : number) => {
  const stat_color = 
  stat_val <= 50
    ? '#ff7f0f'
    : stat_val >= 100
      ? '#a0e515'
      : '#ffdd57';

  return (
    <>
    <Box width={'100%'}>
      <Box
      sx={{
        width: `${stat_val / 150 * 100}%`,
        height: 10,
        bgcolor: stat_color,
        border: 1,
        borderColor: darken(stat_color, 0.2),
        borderRadius: '5px'
      }}
      >
      </Box>
    </Box>
    </>
  );
}

function DetailPanel({ pokemon, showDetail }: Props) {  

  if(pokemon == undefined) {
    throw new Error("Attempted to display detail of undefined pokemon");
  }

  const pokemonType = (
    <Stack>
          <Typography variant='h6'>Type</Typography>
          <Stack direction={'row'} spacing={1}>
            {pokemon.types.map((type, idx) => (
              <TypeLabel key={idx} type={type.type.name}></TypeLabel>
            ))}
          </Stack>
    </Stack>
  );

  const pokemonStat = (
    <Stack>
      <Typography variant='h6'>Base stats</Typography>
      {pokemon.stats.map((stat, idx) => (
        <Box key={idx}>
          <Stack direction={'row'}>
            <Box width={"25%"}>
              <Typography noWrap>{getStatAcronym(stat.stat.name)}</Typography>
            </Box>
            <Box width={"20%"}>
              <Typography >{stat.base_stat}</Typography>
            </Box>
            <Box width={"55%"} height={20} display={'flex'} alignItems={'center'}>
              {getStatBar(stat.base_stat)}
            </Box>
          </Stack>
        </Box>
      ))}
    </Stack>
  );

  const pokemonAbility = (
    <Stack>
    <Typography variant='h6'>Abilites</Typography>
    {pokemon.abilities.map((ability, idx) => (
      <Box key={idx}>
          {ability.is_hidden 
          ? <Typography align='left'>{`${ability.ability.name} (hidden ability)`}</Typography>
          : <Typography align='left'>{`${ability.slot}. ${ability.ability.name}`}</Typography>
          }
      </Box>
    ))}
  </Stack>
  );

  return (
      <>
      {pokemon &&
      <Card sx={{ width:'100%', height:'100%', p: 2 }}>
        <Stack spacing={2}>
          <Typography variant='h5'>{pokemon.name}</Typography>
          <AnimatedSprite pokemon={pokemon}/>
          {pokemonType}
          <Collapse in={showDetail}>
            <Stack spacing={2}>
              {pokemonStat}
              {pokemonAbility}
            </Stack>
          </Collapse>
        </Stack>
      </Card>
      }
      </>
  )
}

export default DetailPanel
