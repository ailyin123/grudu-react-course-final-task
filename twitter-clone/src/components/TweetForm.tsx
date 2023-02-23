import { ChangeEvent, SyntheticEvent, useState } from 'react';

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
    <form onSubmit={handleSubmit}>
      <textarea
        value={tweetText}
        onChange={handleChange}
        placeholder="What's happenning?"
      />
      <button type="submit">Tweet</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default TweetForm;
