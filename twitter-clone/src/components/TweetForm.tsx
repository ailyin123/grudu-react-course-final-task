import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { Box, Grid, TextField, Button } from '@mui/material';

interface TweetFormProps {
  onAddTweet: (tweetText: string) => void;
}

const TweetForm = ({ onAddTweet }: TweetFormProps) => {
  const [tweetText, setTweetText] = useState('');
  const [error, setError] = useState<string | null>(null)

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTweetText(event.target.value);
  }

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    setError(null);

    if (tweetText.length < 1 || tweetText.length > 140) {
      setError('Tweet text should be between 1 and 140 characters long');

      return;
    }

    onAddTweet(tweetText);

    setTweetText('');
  }

  return (
    <Box my={3}>
      <form onSubmit={handleSubmit}>
        <TextField
          value={tweetText}
          onChange={handleChange}
          multiline
          label="What's happenning?"
          fullWidth
          error={!!error}
          helperText={error}
        />
        <Grid container mt={2} justifyContent="right">
          <Button type="submit" variant="contained">Tweet</Button>
        </Grid>
      </form>
    </Box>
  );
}

export default TweetForm;
