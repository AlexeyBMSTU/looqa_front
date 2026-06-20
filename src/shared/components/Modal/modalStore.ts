import { makeAutoObservable } from 'mobx';
import { ModalConfig } from './types';

class ModalStore {
  // Стек модалок — можно открывать вложенные
  declare stack: ModalConfig[];

  constructor() {
    this.stack = [];
    makeAutoObservable(this);
  }

  open<P extends object>(
    config: Omit<ModalConfig<P>, 'id'> & { id?: string }
  ): string {
    const id = config.id ?? `modal-${Date.now()}`;
    this.stack.push({ ...config, id } as unknown as ModalConfig);
    return id;
  }

  close(id: string) {
    this.stack = this.stack.filter(m => m.id !== id);
  }

  closeAll() {
    this.stack = [];
  }
}

export const modalStore = new ModalStore();
