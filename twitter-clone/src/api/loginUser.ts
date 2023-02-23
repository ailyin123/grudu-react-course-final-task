import { LoginData } from "./types";

export const loginUser = async (data: LoginData) => {
  const result = await fetch(`http://localhost:3001/users/${data.email}`);

  if (result.ok) {
    return result.json();
  } else if (result.status === 404) {
    throw new Error('NotFound');
  } else {
    throw new Error('Someting went wrong');
  }
}
