import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sanitize from 'sanitize-html';
import { addTweet } from '../../api/addTweet';

import { getTweets } from '../../api/getTweets';
import { getUsers } from '../../api/getUsers';
import TweetForm from '../../components/TweetForm';
import { Tweet, User } from './types';

const Tweets = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem('authId');

  const handleAddTweet = (tweetText: string) => {
    (async () => {
      try {
        await addTweet({
          author_id: localStorage.getItem('authId')!,
          text: tweetText
        });
        
        const tweets = await getTweets();
      
        setTweets(tweets);
      } catch (e) {
        alert(e);
      }
    })();
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');

      return;
    }

    (async () => {
      setIsLoading(true);

      const tweets = await getTweets();
      const users = await getUsers();
      
      setUsers(users);
      setTweets(tweets);
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) return <h1>Loading...</h1>

  return (
    <div>
      <TweetForm onAddTweet={handleAddTweet} />
      {tweets.length > 0 ? 
        tweets.map(tweet => 
          <div key={tweet.id}>
            <p>{users.find(user => user.id === tweet.author_id)?.name}</p>
            <div dangerouslySetInnerHTML={{ __html: sanitize(tweet.text) }}/>
          </div>
        ) :
        <h1>No tweets</h1>
      }
    </div>
  );
}

export default Tweets;
