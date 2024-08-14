const modifierSelector =
  (style: { readonly [key: string]: string }, initialClass: string) =>
  (...modifiers: (string | boolean)[]) =>
    [
      initialClass,
      ...modifiers
        .filter((selector) => typeof selector === "string" && selector.length)
        .map((modifier) => `${initialClass}${modifier}`),
    ]
      .map((selector) => style[selector])
      .join(" ");

export default modifierSelector;
