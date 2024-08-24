export type ResponseHandler<T> = (value: T | PromiseLike<T>) => void;
export type DialogType = "alert" | "confirm";

export interface DialogStore {
  message: string;
  setMessage: (message: string) => void;
  type: DialogType;
  setType: (state: DialogType) => void;
  revealed: boolean;
  setRevealed: (show: boolean) => void;
  responseHandler?: ResponseHandler;
  setResponseHandler: (responseHandler: ResponseHandler) => void;
}
