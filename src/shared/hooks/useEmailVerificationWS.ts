import { useEffect, useRef } from 'react';
import { message } from 'antd';
import { authStore } from '@/features/auth/store';
import { profileModel } from '@/features/profile/models';

/**
 * Подключается к WebSocket бэкенда и слушает события для текущего пользователя.
 * При получении email_verified — обновляет профиль без перезагрузки страницы.
 *
 * Токен передаётся через query param (?token=...) так как браузерный
 * WebSocket API не поддерживает кастомные заголовки Authorization.
 */
export function useEmailVerificationWS() {
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!authStore.isAuthenticated || !authStore.token) return;

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const token = encodeURIComponent(authStore.token);
    // Подключаемся напрямую к nginx (:80), не через Vite proxy который не умеет
    // пробрасывать WS upgrade заголовки
    const wsHost = import.meta.env.DEV ? 'localhost:80' : window.location.host;
    const url = `${protocol}//${wsHost}/api/profile/ws/?token=${token}`;

    let ws: WebSocket;
    let reconnectTimer: ReturnType<typeof setTimeout>;

    const connect = () => {
      ws = new WebSocket(url);

      ws.onopen = () => {
        // соединение установлено — ничего не нужно, аутентификация через query param
      };

      ws.onmessage = event => {
        try {
          const data = JSON.parse(event.data as string);
          if (data.event === 'email_verified') {
            message.success('Email успешно подтверждён! 🎉');
            profileModel.loadProfile();
          } else if (data.event === 'email_removed') {
            message.success('Email успешно отвязан');
            profileModel.handleEmailRemovedEvent();
          }
        } catch {
          // игнорируем невалидный JSON
        }
      };

      ws.onclose = () => {
        // Переподключаемся через 5 секунд если соединение разорвалось
        if (authStore.isAuthenticated) {
          reconnectTimer = setTimeout(connect, 5000);
        }
      };

      ws.onerror = () => {
        // WebSocket ошибки не показываем пользователю — это опциональный канал
        ws.close();
      };

      wsRef.current = ws;
    };

    connect();

    return () => {
      clearTimeout(reconnectTimer);
      wsRef.current?.close();
      wsRef.current = null;
    };
  }, [authStore.isAuthenticated, authStore.token]);
}
