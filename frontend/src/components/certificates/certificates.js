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
import Fingerprint from '@mui/icons-material/Fingerprint';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import {withSharedSnackbar  } from '../../shared/snackBar';
import LinearStepper from '../../shared/linearStepper';
import { useNavigate, useParams } from 'react-router-dom';
import GppGoodIcon from '@mui/icons-material/GppGood';
import { useStyles } from '../../shared/styles/defaultStyle';
import Chip from '@mui/material/Chip';
import InputFileUpload from '../../shared/uploaddoc';
import Loading from "../../shared/loading";

const getMimeType = (fileExtension) => {
  // Check if fileExtension is defined
  if (!fileExtension) {
      console.error('File extension is undefined or null');
      return 'application/octet-stream'; // Default MIME type for unknown types
  }

  switch (fileExtension.toLowerCase()) {
      case 'pdf':
          return 'application/pdf';
      case 'doc':
          return 'application/msword';
      case 'docx':
          return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      case 'jpg':
      case 'jpeg':
          return 'image/jpeg';
      case 'png':
          return 'image/png';
      case 'gif':
          return 'image/gif';
      // Add more file types as needed
      default:
          return 'application/octet-stream'; // Default MIME type for unknown types
  }
};


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
      New_Skills : [],
      loading: false,
      selection : this.props.selection || [],
      id: 0,
    };
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleSummaryChange = (summary) => {
    this.setState({ summary: summary });
  }

  handleDelete = (chipToDelete) => {
    this.setState((prevState) => ({
      Skills: prevState.Skills.filter((skill) => skill !== chipToDelete) // Remove the selected skill
    }));
  };

  handleCertificateDelete = (id,fileNameToDelete) => {
    if(id){
      this.setState({ loading: true });
      axios.delete(`http://localhost:5153/certificates/deleteCertificate/${id}`)
      .then(response => {
        if (response.status === 200) {
          // Filter out the deleted certificate from the selection
          const updatedSelection = this.state.selection.filter(
            (chip) => chip.id !== id // Ensure you're comparing the correct property
          );
  
          this.setState({ selection: updatedSelection, loading: false }, () => {
            // Optionally, you can log the updated selection for debugging
            console.log("Updated Selection:", this.state.selection);
          });
  
          // Show success message
          if (this.props.enqueueSnackbar) {
            this.props.enqueueSnackbar('Certificate deleted successfully', {
              variant: 'success',
            });
          }
        } else {
          // Handle unexpected response status
          this.setState({ loading: false });
          if (this.props.enqueueSnackbar) {
            this.props.enqueueSnackbar('Error deleting certificate', {
              variant: 'error',
            });
          }
        }
      })
      .catch(error => {
        const errorMessage = error.response?.data || 'An error occurred';
        this.props.enqueueSnackbar(errorMessage, {
          variant: 'error',
        });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
    }
    else{
    // Filter out the file with the matching file name
    const updatedSelection = this.state.selection.filter(
      (chip) => chip.fileName !== fileNameToDelete
    );
  
    // Update the state with the new selection array
    this.setState({ selection: updatedSelection });
    }
  };

  handleFieldChange = (fieldName, event) => {
    this.setState({ New_Skills : event.target.value });
  }


  handleViewFile = (certificate) => {
    const byteCharacters = atob(certificate.fileContent);  // Decode Base64 content
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: certificate.fileType });
    const fileURL = URL.createObjectURL(blob);

    // Open the file in a new tab
    const newWindow = window.open(fileURL, '_blank');
    if (!newWindow) {
      alert('Please allow popups for this website to view the file.');
    }
  };

  fetchFile =async (fileId, file) => {
    try {
      if(fileId){
      // Make the axios request to fetch the file as a blob
      const response = await axios.get(`http://localhost:5153/certificates/getCertificates/files/${fileId}`, {
        responseType: 'blob',  // Important: Fetch the file as binary data (blob)
      });
  
      // Create a URL for the file Blob
      const fileBlob = new Blob([response.data], { type: response.headers['content-type'] });
      const fileURL = URL.createObjectURL(fileBlob);
  
      // Open the file in a new window
      const newWindow = window.open(fileURL);
      
      if (!newWindow) {
        alert('Please allow popups for this website to view the file.');
      }
  
      // Optionally, update the state if you want to keep track of the file URL and type
      this.setState({
        fileURL: fileURL,
        fileType: response.headers['content-type'],
      });
  
      // Clean up the URL after use (optional, but recommended)
      newWindow.onload = () => {
        URL.revokeObjectURL(fileURL);  // Clean up the URL to free memory
      };
  
    }else{
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, '_blank'); // Open the file in a new tab
    }
  }catch (error) {
    const errorMessage = error.response?.data || 'An error occurred';
    this.props.enqueueSnackbar(errorMessage, {
      variant: 'error',
    });
    }
  };
  

  submitCertificates = () => {
    debugger;
    // let selection = {...this.state.selection};
    let selection = Array.isArray(this.state.selection) ? this.state.selection : [];  // Convert to array if not already
    if(Array.isArray(selection) && selection){
      this.setState({ loading: true });
      const formData = new FormData();
      formData.append('userId', 1);
      formData.append('id', this.state.id);
  
      // Iterate through each file in the selection
      selection.forEach((fileData) => {
        formData.append('file', fileData.file); // Use the same key for multiple files
        formData.append('fileType', getMimeType(fileData.fileExtension));
        formData.append('fileName', fileData.fileName);
      axios.post(`http://localhost:5153/certificates/addCertificates`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        if(response.data == 0){
        if (this.props.enqueueSnackbar) {
          this.props.enqueueSnackbar('Certificates added successfully', {
            variant: 'success',
          }); }
          this.props.navigate('/projects');
        }
        if(response.data == -1){
          if (this.props.enqueueSnackbar) {
            this.props.enqueueSnackbar('Certificates updated successfully', {
              variant: 'success',
            }); }
            this.props.navigate('/projects');
          }
      })
      .catch(error => {
        const errorMessage = error.response?.data || 'An error occurred';
        this.props.enqueueSnackbar(errorMessage, {
          variant: 'error',
        });
      });
    });}
}

handleFieldChange = (files) => {
  // Use the previous state to avoid replacing existing selection
  this.setState((prevState) => {
    const updatedFiles = files.map((file) => ({
      file: file.file,                  // Store the actual file object
      fileName: file.fileName,          // Store the file name
      fileExtension: file.fileExtension  // Store the file extension
    }));

    // Combine previous selection with new updated files, filtering out duplicates
    const combinedSelection = [...prevState.selection];

    updatedFiles.forEach((newFile) => {
      const isDuplicate = combinedSelection.some(existingFile =>
        existingFile.fileName === newFile.fileName && existingFile.file.fileName === newFile.file.fileName
      );

      // Only add new files if they're not duplicates
      if (!isDuplicate) {
        combinedSelection.push(newFile);
      }
    });

    return { selection: combinedSelection }; // Update the state with the combined selection
  });
};


// handleFieldChange = (files) => {
//   // Use the previous state to avoid replacing existing selection
//   this.setState((prevState) => {
//       const updatedFiles = files.map((file) => ({
//           file: file.file,                  // Store the actual file object
//           fileName: file.fileName,          // Store the file name
//           fileExtension: file.fileExtension  // Store the file extension
//       }));

//       // Combine the previous selection with the new updated files
//       const selection = [...prevState.selection, ...updatedFiles];

//       return { selection }; // Update the state with the combined selection
//   });
// };

  componentDidUpdate(prevProps) {
    if (prevProps.selection !== this.props.selection) {
      this.setState({
        selection : this.props.selection
      });
    }
  }

  render() {
    const { open,selection } = this.state;
    return (
      <React.Fragment>
              <Loading loading={this.state.loading} {...this.props}/>
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
          <Box mt={2} sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {this.state.selection.map((chip) => (
       <Chip sx={{ marginLeft: "1%" }} 
       className={`mx-3 ${this.props.classes.formField}`} 
       variant="outlined" 
       hidden={!chip.fileName} 
       label={chip.fileName} 
       onClick={()=>this.fetchFile(chip.id, chip.file)}
       color="primary" />
      ))}
          
          </Box>
          </TableCell>
          <TableCell align="right"></TableCell>
          <TableCell align="right">
          <Tooltip title={selection.length == 0 ? "Please upload Certificates": "Submit"}>
          <span>
          <IconButton aria-label="fingerprint" color="success"   disabled={!selection.length}>
        <Fingerprint onClick={this.submitCertificates } 
        />
      </IconButton>
      </span>
      </Tooltip>

          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8} className={this.props.classes.tableForm}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                &nbsp;
            <InputFileUpload 
            handleFileChange = {this.handleFieldChange}
            {...this.props}/>
              {this.state.selection.map((chip) => (
       <Chip sx={{ marginLeft: "1%" }} className={`mx-3 ${this.props.classes.formField}`} variant="outlined" hidden={!chip.fileName} label={chip.fileName} color="primary" onDelete={() => this.handleCertificateDelete(chip.id,chip.fileName)}/>
      ))}
          
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

class Certificates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep : 6,
      selection : [],
    }
  }

  componentDidMount(){
    this.setState({ loading: true });
    axios.get(`http://localhost:5153/certificates/getCertificates/1`)
    .then(response => {
      this.setState({ selection: response.data, loading: false });
    })
    .catch(error => {
      const errorMessage = error.response?.data || 'An error occurred';
      this.props.enqueueSnackbar(errorMessage, {
        variant: 'error',
      });
    })
    .finally(() => {
      this.setState({ loading: false });
    });
  }


  render() {
    const {selection} = this.state;
    return (
      <Card >
      {/* <CardActionArea > */}
      <CardContent sx={{maxWidth: '100%', width: '93%', height: '65%', boxShadow: 10, marginLeft : '2%', marginTop: '3%', position:'fixed', overflowY: 'auto'}}>
        <LinearStepper  activeStep={this.state.activeStep}/>
      <TableContainer component={Paper} >
        <Table aria-label="collapsible table">
          <TableHead  sx = {{backgroundColor : '#e0e0d1'}} >
            <TableRow >
            <TableCell colSpan={8} align="center"  className={` ${this.props.classes.tableHeaderCells}`}>
      <Tooltip title="Certificates">
        <GppGoodIcon sx={{ color: 'grey' }} />
      </Tooltip>
    </TableCell>
    <Loading loading={this.state.loading} {...this.props}/>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.id} row={row} 
              selection = {selection}
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

function WithNavigate(props) {
  const navigate = useNavigate();
  // const {t} = useTranslation();
  const params = useParams();
  const classes = useStyles();
  return (
    <Certificates {...props} classes={classes} routeParams={params} navigate={navigate} />
  );
}


export default withSharedSnackbar(WithNavigate);