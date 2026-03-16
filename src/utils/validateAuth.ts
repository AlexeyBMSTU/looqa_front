// Правила для проверки сложности пароля
const PASSWORD_RULES_CHECK = [
  {
    check: (value: string) => value.length >= 6,
    message: 'Минимум 6 символов',
  },
  {
    check: (value: string) => /[a-z]/.test(value),
    message: 'Хотя бы одну строчную букву',
  },
  {
    check: (value: string) => /[A-Z]/.test(value),
    message: 'Хотя бы одну заглавную букву',
  },
  {
    check: (value: string) => /\d/.test(value),
    message: 'Хотя бы одну цифру',
  },
  {
    check: (value: string) => /[^a-zA-Z\d]/.test(value),
    message: 'Хотя бы один специальный символ',
  },
];

export const calculatePasswordStrength = (password: string): number => {
  if (!password) return 0;

  const totalRules = PASSWORD_RULES_CHECK.length;
  const passedRules = PASSWORD_RULES_CHECK.filter(rule =>
    rule.check(password)
  ).length;

  return Math.round((passedRules / totalRules) * 100);
};
