export type IUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail?: string;
  password: string;
  confirmPassword?: string;
  cpf: string;
  birthdate: string;
  genre: "" | 1 | 2;
  acceptedTerms: boolean;
}

export type ILoggedUser = {
  name: string;
  email: string;
  expires: number;
}