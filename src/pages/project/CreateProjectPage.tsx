import { useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';
import { Form, Input, Select, InputNumber, Button } from 'antd';
import { projectDetailModel } from '@/features/projects/models';
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

  const handleSubmit = async (values: FormValues) => {
    await projectDetailModel.createProject({
      title: values.title,
      description: values.description,
      idea: values.idea,
      category: values.category,
      tags: values.tags ?? [],
      url: values.url,
      testingSlots: values.testingSlots,
    });
  };

  const handleReset = () => {
    projectDetailModel.resetCreate();
    form.resetFields();
  };

  if (projectDetailModel.createSuccess && projectDetailModel.createdProjectId) {
    const projectId = projectDetailModel.createdProjectId;
    return (
      <div className={styles.page}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>✓</div>
          <h2 className={styles.successTitle}>Продукт опубликован!</h2>
          <p className={styles.successText}>
            Ваш продукт успешно размещён и теперь доступен тестировщикам.
          </p>
          <div className={styles.successActions}>
            <Button
              className={styles.viewBtn}
              onClick={() => navigate(`/projects/${projectId}`)}
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
            rules={[{ required: true, message: 'Введите название продукта' }]}
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
              {CATEGORIES.map(cat => (
                <Select.Option key={cat} value={cat}>
                  {cat}
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
            label="Количество мест для тестировщиков"
            rules={[{ required: true, message: 'Укажите количество мест' }]}
          >
            <InputNumber min={1} max={100} style={{ width: '100%' }} />
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
