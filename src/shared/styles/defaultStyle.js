import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    tableCell:{
        fontFamily: 'inherit',
        fontSize:'small',
        maxWidth: '250px',
        overflow: 'auto',
        wordBreak:'break-word'
    },
    containedbutton: {
        fontFamily:'inherit',
        cursor: 'pointer',
        width : '100%'
    },
    tableHeaderRow:{
        backgroundColor: '#e0e0d1'
    },
    tableHeaderCells: {
        fontFamily: 'inherit',
        backgroundColor: '#e0e0d1',
        fontSize:'small',
        color: 'white'
    },
    tableForm:{
        backgroundColor: '#f7f7f7',
        lineHeight:'5',
        paddingBottom: '0',
        paddingTop: '0',
        fontFamily:'inherit',
        width : '100%'
    }
})
);