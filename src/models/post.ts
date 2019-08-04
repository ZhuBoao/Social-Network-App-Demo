import * as yup from "yup";

const postSchema = yup.object().shape({
    id: yup
        .number()
        .required()
        .positive()
        .integer(),
    userId: yup
        .number()
        .required()
        .positive()
        .integer(),
    title: yup.string().required(),
    body: yup.string().required()
});

export type Post = yup.InferType<typeof postSchema>;

export default postSchema;
