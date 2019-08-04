import * as yup from "yup";

const commentSchema = yup.object().shape({
    postId: yup
        .number()
        .required()
        .positive()
        .integer(),
    id: yup
        .number()
        .required()
        .positive()
        .integer(),
    name: yup.string().required(),
    email: yup.string().required(),
    body: yup.string().required()
});

export type Comment = yup.InferType<typeof commentSchema>;

export default commentSchema;
