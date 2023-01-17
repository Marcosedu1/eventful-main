export function decodeJWTPayload(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");

  return JSON.parse(
    typeof window !== "undefined"
      ? window.atob(base64)
      : Buffer.from(base64, "base64").toString()
  );
}

export function isTokenExpired(token: string) {
  const payload = decodeJWTPayload(token);

  if (payload?.exp) {
    const tokenExpiresOn = (payload.exp - 15) * 1000;

    return new Date() > new Date(tokenExpiresOn);
  }

  return false;
}