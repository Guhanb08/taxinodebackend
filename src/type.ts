
export interface userData {
  id: number;
  user_name: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      locals: {
        user: userData;
      };
    }
  }
}