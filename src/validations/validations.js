import * as Yup from 'yup';

const validPhone = /^(?:\+38)?(0\d{9})$/;

const emailValidation =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

const validation = Yup.object({
    name: Yup.string()
        .min(2, 'Name should have more than 2 characters')
        .required('Enter your name')
        .max(60, 'Name should have less than 60 characters'),
    email: Yup.string()
        .required('Enter email')
        .matches(emailValidation, 'Enter valid email (example-email@gmail.com)'),
    phone: Yup.string()
        .matches(validPhone, 'Number shoud have format +38 XXX XXX XX XX ')
        .required('Enter phone number'),
    photo: Yup.mixed()
        .required('Download your photo')
        .test('fileType', 'Photo must have jpeg/jpg formats', (value) => {
            return (
                (value && value.type === 'image/jpg') ||
                (value && value.type === 'image/jpeg')
            );
        })
        .test('fileSize', 'Photo is too large, max size 5mb', (value) => {
            return value && value.size <= 5000000;
        })
        .test('filePX', 'Photo should be at least 70x70 px ', (value) => {
            return value && value.size >= 500;
        }),
});

export default validation;