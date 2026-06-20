import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Form, Input, Button, message } from 'antd';
import { profileModel } from '@/features/profile/models';
import styles from './SettingsTab.module.css';

interface ProfileFormValues {
  displayName: string;
  bio: string;
  avatarColor: string;
}

interface PasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const SettingsTab = observer(() => {
  const [profileForm] = Form.useForm<ProfileFormValues>();
  const [passwordForm] = Form.useForm<PasswordFormValues>();
  const [emailInput, setEmailInput] = useState('');
  const [emailSaving, setEmailSaving] = useState(false);

  const { profile, isSaving, saveSuccess, error } = profileModel;

  // Pre-fill profile form when profile loads
  useEffect(() => {
    if (profile) {
      profileForm.setFieldsValue({
        displayName: profile.displayName,
        bio: profile.bio,
        avatarColor: profile.avatarColor,
      });
    }
  }, [profile, profileForm]);

  // Show success message and clear state after saving profile
  useEffect(() => {
    if (saveSuccess) {
      message.success('Профиль обновлён');
      profileModel.clearSaveState();
    }
  }, [saveSuccess]);

  const handleProfileSave = async (values: ProfileFormValues) => {
    await profileModel.updateProfile({
      displayName: values.displayName,
      bio: values.bio,
      avatarColor: values.avatarColor,
    });
  };

  const handleEmailBind = async () => {
    if (!emailInput.trim()) return;
    setEmailSaving(true);
    await profileModel.updateEmail(emailInput.trim());
    setEmailSaving(false);
    if (!profileModel.error) {
      message.success('Email привязан');
      setEmailInput('');
    }
  };

  const handlePasswordChange = async (values: PasswordFormValues) => {
    await profileModel.updatePassword(
      values.currentPassword,
      values.newPassword
    );
    if (!profileModel.error) {
      message.success('Пароль изменён');
      passwordForm.resetFields();
    }
  };

  // Live preview: watch avatarColor field
  const avatarColorValue = Form.useWatch('avatarColor', profileForm);
  const previewColor = avatarColorValue ?? profile?.avatarColor ?? '#3C241C';
  const previewInitials = profile?.avatarInitials ?? '??';

  return (
    <div className={styles.root}>
      {/* ── Секция 1: Основная информация ── */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Основная информация</h3>

        <Form
          form={profileForm}
          layout="vertical"
          onFinish={handleProfileSave}
          className={styles.form}
        >
          <Form.Item
            name="displayName"
            label="Отображаемое имя"
            rules={[{ required: true, message: 'Введите имя' }]}
          >
            <Input placeholder="Ваше имя" />
          </Form.Item>

          <Form.Item name="bio" label="О себе">
            <Input.TextArea rows={4} placeholder="Расскажите о себе..." />
          </Form.Item>

          <Form.Item name="avatarColor" label="Цвет аватарки">
            <div className={styles.colorRow}>
              <input
                type="color"
                className={styles.colorPicker}
                value={previewColor}
                onChange={e =>
                  profileForm.setFieldValue('avatarColor', e.target.value)
                }
              />
              <div
                className={styles.avatarPreview}
                style={{ backgroundColor: previewColor }}
              >
                {previewInitials}
              </div>
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              loading={isSaving}
              className={styles.submitBtn}
            >
              Сохранить изменения
            </Button>
          </Form.Item>
        </Form>
      </section>

      <hr className={styles.divider} />

      {/* ── Секция 2: Безопасность ── */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Безопасность</h3>

        {/* Email */}
        <div className={styles.subsection}>
          <h4 className={styles.subsectionTitle}>Email</h4>

          {profile?.email ? (
            <div className={styles.emailRow}>
              <span className={styles.emailValue}>{profile.email}</span>
              <span className={styles.emailVerifiedBadge}>✓ Привязан</span>
            </div>
          ) : (
            <div className={styles.emailBindRow}>
              <p className={styles.noEmail}>Email не привязан</p>
              <div className={styles.emailInputRow}>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={emailInput}
                  onChange={e => setEmailInput(e.target.value)}
                  onPressEnter={handleEmailBind}
                  className={styles.emailInput}
                />
                <Button
                  onClick={handleEmailBind}
                  loading={emailSaving}
                  className={styles.submitBtn}
                >
                  Привязать
                </Button>
              </div>
            </div>
          )}
        </div>

        <hr className={styles.divider} />

        {/* Password */}
        <div className={styles.subsection}>
          <h4 className={styles.subsectionTitle}>Пароль</h4>

          <Form
            form={passwordForm}
            layout="vertical"
            onFinish={handlePasswordChange}
            className={styles.form}
          >
            <Form.Item
              name="currentPassword"
              label="Текущий пароль"
              rules={[{ required: true, message: 'Введите текущий пароль' }]}
            >
              <Input.Password placeholder="••••••••" />
            </Form.Item>

            <Form.Item
              name="newPassword"
              label="Новый пароль"
              rules={[
                { required: true, message: 'Введите новый пароль' },
                { min: 6, message: 'Минимум 6 символов' },
              ]}
            >
              <Input.Password placeholder="••••••••" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Повторите пароль"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: 'Повторите новый пароль' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Пароли не совпадают'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="••••••••" />
            </Form.Item>

            {error && <p className={styles.errorText}>{error}</p>}

            <Form.Item>
              <Button
                htmlType="submit"
                loading={isSaving}
                className={styles.submitBtn}
              >
                Изменить пароль
              </Button>
            </Form.Item>
          </Form>
        </div>
      </section>
    </div>
  );
});
