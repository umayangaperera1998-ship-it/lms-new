export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^[0-9]{10,15}$/;

export function isValidEmail(email: string): boolean {
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  return phoneRegex.test(phone);
}

export function isStrongPassword(password: string): boolean {
  return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password);
}
