import yup from 'yup'

const noteSchema = yup.object().required().shape({
    email: yup.string().email().required(),
    event_id: yup.number().positive().required(),
    title: yup.string(),
    body: yup.string().required()
})

export default noteSchema
