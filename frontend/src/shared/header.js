// import React, { Component } from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// const pages = ['Projects', 'Certificates', 'Links'];
// const settings = ['Profile', 'Logout'];

// class ResponsiveAppBar extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       anchorElNav: null,
//       anchorElUser: null,
      
//     };
//   }

//   handleOpenNavMenu = (event) => {
//     this.setState({ anchorElNav: event.currentTarget });
//   };

//   handleOpenUserMenu = (event) => {
//     this.setState({ anchorElUser: event.currentTarget });
//   };

//   handleCloseNavMenu = () => {
//     this.setState({ anchorElNav: null });
//   };

//   handleCloseUserMenu = () => {
//     this.setState({ anchorElUser: null });
//   };

//   handleCloseNavMenuLinks = (page) => {
//     if (page === 'Projects') {
//       this.props.navigate('/personal');
//     }
//     this.handleCloseNavMenu();
//   };

//   render() {
//     const { anchorElNav, anchorElUser } = this.state;

//     return (
//       <React.Fragment>
//       <AppBar position="static">
//         <Container maxWidth="xl">
//           <Toolbar disableGutters>
//             <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
//             <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '70%' }}>
//               <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
//               <Typography
//                 variant="h6"
//                 noWrap
//                 component="a"
//                 sx={{
//                   mr: 2,
//                   display: { xs: 'none', md: 'flex' },
//                   fontFamily: 'monospace',
//                   fontWeight: 700,
//                   letterSpacing: '.3rem',
//                   color: 'inherit',
//                   textDecoration: 'none',
//                   whiteSpace: 'normal'
//                 }}
//               >
//                 VIVEK MUKUNDA
//               </Typography>
//               <Typography sx={{ whiteSpace: 'normal' }}>SOFTWARE ENGINEER</Typography>
//               </Link>
//             </div>

//             <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//               <IconButton
//                 size="large"
//                 aria-label="account of current user"
//                 aria-controls="menu-appbar"
//                 aria-haspopup="true"
//                 onClick={this.handleOpenNavMenu}
//                 color="inherit"
//               >
//                 <MenuIcon />
//               </IconButton>
//               <Menu
//                 id="menu-appbar"
//                 anchorEl={anchorElNav}
//                 anchorOrigin={{
//                   vertical: 'bottom',
//                   horizontal: 'left',
//                 }}
//                 keepMounted
//                 transformOrigin={{
//                   vertical: 'top',
//                   horizontal: 'left',
//                 }}
//                 open={Boolean(anchorElNav)}
//                 onClose={this.handleCloseNavMenu}
//                 sx={{ display: { xs: 'block', md: 'none' } }}
//               >
//                 {pages.map((page) => (
//                   <MenuItem key={page} onClick={() => this.handleCloseNavMenuLinks(page)}>
//                     <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
//                   </MenuItem>
//                 ))}
//               </Menu>
//             </Box>
//             <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
//             <Typography
//               variant="h5"
//               noWrap
//               component="a"
//               href="#app-bar-with-responsive-menu"
//               sx={{
//                 mr: 2,
//                 display: { xs: 'flex', md: 'none' },
//                 flexGrow: 1,
//                 fontFamily: 'monospace',
//                 fontWeight: 700,
//                 letterSpacing: '.3rem',
//                 color: 'inherit',
//                 textDecoration: 'none',
//               }}
//             >
//               LOGO
//             </Typography>
//             <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//               {pages.map((page) => (
//                 <Button
//                   key={page}
//                   onClick={() => this.handleCloseNavMenuLinks(page)}
//                   sx={{ my: 2, color: 'white', display: 'block' }}
//                 >
//                   {page}
//                 </Button>
//               ))}
//             </Box>
//             <Box sx={{ flexGrow: 0 }}>
//               <Tooltip title="Open settings">
//                 <IconButton onClick={this.handleOpenUserMenu} sx={{ p: 0 }}>
//                   <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
//                 </IconButton>
//               </Tooltip>
//               <Menu
//                 sx={{ mt: '45px' }}
//                 id="menu-appbar"
//                 anchorEl={anchorElUser}
//                 anchorOrigin={{
//                   vertical: 'top',
//                   horizontal: 'right',
//                 }}
//                 keepMounted
//                 transformOrigin={{
//                   vertical: 'top',
//                   horizontal: 'right',
//                 }}
//                 open={Boolean(anchorElUser)}
//                 onClose={this.handleCloseUserMenu}
//               >
//                 {settings.map((setting) => (
//                   <MenuItem key={setting} onClick={this.handleCloseUserMenu}>
//                     <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
//                   </MenuItem>
//                 ))}
//               </Menu>
//             </Box>
//           </Toolbar>
//         </Container>
//       </AppBar>
//        </React.Fragment>
//     );
//   }
// }

// function WithNavigate(props) {
//   const navigate = useNavigate();
//   const params = useParams();
//   return (
//     <ResponsiveAppBar {...props}  routeParams={params} navigate={navigate} />
//   );
// }

// export default WithNavigate;

import React, { Component } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import projects from '../components/projects/projects';
import {withSharedSnackbar  } from '../shared/snackBar';



const pages = ['Projects', 'Certificates', 'Links'];
const settings = ['Profile', 'Logout'];

class ResponsiveAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorElNav: null,
      anchorElUser: null,
      anchorElCertificates: null,
      anchorElProjects: null,
      anchorElLinks: null,
      selection : [], // State for certificates dropdown
      project:[],
      userDetails : [],
      links: []
    };
  }

  handleOpenNavMenu = (event) => {
    this.setState({ anchorElNav: event.currentTarget });
  };

  handleOpenUserMenu = (event) => {
    this.setState({ anchorElUser: event.currentTarget });
  };

  handleOpenCertificatesMenu = (event) => {
    this.setState({ anchorElCertificates: event.currentTarget });
  };

  handleOpenProjectsMenu = (event) => {
    this.setState({ anchorElProjects: event.currentTarget });
  };

  handleCloseProjectsMenu = () => {
    this.setState({ anchorElProjects: null });
  };

  handleOpenLinksMenu = (event) => {
    this.setState({ anchorElLinks: event.currentTarget });
  };

  handleCloseLinksMenu = () => {
    this.setState({ anchorElLinks: null });
  };



  handleCloseNavMenu = () => {
    this.setState({ anchorElNav: null });
  };

  handleCloseUserMenu = () => {
    this.setState({ anchorElUser: null });
  };

  handleCloseCertificatesMenu = () => {
    this.setState({ anchorElCertificates: null });
  };

  // handleOpenProjectsMenu = (event) => {
  //   this.setState({ anchorElProjects: event.currentTarget });
  // };

  // handleCloseProjectsMenu = () => {
  //   this.setState({ anchorElProjects: null });
  // };

  // handleCloseNavMenuLinks = (page) => {
  //   if (page === 'Projects') {
  //     this.props.navigate('/personal');
  //   }
  //   this.handleCloseNavMenu();
  // };

  getProjects = () => {
  // this.setState({ loading: true });
  axios.get(`http://localhost:5153/projects/getProject/1`)
  .then(response => {
    this.setState({ project: response.data});
  })
  .catch(error => {
    const errorMessage = error.response?.data || 'An error occurred';
    this.props.enqueueSnackbar(errorMessage, {
      variant: 'error',
    });
  })
  .finally(() => {
    // this.setState({ loading: false });
  });
  }

  componentDidUpdate = () =>{
  // getUserDetails = () =>{
    axios.get(`http://localhost:5149/details/getDetails/1`)
    .then(response => {
      let links = {...this.state.links};
  if (typeof response.data.links === 'string') {
    links = response.data.links.split(','); // Convert string to array
  } else if (Array.isArray(response.data.links)) {
    links = response.data.links; // Already an array
  }
      this.setState({ userDetails : response.data, links : links, loading: false });
        // this.setState({ loading: false })
    })
    .catch(error => {
      const errorMessage = error.response?.data || 'An error occurred';
      this.props.enqueueSnackbar(errorMessage, {
        variant: 'error',
      });
    })
    .finally(() => {
      // this.setState({ loading: false });
    });
  }

  componentDidMount(){
    this.setState({ loading: true });
    this.getProjects();
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

  fetchFile = async (fileId) => {
    try {
        let newWindow; 
            // Make the axios request to fetch the file as a blob
            const response = await axios.get(`http://localhost:5153/certificates/getCertificates/files/${fileId}`, {
                responseType: 'blob',  // Important: Fetch the file as binary data (blob)
            });

            // Create a URL for the file Blob
            const fileBlob = new Blob([response.data], { type: response.headers['content-type'] });
            const fileURL = URL.createObjectURL(fileBlob);

            // Open the file based on its MIME type
            const mimeType = response.headers['content-type'];
            if (mimeType.startsWith('image/')) {
                // Open image in a new tab
                newWindow = window.open(); // Create newWindow for image
                newWindow.document.write(`<img src="${fileURL}" style="width:100%; height:auto;" />`);
            } else if (mimeType === 'application/pdf') {
                // Open PDF in a new tab
                window.open(fileURL, '_blank');
            } else if (mimeType.startsWith('text/') || mimeType === 'application/json') {
                // Open text or JSON files
                newWindow = window.open(); // Create newWindow for text
                const reader = new FileReader();
                reader.onload = () => {
                    newWindow.document.write(`<pre>${reader.result}</pre>`);
                };
                reader.readAsText(fileBlob);
            } else {
                // For other file types, simply download or open as binary
                window.open(fileURL, '_blank');
            }

            // Optionally, update the state if you want to keep track of the file URL and type
            this.setState({
                fileURL: fileURL,
                fileType: mimeType,
            });

            // Clean up the URL after use (optional, but recommended)
            if (newWindow) {
                newWindow.onload = () => {
                    URL.revokeObjectURL(fileURL);  // Clean up the URL to free memory
                };
        }
    } catch (error) {
        const errorMessage = error.response?.data || 'An error occurred';
        this.props.enqueueSnackbar(errorMessage, {
            variant: 'error',
        });
    }
};


  render() {
    const { anchorElNav, anchorElUser, anchorElCertificates, anchorElProjects, anchorElLinks, selection, project, userDetails, links } = this.state;

    return (
      <React.Fragment>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '70%' }}>
              <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',   // This sets the text color to inherit from its parent
                    textDecoration: 'none',
                    whiteSpace: 'normal' // Ensures wrapping for long text
                  }}
                >
                  {userDetails.name ? userDetails.name : "Your Name"}
                </Typography>
                <Typography sx={{ whiteSpace: 'normal' }}>{userDetails.designation ? userDetails.designation : "Yourd Designation " }</Typography>
              </Link>
            </div>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

            {pages.map((page) => (
  <div key={page}>
    {page === 'Certificates' ? (
      <>
        <Button
          onClick={this.handleOpenCertificatesMenu}
          sx={{ my: 2, color: 'white', display: 'block' }}
        >
          {page}
        </Button>
        <Menu
          anchorEl={anchorElCertificates}
          open={Boolean(anchorElCertificates)}
          onClose={this.handleCloseCertificatesMenu}
        >
            {( selection.length > 0) ? (
        selection.map((select) => (
          <MenuItem 
          key={select.fileName}
          onClick={() => this.fetchFile(select.id)}
          >
            {select.fileName}
          </MenuItem>
        ))
      ) : (
        <MenuItem disabled>No certificates added</MenuItem>  // Show a message if links are empty
      )}
        </Menu>
      </>
    ) : page === 'Projects' ? (
      <>
        <Button
          onClick={this.handleOpenProjectsMenu}
          sx={{ my: 2, color: 'white', display: 'block' }}
        >
          {page}
        </Button>
        <Menu
          anchorEl={anchorElProjects}
          open={Boolean(anchorElProjects)}
          onClose={this.handleCloseProjectsMenu}
        >
           {( project.length > 0) ? (
        project.map((proj) => (
          <MenuItem 
            key={proj}
          >
            {proj.projectName}
          </MenuItem>
        ))
      ) : (
        <MenuItem disabled>No projects added</MenuItem>  // Show a message if links are empty
      )}
        </Menu>
      </>
    ) : page === 'Links' ? (
      <>
        <Button
          onClick={this.handleOpenLinksMenu}
          sx={{ my: 2, color: 'white', display: 'block' }}
        >
          {page}
        </Button>
        <Menu
          anchorEl={anchorElLinks}
          open={Boolean(anchorElLinks)}
          onClose={this.handleCloseLinksMenu}
        >
         {(Array.isArray(links) && links.length > 0) ? (
        links.map((link, index) => (
          <MenuItem 
            key={index}
            onClick={() => window.open(link, '_blank')} // Open link in a new tab
          >
            {link}
          </MenuItem>
        ))
      ) : (
        <MenuItem disabled>No links added</MenuItem>  // Show a message if links are empty
      )}
        </Menu>
      </>
    ) : null}
  </div>
))}


            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={this.handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp"  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={this.handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={this.handleCloseUserMenu}>
                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </React.Fragment>
  );
}
}

function WithNavigate(props) {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <ResponsiveAppBar {...props} routeParams={params} navigate={navigate} />
  );
}

export default withSharedSnackbar(WithNavigate);
