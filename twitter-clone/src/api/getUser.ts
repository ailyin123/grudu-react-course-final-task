export const getUser = async (id: string) => {
  const result = await fetch(`http://localhost:3001/users/${id}`);

  if (result.ok) {
    return result.json();
  } else {
    throw new Error('Something went wrong');
  }
}
