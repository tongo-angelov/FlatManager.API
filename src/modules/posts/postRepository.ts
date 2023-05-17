import { PostModel } from "./postModel";

export const createNewPost = (values: Record<string, any>) =>
  new PostModel(values).save().then((post) => post.toObject());

export const getPosts = () => PostModel.find();
export const getPostById = (id: string) => PostModel.findById(id);

export const updatePostById = (id: string, values: Record<string, any>) =>
  PostModel.findByIdAndUpdate(id, values);
