export interface Link {
  id: string;
  title: string;
  url: string;
  description: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

export type LinkDraft = Omit<Link, 'id' | 'createdAt' | 'updatedAt'>;

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: number;
  type: ToastType;
  message: string;
}
