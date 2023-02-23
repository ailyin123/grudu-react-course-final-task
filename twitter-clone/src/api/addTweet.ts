import { TweetData } from './types';

export const addTweet = async (data: TweetData) => {
  const result = await fetch('http://localhost:3001/tweets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (result.ok) {
    return result.json();
  } else {
    throw new Error('Something went wrong');
  }
}
