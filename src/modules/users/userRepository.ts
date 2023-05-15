import { UserComment, UserModel, UserPost } from "./userModel";

export const getUsers = () => UserModel.find();
export const getUserByUsername = (username: string) =>
  UserModel.findOne({ username });
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ "authentication.sessionToken": sessionToken });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);

export const addPost = async (id: string, values: UserPost) => {
  const user = await UserModel.findById(id);
  user.posts.push({
    postId: values.postId,
    postTitle: values.postTitle,
  });
  await user.save();
  return user;
};

export const addComment = async (id: string, values: UserComment) => {
  const user = await UserModel.findById(id);
  user.comments.push({
    postId: values.postId,
    postTitle: values.postTitle,
    commentId: values.commentId,
    comment: values.comment,
  });
  await user.save();
  return user;
};
