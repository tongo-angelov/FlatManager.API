import { PostComment, PostModel } from "./postModel";
import { addPost as addUserPost } from "../users/userRepository";

export const getPosts = () => PostModel.find();
export const getPostById = (id: string) => PostModel.findById(id);

export const createNewPost = async (values: Record<string, any>) => {
  const post = new PostModel(values);
  await post.save();
  await addUserPost(post._id.toString(), {
    postId: post._id,
    postTitle: post.title,
  });
  return post;
};

export const deletePostById = (id: string) =>
  PostModel.findOneAndDelete({ _id: id });
export const updatePostById = (id: string, values: Record<string, any>) =>
  PostModel.findByIdAndUpdate(id, values);

export const addComment = async (id: string, values: PostComment) => {
  const post = await PostModel.findById(id);
  post.comments.push({
    userId: values.userId,
    userName: values.userName,
    commentId: values.commentId,
    comment: values.comment,
  });
  await post.save();
  return post;
};
