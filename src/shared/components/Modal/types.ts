import { ComponentType } from 'react';

export interface ModalConfig<P extends object = object> {
  id: string;
  component: ComponentType<P & { modalId: string }>;
  props: P;
}
