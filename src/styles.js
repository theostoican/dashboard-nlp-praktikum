import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  card: {
    height: 500,
    width: 400
  },
  cardContent: {
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  inputquery: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  querybox: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400
  },
  margin: {
    height: theme.spacing(3)
  },
  slidercontainer: {
    width: 300
  },
  buttonCard: {
    alignSelf: 'flex-end'
  },
  typographyStyle: {
    overflowY: 'auto'
  }
}));
