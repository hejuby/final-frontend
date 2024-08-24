import useDialogStore from "../store/useDialogStore";
import { DialogType } from "../@types/useDialogStore";

export default function useDialog() {
  const {
    setMessage,
    setRevealed,
    setType,
    responseHandler,
    setResponseHandler,
  } = useDialogStore();

  const onInteractionEnd = (value: string | boolean) => {
    setRevealed(false);
    responseHandler?.(value);
    setMessage("");
  };

  const setAttributes = (type: DialogType, message: string) => {
    setRevealed(true);
    setMessage(message);
    setType(type);
  };

  const confirm = (message = "") => {
    setAttributes("confirm", message);

    return new Promise<boolean>((res) => {
      setResponseHandler(res);
    });
  };

  const alert = (message = "") => {
    setAttributes("alert", message);

    return new Promise<boolean>((res) => {
      setResponseHandler(res);
    });
  };

  return {
    confirm,
    alert,
    onInteractionEnd,
  };
}
