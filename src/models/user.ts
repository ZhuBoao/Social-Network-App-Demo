import * as yup from "yup";

const userSchema = yup.object().shape({
    id: yup
        .number()
        .required()
        .positive()
        .integer(),
    name: yup.string().required(),
    username: yup.string().required(),
    email: yup.string().email(),
    address: yup.object({
        street: yup.string(),
        suite: yup.string(),
        city: yup.string(),
        zipcode: yup.string(),
        geo: yup.object({
            lat: yup.string(),
            lng: yup.string()
        })
    }),
    phone: yup.string().required(),
    website: yup.string().required(),
    company: yup.object({
        name: yup.string(),
        catchPhrase: yup.string(),
        bs: yup.string()
    })
});

export type User = yup.InferType<typeof userSchema>;

export default userSchema;
