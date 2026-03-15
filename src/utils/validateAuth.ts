const validateUsername = (_: any, value: string) => {
  if (!value) {
    return Promise.reject(new Error('Имя не должно быть пустым'));
  }
  if (value.length < 3) {
    return Promise.reject(new Error('Имя должно содержать минимум 3 символа'));
  }
  if (value.length > 20) {
    return Promise.reject(
      new Error('Имя должно содержать не более 20 символов')
    );
  }
  if (!/^[a-zA-Z0-9_]+$/.test(value)) {
    return Promise.reject(
      new Error('Имя может содержать только латинские буквы или цифры')
    );
  }
  return Promise.resolve();
};

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

const validateRoleSelector = (_: any, value: string) => {
  if (!value) {
    return Promise.reject(new Error('Роль должна быть выбрана'));
  }

  return Promise.resolve();
};

const validatePassword = (_: any, value: string) => {
  if (!value) {
    return Promise.reject(new Error('Пароль не должен быть пустым'));
  }

  const failedRule = PASSWORD_RULES_CHECK.find(rule => !rule.check(value));

  if (failedRule) {
    return Promise.reject(new Error(failedRule.message));
  }

  return Promise.resolve();
};

export const calculatePasswordStrength = (password: string): number => {
  if (!password) return 0;

  const totalRules = PASSWORD_RULES_CHECK.length;
  const passedRules = PASSWORD_RULES_CHECK.filter(rule =>
    rule.check(password)
  ).length;

  return Math.round((passedRules / totalRules) * 100);
};

export const usernameValidationRules = [{ validator: validateUsername }];

export const passwordValidationRules = [{ validator: validatePassword }];

export const checkRoleSelected = [{ validator: validateRoleSelector }];
