import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Form, Input, Button, message } from 'antd';
import { profileModel } from '@/features/profile/models';
import { uploadAvatar } from '@/features/upload';
import styles from './SettingsTab.module.css';
import { GENERAL_PORT } from '@/env';

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

  const { profile, isSaving, saveSuccess } = profileModel;

  // Предзаполняем форму профиля
  useEffect(() => {
    if (profile) {
      profileForm.setFieldsValue({
        displayName: profile.displayName,
        bio: profile.bio,
        avatarColor: profile.avatarColor,
      });
    }
  }, [profile, profileForm]);

  // Нотифай после успешного сохранения профиля
  const prevSaveSuccess = useRef(false);
  useEffect(() => {
    if (saveSuccess && !prevSaveSuccess.current) {
      message.success('Профиль обновлён');
      profileModel.clearSaveState();
    }
    prevSaveSuccess.current = saveSuccess;
  }, [saveSuccess]);

  const handleProfileSave = async (values: ProfileFormValues) => {
    await profileModel.updateProfile({
      displayName: values.displayName,
      bio: values.bio,
      avatarColor: values.avatarColor,
    });
  };

  const handleEmailBind = async () => {
    const email = emailInput.trim();
    if (!email) return;
    setEmailSaving(true);
    await profileModel.sendEmailVerification(email);
    setEmailSaving(false);
    // Очищаем поле только если письмо отправлено (состояние изменилось)
    if (profileModel.emailVerificationSent) {
      setEmailInput('');
    }
  };

  const handleRemoveEmail = async () => {
    setEmailSaving(true);
    await profileModel.removeEmail();
    setEmailSaving(false);
  };

  const handlePasswordChange = async (values: PasswordFormValues) => {
    const ok = await profileModel.updatePassword(
      values.currentPassword,
      values.newPassword
    );
    if (ok) passwordForm.resetFields();
  };

  const [avatarUploading, setAvatarUploading] = useState(false);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';
    if (file.size > 5 * 1024 * 1024) {
      message.error('Аватарка должна быть не более 5MB');
      return;
    }
    setAvatarUploading(true);
    try {
      const res = await uploadAvatar(file);
      await profileModel.updateProfile({ avatarUrl: res.url });
    } catch {
      message.error('Не удалось загрузить аватарку');
    } finally {
      setAvatarUploading(false);
    }
  };

  const handleRemoveAvatar = () =>
    profileModel.updateProfile({ avatarUrl: '' });

  const avatarColorValue = Form.useWatch('avatarColor', profileForm);
  const previewColor = avatarColorValue ?? profile?.avatarColor ?? '#3C241C';
  const previewInitials = profile?.avatarInitials ?? '??';

  return (
    <div className={styles.root}>
      {/* ── Основная информация ── */}
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

          <Form.Item name="avatarColor" label="Аватарка">
            <div className={styles.avatarSection}>
              {/* Превью */}
              <div
                className={styles.avatarPreviewLarge}
                style={{
                  backgroundColor: previewColor,
                  backgroundImage: profile?.avatarUrl
                    ? `url(${GENERAL_PORT}${profile.avatarUrl})`
                    : undefined,
                }}
              >
                {!profile?.avatarUrl && previewInitials}
              </div>

              <div className={styles.avatarControls}>
                {/* Загрузка фото */}
                <label
                  className={`${styles.avatarUploadBtn} ${avatarUploading ? styles.avatarUploadBtnDisabled : ''}`}
                >
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/gif,image/webp"
                    className={styles.fileInput}
                    disabled={avatarUploading}
                    onChange={handleAvatarUpload}
                  />
                  {avatarUploading
                    ? '⏳ Загружается...'
                    : '🖼 Загрузить фото / GIF'}
                </label>

                {/* Цвет как фолбэк */}
                <div className={styles.colorPickerRow}>
                  <span className={styles.colorLabel}>или цвет:</span>
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

                {profile?.avatarUrl && (
                  <button
                    type="button"
                    className={styles.removeAvatarBtn}
                    onClick={handleRemoveAvatar}
                  >
                    Удалить фото
                  </button>
                )}
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

      {/* ── Безопасность ── */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Безопасность</h3>

        {/* Email */}
        <div className={styles.subsection}>
          <h4 className={styles.subsectionTitle}>Email</h4>

          {profile?.email ? (
            profileModel.emailRemovePending ? (
              <div className={styles.emailSent}>
                <span>✉️</span>
                <p>
                  Письмо с подтверждением отправлено на{' '}
                  <strong>{profile.email}</strong>
                </p>
                <p className={styles.emailHint}>
                  Перейдите по ссылке в письме чтобы отвязать email
                </p>
                <Button
                  size="small"
                  onClick={() => profileModel.resetEmailRemoveState()}
                >
                  Отмена
                </Button>
              </div>
            ) : (
              <div className={styles.emailBound}>
                <div className={styles.emailRow}>
                  <span className={styles.emailValue}>{profile.email}</span>
                  {profile.emailVerified ? (
                    <span className={styles.emailVerifiedBadge}>
                      ✓ Подтверждён
                    </span>
                  ) : (
                    <span className={styles.emailPendingBadge}>
                      ⚠ Не подтверждён
                    </span>
                  )}
                </div>
                {!profile.emailVerified && (
                  <p className={styles.emailHint}>
                    Проверьте почту или отправьте письмо повторно
                  </p>
                )}
                <div className={styles.emailActions}>
                  {!profile.emailVerified && (
                    <Button
                      size="small"
                      loading={emailSaving}
                      onClick={() =>
                        profileModel.sendEmailVerification(profile!.email!)
                      }
                      className={styles.submitBtn}
                    >
                      Отправить повторно
                    </Button>
                  )}
                  <Button
                    size="small"
                    loading={emailSaving}
                    onClick={handleRemoveEmail}
                    className={styles.removeEmailBtn}
                  >
                    Отвязать
                  </Button>
                </div>
              </div>
            )
          ) : profileModel.emailVerificationSent ? (
            <div className={styles.emailSent}>
              <span>✉️</span>
              <p>
                Письмо отправлено на{' '}
                <strong>{profileModel.pendingEmail}</strong>
              </p>
              <p className={styles.emailHint}>
                Перейдите по ссылке в письме чтобы подтвердить email
              </p>
              <Button
                size="small"
                onClick={() => profileModel.resetEmailVerificationState()}
              >
                Изменить email
              </Button>
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
                  loading={emailSaving}
                  onClick={handleEmailBind}
                  className={styles.submitBtn}
                >
                  Привязать
                </Button>
              </div>
            </div>
          )}
        </div>

        <hr className={styles.divider} />

        {/* Пароль */}
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
                { min: 8, message: 'Минимум 8 символов' },
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
