import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sanitize from 'sanitize-html';
import { Container, Card, CardHeader, CardContent, Avatar, Box, Typography } from '@mui/material';

import stringAvatar from '../../utils/stringAvatar';
import { addTweet } from '../../api/addTweet';
import { getTweets } from '../../api/getTweets';
import { getUsers } from '../../api/getUsers';
import { UserContext } from '../../App';
import TweetForm from '../../components/TweetForm';
import { Tweet, User } from './types';

const Tweets = () => {
  const { user } = useContext(UserContext);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
    if (!user) {
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
    <Container sx={{ width: '600px' }}>
      <TweetForm onAddTweet={handleAddTweet} />
      {tweets.length > 0 ? 
        tweets.map(tweet => {
          const tweetAuthor = users.find(user => user.id === tweet.author_id);

          return (
            <Box mb={2} key={tweet.id}>
              <Card variant="outlined">
                <CardHeader
                  avatar={<Avatar {...stringAvatar(tweetAuthor!.name)} />}
                  title={tweetAuthor!.name}
                />
                <CardContent>
                  <Typography dangerouslySetInnerHTML={{ __html: sanitize(tweet.text) }}/>
                </CardContent>
              </Card>
            </Box>
          )}
        ) :
        <h1>No tweets</h1>
      }
    </Container>
  );
}

export default Tweets;
