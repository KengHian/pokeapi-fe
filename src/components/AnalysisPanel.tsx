import Grid from "@mui/material/Grid";
import { Card, CardContent, CardHeader, Divider } from "@mui/material";
import TypeAnalysisPanel from "./TypeAnalysisPanel";
import RoleAnalysisPanel from "./RoleAnalysisPanel";
import type { Pokemon } from "pokenode-ts";



interface Props {
  team: (Pokemon | null)[];
}

function AnalysisPanel({team} : Props) {

return (<>
    <Card>
        <CardHeader
            title = "Team Analysis"
        />
        <Divider></Divider>
        <CardContent>
            <Grid
            container spacing={2} 
            columns={{ xs: 3, sm: 6}}
            >
                <Grid size={3}><TypeAnalysisPanel team={team}/></Grid>
                <Grid size={3}><RoleAnalysisPanel team={team}/></Grid>
            </Grid>
            
        </CardContent>
    </Card>
    </>);
}

export default AnalysisPanel