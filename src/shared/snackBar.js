import React from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';

// This is a simple wrapper to pass down the snackbar functionality
export const withSharedSnackbar = (WrappedComponent) => (props) => {
  const { enqueueSnackbar } = useSnackbar();

  return <WrappedComponent {...props} enqueueSnackbar={enqueueSnackbar} />;
};

// The provider component that wraps your application or specific part of it
export const SharedSnackbarProvider = ({ children }) => (
  <SnackbarProvider maxSnack={3}>
    {children}
  </SnackbarProvider>
);

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { SnackbarProvider, useSnackbar  } from 'notistack';

// export default function MyComponent() {
//     const { enqueueSnackbar } = useSnackbar();
  
//     const handleClick = () => {
//       enqueueSnackbar('This is a notification message!', { 
//         variant: 'success', // or 'error', 'warning', 'info'
//       });
//     };
  
//     return (
//       <React.Fragment>
//         {/* <Button onClick={handleClick}>Show Snackbar</Button> */}
//       </React.Fragment>
//     );
//   }