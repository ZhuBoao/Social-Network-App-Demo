import * as yup from "yup";

const photoSchema = yup.object().shape({
    id: yup.number().required().positive().integer(),
    albumId: yup.number().required().positive().integer(),
    title: yup.string().required(),
    url: yup.string().required(),
    thumbnailUrl: yup.string().required()
});

export type Photo = yup.InferType<typeof photoSchema>;

export default photoSchema;