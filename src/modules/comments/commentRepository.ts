import { addComment as addPostComment } from "../posts/postRepository";
import { addComment as addUserComment } from "../users/userRepository";
import { CommentModel } from "./commentModel";

export const createNewComment = async (values: Record<string, any>) => {
  const comment = new CommentModel(values);
  await addPostComment(comment.postId.toString(), {
    userId: comment.userId,
    userName: comment.userName,
    commentId: comment._id,
    comment: comment.body,
  });
  await addUserComment(comment.postId.toString(), {
    postId: comment.postId,
    postTitle: comment.postTitle,
    commentId: comment._id,
    comment: comment.body,
  });
  return comment;
};
