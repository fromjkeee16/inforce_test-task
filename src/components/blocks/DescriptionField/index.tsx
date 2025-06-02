import styles from './index.module.scss';

type Props = {
  label: string;
  value: string | number;
};

export const DescriptionField: React.FC<Props> = ({ label, value }) => (
  <div className={styles.field}>
    <span className={styles.field__label}>{label}</span>
    <span className={styles.field__value}>{value}</span>
  </div>
);
