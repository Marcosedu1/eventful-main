export type IUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  cpf: number;
  birthdate: string;
  genre: number;
  acceptedTerms: boolean;
}