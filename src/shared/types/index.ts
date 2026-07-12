export type Rule =
  | { type: 'min'; value: number; message: string }
  | { type: 'max'; value: number; message: string }
  | { type: 'regex'; pattern: RegExp; message: string };
