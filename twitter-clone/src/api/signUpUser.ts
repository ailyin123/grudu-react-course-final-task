import { UserData } from "./types";

export const signUpUser = async (data: UserData) => {
  const result = await fetch('http://localhost:3001/users', {
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
