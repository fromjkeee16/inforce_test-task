import React, { useState } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { removeComment } from '../../../store/slices/productDetails';
import { Modal } from '../Modal';
import { CommentElement } from '../Comment';
import type { Comment } from '../../../types/comment';
import { Button } from '../../elements/Button';
import styles from './index.module.scss';

type Props = {
  list: Comment[];
};

export const CommentList: React.FC<Props> = ({ list }) => {
  const dispatch = useAppDispatch();

  const [isModalOpen, setModalOpen] = useState(false);
  const [targetCommentId, setTargetCommentId] = useState<number | null>(null);

  const handleDeleteClick = (commentId: number) => {
    setTargetCommentId(commentId);
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (targetCommentId !== null) {
      dispatch(removeComment(targetCommentId));
    }
    setModalOpen(false);
    setTargetCommentId(null);
  };

  const handleCancelDelete = () => {
    setModalOpen(false);
    setTargetCommentId(null);
  };

  return (
    <>
      <ul>
        {list.map(comment => (
          <CommentElement
            key={comment.id}
            comment={comment}
            onDelete={() => handleDeleteClick(comment.id)}
          />
        ))}
      </ul>

      <Modal isOpen={isModalOpen}>
        <p>Are you sure you want to delete this message?</p>
        <div className={styles.modal_controls}>
          <Button
            className={styles.modal_controls__confirm}
            onClick={handleConfirmDelete}
          >
            Yes
          </Button>
          <Button onClick={handleCancelDelete}>No</Button>
        </div>
      </Modal>
    </>
  );
};
