import React, { useEffect, useState } from 'react';
import { getTweets } from '../../api/getTweets';
import { Tweet } from './types';

const Tweets = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const tweets = await getTweets();
      
      setTweets(tweets);
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) return <h1>Loading...</h1>

  return (
    <div>
      {tweets.length > 0 ? 
        tweets.map(tweet => 
          <div key={tweet.id}>
            <p>{tweet.author_id}</p>
            <p>{tweet.text}</p>
          </div>
        ) :
        <h1>No tweets</h1>
      }
    </div>
  );
}

export default Tweets;
