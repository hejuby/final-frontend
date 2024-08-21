import styles from "./index.module.scss";

type LabelProps = {
  htmlFor: string;
  children: React.ReactNode;
};

const Label = ({ htmlFor, children }: LabelProps) => {
  return (
    <label className={styles.label} htmlFor={htmlFor}>
      {children}
    </label>
  );
};

export default Label;
