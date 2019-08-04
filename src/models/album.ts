import * as yup from "yup";

const albumSchema = yup.object().shape({
    id: yup.number().required().positive().integer(),
    userId: yup.number().required().positive().integer(),
    title: yup.string().required()
});

export type Album = yup.InferType<typeof albumSchema>;

export default albumSchema;