export function validateCpf(cpf: string | undefined): boolean {
  if (cpf?.length != 11) {
    return false;
  }

  let equal: boolean = true;

  for (let i = 1; i < 11 && equal; i++) {
    if (cpf[i] != cpf[0]) {
      equal = false;
    }
  }

  if (equal || cpf == "12345678909") {
    return false;
  }

  let numbers: number[] = [];

  for (let i = 0; i < 11; i++) {
    numbers[i] = Number(cpf[i].toString());
  }

  let sum: number = 0;

  for (let i = 0; i < 9; i++) {
    sum += (10 - i) * numbers[i];
  }

  let result: number = sum % 11;

  if (result == 1 || result == 0) {
    if (numbers[9] != 0) {
      return false;
    }
  } else if (numbers[9] != 11 - result) {
    return false;
  }

  sum = 0;

  for (let i = 0; i < 10; i++) {
    sum += (11 - i) * numbers[i];
  }

  result = sum % 11;

  if (result == 1 || result == 0) {
    if (numbers[10] != 0) {
      return false;
    }
  } else {
    if (numbers[10] != 11 - result) {
      return false;
    }
  }
  return true;
}
