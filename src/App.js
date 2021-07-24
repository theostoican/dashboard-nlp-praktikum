import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Slider from '@material-ui/core/Slider';
import { CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Pie } from 'react-chartjs-2';
import { useStyles } from './styles';
import ConversationsCard from './ConversationsCard';
import TopicsCard from './TopicsCard';
import SummaryCard from './SummaryCard';

export default function App() {
  var inputQuery = '';

  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
  const [conversationNumber, setConversationNumber] = React.useState(0);
  const [maxConversationNumber, setMaxConversationNumber] = React.useState(0);
  const [conversations, setConversations] = React.useState(null);
  const [
    hierarchicalConversations,
    setHierarchicalConversations
  ] = React.useState(null);
  const [activeConversation, setActiveConversation] = React.useState(null);
  const [disableButtons, setDisableButtons] = React.useState(true);
  const [loadingConversations, setLoadingConversations] = React.useState(false);

  const [loadingSummaries, setLoadingSummaries] = React.useState(false);
  const [activeSummary, setActiveSummary] = React.useState(null);
  const [convIdToSummary, setConvIdToSummary] = React.useState(null);

  const [loadingTopics, setLoadingTopics] = React.useState(false);
  const [convIdToTopicProbs, setConvIdToTopicProbs] = React.useState(null);
  const [idxToTopicLabel, setIdxToTopicLabel] = React.useState(null);
  const [topicsPieChart, setTopicsPieChart] = React.useState({
    name: 'topicsPieChart',
    pieData: {
      labels: [],
      datasets: [
        {
          backgroundColor: [
            'rgba(255, 0, 0, 0.7)',
            'rgba(255, 100, 50, 0.7)',
            'rgba(10, 100, 200, 0.7)',
            'rgba(20, 110, 250, 0.7)',
            'rgba(50, 210, 350, 0.7)',
            'rgba(255, 100, 255, 0.7)',
            'rgba(250, 200, 10, 0.7)'
          ],
          borderColor: [
            'rgba(255, 0, 0, 0.7)',
            'rgba(255, 100, 50, 0.7)',
            'rgba(10, 100, 200, 0.7)',
            'rgba(20, 110, 250, 0.7)',
            'rgba(50, 210, 350, 0.7)',
            'rgba(255, 100, 255, 0.7)',
            'rgba(250, 200, 10, 0.7)'
          ],
          data: []
        }
      ]
    },
    pieChartOptions: {
      maintainAspectRatio: true,
      legend: {
        position: 'bottom'
      }
    }
  });

  const handleSliderChange = (event, newConversationNumber) => {
    const conversationId = Object.keys(conversations[newConversationNumber])[0];
    setConversationNumber(newConversationNumber);

    setActiveConversation(
      Object.values(conversations[newConversationNumber])[0].map(
        (line, idx) => (
          <span key={idx}>
            {line}
            <br />
          </span>
        )
      )
    );
    if (convIdToSummary && conversationId in convIdToSummary) {
      setActiveSummary(convIdToSummary[conversationId]);
    } else {
      setActiveSummary(null);
    }
    if (convIdToTopicProbs) {
      setTopicsPieChart({
        name: 'topicsPieChart',
        pieData: {
          labels: Object.values(idxToTopicLabel),
          datasets: [
            {
              backgroundColor: [
                'rgba(255, 0, 0, 0.7)',
                'rgba(255, 100, 50, 0.7)',
                'rgba(10, 100, 200, 0.7)',
                'rgba(20, 110, 250, 0.7)',
                'rgba(50, 210, 350, 0.7)',
                'rgba(255, 100, 255, 0.7)',
                'rgba(250, 200, 10, 0.7)'
              ],
              borderColor: [
                'rgba(255, 0, 0, 0.7)',
                'rgba(255, 100, 50, 0.7)',
                'rgba(10, 100, 200, 0.7)',
                'rgba(20, 110, 250, 0.7)',
                'rgba(50, 210, 350, 0.7)',
                'rgba(255, 100, 255, 0.7)',
                'rgba(250, 200, 10, 0.7)'
              ],
              data:
                convIdToTopicProbs[
                  Object.keys(conversations[newConversationNumber])[0]
                ]
            }
          ]
        },
        pieChartOptions: {
          maintainAspectRatio: true,
          legend: {
            position: 'bottom'
          }
        }
      });
    }
  };

  const handleInputChange = event => {
    setConversationNumber(
      event.target.value === '' ? '' : Number(event.target.value)
    );
    setActiveConversation(
      Object.values(conversations[conversationNumber])[0].map((line, idx) => (
        <span key={idx}>
          {line}
          <br />
        </span>
      ))
    );
    if (convIdToTopicProbs) {
      setTopicsPieChart({
        name: 'topicsPieChart',
        pieData: {
          labels: Object.values(idxToTopicLabel),
          datasets: [
            {
              backgroundColor: [
                'rgba(255, 0, 0, 0.7)',
                'rgba(255, 100, 50, 0.7)',
                'rgba(10, 100, 200, 0.7)',
                'rgba(20, 110, 250, 0.7)',
                'rgba(50, 210, 350, 0.7)',
                'rgba(255, 100, 255, 0.7)',
                'rgba(250, 200, 10, 0.7)'
              ],
              borderColor: [
                'rgba(255, 0, 0, 0.7)',
                'rgba(255, 100, 50, 0.7)',
                'rgba(10, 100, 200, 0.7)',
                'rgba(20, 110, 250, 0.7)',
                'rgba(50, 210, 350, 0.7)',
                'rgba(255, 100, 255, 0.7)',
                'rgba(250, 200, 10, 0.7)'
              ],
              data:
                convIdToTopicProbs[
                  Object.keys(conversations[conversationNumber])[0]
                ]
            }
          ]
        },
        pieChartOptions: {
          maintainAspectRatio: true,
          legend: {
            position: 'bottom'
          }
        }
      });
    }
  };

  const handleBlur = () => {
    if (conversationNumber < 0) {
      setConversationNumber(0);
    } else if (conversationNumber > 100) {
      setConversationNumber(100);
    }
  };

  const flatten_tree = (root, tweets_list) => {
    tweets_list.push(root['username'] + ': ' + root['text']);
    if (
      !('replies' in root) ||
      ('replies' in root && root['replies'].length == 0)
    ) {
      return;
    }
    for (const reply of root['replies']) {
      flatten_tree(reply, tweets_list);
    }
  };

  const flatten_conversations = conversations_list => {
    let conv_list = [];

    for (const conv_dict of conversations_list) {
      let tweets_list = [];
      let conv_id = Object.keys(conv_dict)[0];
      let conv_root = Object.values(conv_dict)[0];

      flatten_tree(conv_root, tweets_list);
      conv_list.push({ [conv_id]: tweets_list });
    }

    return conv_list;
  };

  const fetchConversations = () => {
    if (!inputQuery) {
      alert('Please provide input!');
      return;
    }
    setDisableButtons(true);
    setLoadingConversations(true);
    setActiveConversation(null);
    setConversations([]);
    setConversationNumber(0);

    setActiveSummary(null);
    setConvIdToSummary(null);

    setConvIdToTopicProbs(null);
    setIdxToTopicLabel(null);
    setTopicsPieChart({});

    fetch('http://127.0.0.1:8787/search?query=' + inputQuery)
      .then(response => response.json())
      .then(data => {
        setLoadingConversations(false);

        setHierarchicalConversations(data['conversations']);

        console.log(data['conversations']);

        let flattened_conversations = flatten_conversations(
          data['conversations']
        );
        setActiveConversation(
          Object.values(flattened_conversations[conversationNumber])[0].map(
            (line, idx) => (
              <span key={idx}>
                {line}
                <br />
              </span>
            )
          )
        );
        setConversations(flattened_conversations);
        setMaxConversationNumber(flattened_conversations.length - 1);

        setDisableButtons(false);
      });
  };

  const fetchTopics = () => {
    setLoadingTopics(true);
    console.log(conversations);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        conversations: conversations
      })
    };
    fetch('http://127.0.0.1:8787/topics?num_topics=10', requestOptions)
      .then(response => response.json())
      .then(data => {
        setLoadingTopics(false);
        console.log(data);
        setConvIdToTopicProbs(data['topics']);
        setIdxToTopicLabel(data['index_to_topic']);
        setTopicsPieChart({
          name: 'topicsPieChart',
          pieData: {
            labels: Object.values(data['index_to_topic']),
            datasets: [
              {
                backgroundColor: [
                  'rgba(255, 0, 0, 0.7)',
                  'rgba(255, 100, 50, 0.7)',
                  'rgba(10, 100, 200, 0.7)',
                  'rgba(20, 110, 250, 0.7)',
                  'rgba(50, 210, 350, 0.7)',
                  'rgba(255, 100, 255, 0.7)',
                  'rgba(250, 200, 10, 0.7)'
                ],
                borderColor: [
                  'rgba(255, 0, 0, 0.7)',
                  'rgba(255, 100, 50, 0.7)',
                  'rgba(10, 100, 200, 0.7)',
                  'rgba(20, 110, 250, 0.7)',
                  'rgba(50, 210, 350, 0.7)',
                  'rgba(255, 100, 255, 0.7)',
                  'rgba(250, 200, 10, 0.7)'
                ],
                data:
                  data['topics'][
                    Object.keys(conversations[conversationNumber])[0]
                  ]
              }
            ]
          },
          pieChartOptions: {
            maintainAspectRatio: true,
            legend: {
              position: 'bottom'
            }
          }
        });
      });
  };

  const fetchSummaries = () => {
    setLoadingSummaries(true);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        conversations: [hierarchicalConversations[conversationNumber]]
      })
    };
    fetch('http://127.0.0.1:8787/summarize', requestOptions)
      .then(response => response.json())
      .then(data => {
        const conversationId = Object.keys(
          conversations[conversationNumber]
        )[0];

        setLoadingSummaries(false);
        if (convIdToSummary) {
          convIdToSummary[conversationId] = Object.values(data['summaries'])[0];
        } else {
          setConvIdToSummary(data['summaries']);
        }
        console.log(data);
        setActiveSummary(data['summaries'][conversationId]);
      });
  };

  return (
    <Grid
      container
      className={classes.root}
      spacing={3}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={12}>
        <Grid container spacing={8} justifyContent="center">
          <Grid item>
            <Paper
              component="form"
              className={classes.querybox}
              onSubmit={event => {
                event.preventDefault();
              }}
            >
              <InputBase
                className={classes.inputquery}
                placeholder="Enter query"
                inputProps={{ 'aria-label': 'search query' }}
                onChange={event => {
                  inputQuery = event.target.value;
                }}
                onKeyDown={event => {
                  if (event.keyCode == 13) {
                    fetchConversations();
                  }
                }}
              />
              <IconButton
                type="button"
                className={classes.iconButton}
                aria-label="search"
                onClick={fetchConversations}
              >
                {loadingConversations && <CircularProgress size={24} />}
                {!loadingConversations && <SearchIcon />}
              </IconButton>
            </Paper>
          </Grid>
          <Grid item>
            <div className={classes.slidercontainer}>
              <Typography id="input-slider" gutterBottom>
                Conversation number
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                  <Slider
                    disabled={disableButtons}
                    value={
                      typeof conversationNumber === 'number'
                        ? conversationNumber
                        : 0
                    }
                    min={0}
                    max={maxConversationNumber}
                    onChange={handleSliderChange}
                    aria-labelledby="input-slider"
                  />
                </Grid>
                <Grid item>
                  <Input
                    disabled={true}
                    className={classes.input}
                    value={conversationNumber}
                    margin="dense"
                    max={maxConversationNumber}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    inputProps={{
                      step: 1,
                      min: 0,
                      max: 10,
                      type: 'number',
                      'aria-labelledby': 'input-slider'
                    }}
                  />
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={spacing}>
          <Grid key="0" item>
            <ConversationsCard activeConversation={activeConversation} />
          </Grid>
          <Grid key="1" item>
            <TopicsCard
              loadingTopics={loadingTopics}
              fetchTopics={fetchTopics}
              disableButtons={disableButtons}
              topicsPieChart={topicsPieChart}
            />
          </Grid>
          <Grid key="2" item>
            <SummaryCard
              loadingSummaries={loadingSummaries}
              fetchSummaries={fetchSummaries}
              disableButtons={disableButtons}
              activeSummary={activeSummary}
            />
            {/* <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Box>
                  <Typography variant="h5" component="h2">
                    Text Summarization
                  </Typography>
                </Box>
                <Box flexGrow={1} className={classes.typographyStyle}>
                  <Typography variant="body2" component="p">
                    {activeSummary}
                    <br />
                  </Typography>
                </Box>
                <Box className={classes.buttonCard}>
                  {loadingSummaries && <CircularProgress size={24} />}
                  {!loadingSummaries && (
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={disableButtons}
                      onClick={fetchSummaries}
                    >
                      Load
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card> */}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
