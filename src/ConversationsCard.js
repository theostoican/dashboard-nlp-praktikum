import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { useStyles } from './styles';

const ConversationsCard = props => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography variant="h5" component="h2">
          Original Conversations
        </Typography>
        <Typography
          className={classes.typographyStyle}
          variant="body2"
          component="p"
        >
          {props.activeConversation}
          <br />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ConversationsCard;
