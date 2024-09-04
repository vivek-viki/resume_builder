import * as React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default class Summary extends React.Component{
    constructor(){
        super();

    }

render(){
    return (
        <React.Fragment>
             <Card >
      <CardActionArea sx={{maxWidth: '100%', width: '90%', height: '85vh', boxShadow: 10, marginLeft : '4%', marginTop: '4%', position:'fixed', overflowY: 'auto'}}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
            sdkajdslk
          </Typography> 
        </CardContent>
      </CardActionArea>
    </Card>
        </React.Fragment>
    )
}
}