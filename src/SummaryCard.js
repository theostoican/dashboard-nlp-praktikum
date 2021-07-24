import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';

import { useStyles } from './styles';

const SummaryCard = props => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Box>
          <Typography variant="h5" component="h2">
            Text Summarization
          </Typography>
        </Box>
        <Box flexGrow={1} className={classes.typographyStyle}>
          <Typography variant="body2" component="p">
            {props.activeSummary}
            <br />
          </Typography>
        </Box>
        <Box className={classes.buttonCard}>
          {props.loadingSummaries && <CircularProgress size={24} />}
          {!props.loadingSummaries && (
            <Button
              variant="contained"
              color="primary"
              disabled={props.disableButtons}
              onClick={props.fetchSummaries}
            >
              Load
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
