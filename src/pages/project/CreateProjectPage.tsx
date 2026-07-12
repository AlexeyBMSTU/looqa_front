import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';
import { Form, Input, Select, InputNumber, Button, message } from 'antd';
import { projectDetailModel } from '@/features/projects/models';
import { uploadAttachment } from '@/features/upload';
import styles from './CreateProjectPage.module.css';

const CATEGORIES = [
  'Веб-сервис',
  'Мобильное приложение',
  'Десктоп-приложение',
  'Браузерное расширение',
  'Телеграм-бот',
  'Маркетплейс',
  'Инструмент разработчика',
  'Другое',
];

function getFileType(name: string): 'pdf' | 'zip' | 'other' {
  const ext = name.toLowerCase().split('.').pop();
  if (ext === 'pdf') return 'pdf';
  if (ext === 'zip') return 'zip';
  return 'other';
}

interface AttachmentItem {
  name: string;
  uploading: boolean;
  url?: string;
  error?: boolean;
}

interface FormValues {
  title: string;
  description: string;
  idea?: string;
  category: string;
  tags: string[];
  url?: string;
  testingSlots: number;
}

export const CreateProjectPage = observer(() => {
  const navigate = useNavigate();
  const [form] = Form.useForm<FormValues>();
  const [attachments, setAttachments] = useState<AttachmentItem[]>([]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = '';

    for (const file of files) {
      if (file.size > 20 * 1024 * 1024) {
        message.error(`${file.name}: слишком большой (макс 20MB)`);
        continue;
      }
      const idx = attachments.length;
      setAttachments(prev => [...prev, { name: file.name, uploading: true }]);
      try {
        const res = await uploadAttachment(file);
        setAttachments(prev =>
          prev.map((a, i) =>
            i === idx ? { ...a, uploading: false, url: res.url } : a
          )
        );
      } catch {
        message.error(`Не удалось загрузить ${file.name}`);
        setAttachments(prev =>
          prev.map((a, i) =>
            i === idx ? { ...a, uploading: false, error: true } : a
          )
        );
      }
    }
  };

  const handleSubmit = async (values: FormValues) => {
    const ready = attachments
      .filter(a => a.url)
      .map(a => ({
        name: a.name,
        url: a.url!,
        type: getFileType(a.name),
      }));

    await projectDetailModel.createProject({
      title: values.title,
      description: values.description,
      idea: values.idea,
      category: values.category,
      tags: values.tags ?? [],
      url: values.url,
      testingSlots: values.testingSlots,
      attachments: ready,
    });
  };

  const handleReset = () => {
    projectDetailModel.resetCreate();
    form.resetFields();
    setAttachments([]);
  };

  if (projectDetailModel.createSuccess && projectDetailModel.createdProjectId) {
    const pid = projectDetailModel.createdProjectId;
    return (
      <div className={styles.page}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>✓</div>
          <h2 className={styles.successTitle}>Продукт опубликован!</h2>
          <p className={styles.successText}>
            Ваш продукт доступен тестировщикам.
          </p>
          <div className={styles.successActions}>
            <Button
              className={styles.viewBtn}
              onClick={() => navigate(`/projects/${pid}`)}
            >
              Посмотреть продукт
            </Button>
            <Button className={styles.resetBtn} onClick={handleReset}>
              Создать ещё
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.heading}>Разместить продукт</h1>

        <Form<FormValues>
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ testingSlots: 10, tags: [] }}
          requiredMark={false}
        >
          <Form.Item
            name="title"
            label="Название продукта"
            rules={[{ required: true, message: 'Введите название' }]}
          >
            <Input placeholder="TaskFlow — менеджер задач" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Краткое описание"
            rules={[{ required: true, message: 'Введите описание' }]}
          >
            <Input.TextArea
              rows={3}
              placeholder="Опишите продукт в 2-3 предложениях"
            />
          </Form.Item>

          <Form.Item name="idea" label="Идея и концепция">
            <Input.TextArea
              rows={5}
              placeholder="Подробнее о проблеме которую решает продукт..."
            />
          </Form.Item>

          <Form.Item
            name="category"
            label="Категория"
            rules={[{ required: true, message: 'Выберите категорию' }]}
          >
            <Select placeholder="Выберите категорию">
              {CATEGORIES.map(c => (
                <Select.Option key={c} value={c}>
                  {c}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="tags" label="Теги">
            <Select
              mode="tags"
              placeholder="Введите теги и нажмите Enter"
              tokenSeparators={[',']}
            />
          </Form.Item>

          <Form.Item name="url" label="Ссылка на продукт (необязательно)">
            <Input placeholder="https://..." />
          </Form.Item>

          <Form.Item
            name="testingSlots"
            label="Мест для тестировщиков"
            rules={[{ required: true, message: 'Укажите количество' }]}
          >
            <InputNumber min={1} max={100} style={{ width: '100%' }} />
          </Form.Item>

          {/* Загрузка файлов */}
          <Form.Item label="Материалы (PDF, ZIP, изображения — до 20MB)">
            <div className={styles.uploadArea}>
              <label className={styles.uploadLabel}>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.zip,.png,.jpg,.jpeg,.gif,.webp"
                  className={styles.fileInput}
                  onChange={handleFileSelect}
                />
                <span className={styles.uploadIcon}>📎</span>
                <span className={styles.uploadText}>
                  Нажмите или перетащите файлы
                </span>
                <span className={styles.uploadHint}>
                  PDF, ZIP, PNG, JPG, GIF, WEBP
                </span>
              </label>

              {attachments.length > 0 && (
                <ul className={styles.fileList}>
                  {attachments.map((a, i) => (
                    <li key={i} className={styles.fileItem}>
                      <span className={styles.fileName}>{a.name}</span>
                      {a.uploading && (
                        <span className={styles.fileStatus}>⏳</span>
                      )}
                      {a.url && <span className={styles.fileStatusOk}>✓</span>}
                      {a.error && (
                        <span className={styles.fileStatusErr}>✕</span>
                      )}
                      <button
                        type="button"
                        className={styles.fileRemove}
                        onClick={() =>
                          setAttachments(prev => prev.filter((_, j) => j !== i))
                        }
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              htmlType="submit"
              loading={projectDetailModel.isCreating}
              className={styles.submitBtn}
              block
            >
              Опубликовать продукт
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});
