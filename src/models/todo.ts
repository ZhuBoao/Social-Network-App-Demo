import * as yup from "yup";

const todoSchema = yup.object().shape({
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
    completed: yup.bool().required()
});

export type Todo = yup.InferType<typeof todoSchema>;

export default todoSchema;
