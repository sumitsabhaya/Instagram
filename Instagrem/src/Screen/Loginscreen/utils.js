import * as yup from "yup";

export const loginInitialValue = {
    username:'',
    password:''
};

export const loginValidationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('password is required'),
})

export const signupInitialValue = {
   number:'',
};

export const signupValidationSchema = yup.object().shape({
    number: yup.string().min(10,({min})=> `${'Mobile number must be'} ${min} ${'character'}`,
    )
    .required('Mobile number is reqired')
    .matches(/^[789]\d(9)$/,'Mobile number should be start form 7,8,9'),
});
