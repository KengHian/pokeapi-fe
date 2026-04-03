import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import type { Pokemon } from "pokenode-ts";
import React, { type SetStateAction } from "react";
import SelectionPanel from "./SelectionPanel";
import DetailPanel from "./DetailPanel";
import Stack from "@mui/material/Stack";
import { Card, CardContent, CardHeader, Divider, IconButton } from "@mui/material";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import AutorenewIcon from '@mui/icons-material/Autorenew';


interface Props {
  team: (Pokemon | null)[];
  setTeam: React.Dispatch<SetStateAction<(Pokemon | null)[]>>;
}

function TeamPanel({team, setTeam} : Props) {

const [openSelection, setOpenSelection] = React.useState(false);
const [showDetail, setShowDetail] = React.useState(true);
const [pos, setPos] = React.useState(0);

const onSelect = (i: number, pokemon: Pokemon) => {
    const updatedTeam = team.slice();
    updatedTeam[i] = pokemon ?? null;
    setTeam(updatedTeam);
    setOpenSelection(false);
}

const toggleDetail = () => {
    setShowDetail((prev) => !prev);
}

const onChangePokemon = (i : number) =>  {
    setPos(i);
    setOpenSelection(true);
}

const onRemovePokemon = (i : number) =>  {
    const updatedTeam = team.slice();
    updatedTeam[i] = null;
    setTeam(updatedTeam);
}



return (<>
    <Dialog
    open={openSelection}
    onClose={() => setOpenSelection(false)}
    >
        <SelectionPanel onSelect={(pokemon : Pokemon) => onSelect(pos, pokemon)}></SelectionPanel>
    </Dialog>
    
    <Card>
        <CardHeader
            title = "Your Team"
            subheader = "Click + to add pokemon to your team!"
            action={
            <Stack direction={'row'} width={'100%'} height={50}>
                <Button variant="outlined" onClick={toggleDetail} sx={{m: 'auto'}}>
                    {showDetail ? "Hide" : "Show"} detail
                </Button>
            </Stack>
            }
        />
        <Divider></Divider>
        <CardContent>
            <Grid 
            container spacing={1} 
            columns={{ xs: 6, sm: 9, md: 18, lg: 18}}
            >
                {team.map((pokemon, idx) => (
                    <Grid size={3} key={idx}>
                        {pokemon != null
                        ?  <Box width={'100%'}>
                                <Stack>
                                    <Stack direction={'row'} justifyContent={'end'} width={'100%'}>
                                        <IconButton 
                                        onClick={() => onChangePokemon(idx)}
                                        >
                                        <AutorenewIcon color="info"/>
                                        </IconButton>
                                        <IconButton onClick={() => onRemovePokemon(idx)}
                                        >
                                        <DeleteIcon color="error"/>
                                        </IconButton>
                                    </Stack>
                                    <DetailPanel 
                                    pokemon={pokemon} 
                                    showDetail={showDetail}
                                    />
                                </Stack>
                            </Box>
                        :  <Box height={'100%'} minHeight={250} display={'flex'} alignContent={'center'} justifyContent={'center'}>
                                <IconButton 
                                onClick={() => {
                                    setPos(idx);
                                    setOpenSelection(true);
                                }}
                                sx={{ m: 'auto', }}
                                >
                                    <AddCircleIcon color="success" fontSize="large"/>
                                </IconButton>
                        </Box>}
                    </Grid>
                ))}
            </Grid>
        </CardContent>
    </Card>
    </>);
}

export default TeamPanel