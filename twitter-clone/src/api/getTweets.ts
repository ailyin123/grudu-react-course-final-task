export const getTweets = async () => {
  const result = await fetch('http://localhost:3001/tweets');

  return result.json();
}
