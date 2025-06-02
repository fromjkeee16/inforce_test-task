import type { Comment } from '../../../types/comment';
import { Button } from '../../elements/Button';

type Props = {
  comment: Comment;
  onDelete?: () => void;
};

export const CommentElement: React.FC<Props> = ({ comment, onDelete }) => (
  <li key={comment.id}>
    <p>{comment.description}</p>
    <small>{new Date(comment.date).toLocaleString()}</small>
    {onDelete && <Button onClick={onDelete}>Delete</Button>}
  </li>
);
