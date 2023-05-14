import { PostModel } from "../models/post";

export const getPosts = () => PostModel.find();
// export const getPostsByUsername = (username: string) =>
//   PostModel.findOne({ username });
export const getPostById = (id: string) => PostModel.findById(id);
export const createNewPost = (values: Record<string, any>) =>
  new PostModel(values).save().then((post) => post.toObject());
export const deletePostById = (id: string) =>
  PostModel.findOneAndDelete({ _id: id });
export const updatePostById = (id: string, values: Record<string, any>) =>
  PostModel.findByIdAndUpdate(id, values);
