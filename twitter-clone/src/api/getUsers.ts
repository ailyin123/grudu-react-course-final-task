export const getUsers = async () => {
  const result = await fetch('http://localhost:3001/users');

  if (result.ok) {
    return result.json();
  } else {
    throw new Error('Something went wrong');
  }
}
