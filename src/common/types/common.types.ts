export type ResponseType<D = {}> = {
  resultCode: number;
  messages: Array<string>;
  data: D;
};
