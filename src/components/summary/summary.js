import * as React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MinHeightTextarea from '../../shared/textArea';
import Fingerprint from '@mui/icons-material/Fingerprint';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import {withSharedSnackbar  } from '../../shared/snackBar';


function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      summary: '',
      loading: false
    };
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleSummaryChange = (summary) => {
    this.setState({ summary: summary });
  }

  // submitSummary = () => {
  //   console.log('enqueueSnackbar:', this.props.enqueueSnackbar);
  //  if (this.props.enqueueSnackbar) {
  //     this.props.enqueueSnackbar('This is a shared notification message!', {
  //       variant: 'success',
  //     }); }
  //   this.setState({ loading: true });
  //   // axios.put(`https://api.example.com/data/`, this.state.summary)
  //   // .then(response => {

  //   //   this.setState({ data: response.data, loading: false });
  //   //   console.log('Data updated successfully:', response.data);
  //   // })
  //   // .catch(error => {
  //   //   // // Handle error
  //   //   // this.setState({ error: error.message, loading: false });
  //   //   // console.error('Error updating data:', error);
  //   // });
  // }

  render() {
    const { row } = this.props;
    const { open } = this.state;

    return (
      <React.Fragment>
        
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={this.handleClick}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
          </TableCell>
          <TableCell align="right"></TableCell>
          <TableCell align="right"></TableCell>
          <TableCell align="right"></TableCell>
          <TableCell align="right">
          <Tooltip title="Submit">
          <IconButton aria-label="fingerprint" color="success">
        <Fingerprint onClick={this.props.submitSummary }/>
      </IconButton>
      </Tooltip>

          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <MinHeightTextarea onSummaryChange={this.handleSummaryChange}/>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
        
      </React.Fragment>
    );
  }
}


const rows = [
  createData(),
];

class Summary extends React.Component {

  submitSummary = () => {
   if (this.props.enqueueSnackbar) {
      this.props.enqueueSnackbar('This is a shared notification message!', {
        variant: 'success',
      }); }
    // axios.put(`https://api.example.com/data/`, this.state.summary)
    // .then(response => {

    //   this.setState({ data: response.data, loading: false });
    //   console.log('Data updated successfully:', response.data);
    // })
    // .catch(error => {
    //   // // Handle error
    //   // this.setState({ error: error.message, loading: false });
    //   // console.error('Error updating data:', error);
    // });
  }

  render() {
    return (
      <Card >
      {/* <CardActionArea > */}
        <CardContent sx={{maxWidth: '100%', width: '90%', height: '65%', boxShadow: 10, marginLeft : '4%', marginTop: '3%', position:'fixed', overflowY: 'auto'}}>
      <TableContainer component={Paper} >
        <Table aria-label="collapsible table">
          <TableHead  sx = {{backgroundColor : '#e0e0d1'}} >
            <TableRow >
              <TableCell ></TableCell>
              <TableCell ></TableCell>
              <TableCell ></TableCell>
              <TableCell >SUMMARY</TableCell>
              <TableCell ></TableCell>
              <TableCell ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} 
              submitSummary = {this.submitSummary}
              {...this.props}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </CardContent>
      {/* </CardActionArea> */}
    </Card>
    );
  }
}

// function WithNavigate(props) {
//   const navigate = useNavigate();
//   // const {t} = useTranslation();
//   const params = useParams();
//   // const classes = useStyles();
//   return (
//     <Summary {...props} routeParams={params} navigate={navigate} />
//   );
// }


export default withSharedSnackbar(Summary);