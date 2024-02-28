export interface ILog {
  id: string;
  error: {
    date: Date;
    stack: string;
    message: string;
  };
}
