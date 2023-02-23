export const getTweets = async () => {
  const result = await fetch('http://localhost:3001/tweets');

  if (result.ok) {
    return result.json();
  } else {
    throw new Error('Something went wrong');
  }
}
