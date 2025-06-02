import React from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import type { Comment } from '../../../types/comment';
import { nonEmptyString } from '../../../helpers/EmptyStringValidation';
import TextInput from '../../elements/Input';
import { Button } from '../../elements/Button';
import styles from './index.module.scss';

type CommentFormType = Pick<Comment, 'description'>;

type Props = {
  onSubmit: (data: CommentFormType) => void;
  onCancel: () => void;
};

export const CommentForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentFormType>({
    defaultValues: {},
  });

  const handleFormSubmit: SubmitHandler<CommentFormType> = data => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
      <div className={styles.fieldWrapper}>
        <label className={styles.label}>Add your comment</label>

        <TextInput
          name="description"
          label="Comment"
          placeholder="Enter your comment"
          register={register}
          validation={{
            required: 'Comment body is required',
            validate: nonEmptyString(
              'Comment must not be empty or whitespace only',
            ),
          }}
          error={errors.description?.message}
        />

        {errors.description && (
          <span className={styles.errorText}>Comment body is required</span>
        )}
      </div>

      <div className={styles.buttons}>
        <Button type="submit" className={styles.buttons__submit}>
          Submit
        </Button>
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
