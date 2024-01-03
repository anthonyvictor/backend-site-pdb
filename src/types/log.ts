export interface ILog {
  id: string;
  error: {
    stack: string;
    message: string;
  };
}
