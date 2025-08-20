export function validateEmail(email: string) {
  return Boolean(
    email &&
      email.includes("@") &&
      email.length < 255,
  );
}
