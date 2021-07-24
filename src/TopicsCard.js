import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Pie } from 'react-chartjs-2';
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';

import { useStyles } from './styles';

const TopicsCard = props => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Box>
          <Typography variant="h5" component="h2">
            Topic Extraction
          </Typography>
        </Box>

        <Box flexGrow={1}>
          <Pie
            data={props.topicsPieChart.pieData}
            options={props.topicsPieChart.pieChartOptions}
            width={400}
            height={400}
          />
        </Box>

        <Box className={classes.buttonCard}>
          {props.loadingTopics && <CircularProgress size={24} />}
          {!props.loadingTopics && (
            <Button
              variant="contained"
              color="primary"
              disabled={props.disableButtons}
              onClick={props.fetchTopics}
            >
              Load
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TopicsCard;
