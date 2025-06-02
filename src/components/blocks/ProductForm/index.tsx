import React from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import type { Product } from '../../../types/product';
import { nonEmptyString } from '../../../helpers/EmptyStringValidation';
import styles from './index.module.scss';
import TextInput from '../../elements/Input';
import { Button } from '../../elements/Button';

type ProductFormType = Omit<Product, 'id'>;

type Props = {
  onSubmit: (data: ProductFormType) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  initialData?: ProductFormType;
  errorMessage: string;
};

export const ProductForm: React.FC<Props> = ({
  onSubmit,
  isSubmitting = false,
  onCancel,
  initialData,
  errorMessage,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormType>({
    defaultValues: initialData ?? {
      imageUrl: '',
      name: '',
      count: 0,
      size: { width: 0, height: 0 },
      weight: '',
    },
  });

  const handleFormSubmit: SubmitHandler<ProductFormType> = data => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
      <TextInput
        name="name"
        label="Name"
        register={register}
        validation={{
          required: 'Name is required',
          validate: nonEmptyString("Name shouldn't be empty"),
        }}
        error={errors.name?.message}
      />

      <TextInput
        name="imageUrl"
        label="Image URL"
        register={register}
        validation={{ required: 'Image URL is required' }}
        error={errors.imageUrl && 'Image URL is required'}
      />

      <TextInput
        name="count"
        label="Count"
        register={register}
        validation={{
          required: 'Count is required',
          min: { value: 0, message: 'Minimum is 0' },
        }}
        error={errors.count?.message}
      />

      <TextInput
        name="size.width"
        label="Width"
        register={register}
        validation={{
          required: 'Width is required',
          min: { value: 0, message: 'Minimum is 0' },
        }}
        error={errors.size?.width?.message}
      />

      <TextInput
        name="size.height"
        label="Height"
        register={register}
        validation={{
          required: 'Height is required',
          min: { value: 0, message: 'Minimum is 0' },
        }}
        error={errors.size?.height?.message}
      />

      <TextInput
        name="weight"
        label="Weight"
        register={register}
        validation={{ required: 'Weight is required' }}
        error={errors.weight && 'Weight is required'}
      />

      <div className={styles.buttonGroup}>
        <Button
          type="submit"
          disabled={isSubmitting}
          className={styles.submitButton}
        >
          Submit
        </Button>
        <Button
          type="button"
          disabled={isSubmitting}
          onClick={onCancel}
          className={styles.cancelButton}
        >
          Cancel
        </Button>
      </div>

      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </form>
  );
};
