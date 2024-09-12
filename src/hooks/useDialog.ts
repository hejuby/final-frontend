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

  const setAttributes = (type: DialogType, messages: string[]) => {
    setRevealed(true);
    setMessage(...messages);
    setType(type);
  };

  const confirm = (...messages: string[]) => {
    setAttributes("confirm", messages);

    return new Promise<boolean>((res) => {
      setResponseHandler(res);
    });
  };

  const alert = (...messages: string[]) => {
    setAttributes("alert", messages);

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
