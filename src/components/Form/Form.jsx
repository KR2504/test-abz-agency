import React, { useState, useEffect } from "react";
// import Section from "components/Section";
import Button from "components/Button";
import RadioButton from "components/RadioButton";
import axiousAuth from "../../services/authApi";
import axiosget from "../../services/baseApi";
import classNames from 'classnames';
import validationSchema from "validations";
import { Formik } from 'formik';
import succesRegisterImg from "../../images/success-image.png";
// import shortid from "shortid";

const fields = [
  { fieldName: 'name', text: 'Your name' },
  { fieldName: 'email', text: 'Email' },
  {
    fieldName: 'phone',
    text: 'Phone',
    defaultHelperText: '+38 (XXX) XXX - XX - XX',
  },
];

const Form = ({ getUsers }) => {
  const [userPositions, setUserPosition] = useState([]);
  const [successRegistration, setsuccessRegistration] = useState(false);
  const [responseError, setResponseError] = useState('');
  const [isSending, setIsSending] = useState(false);
  const formData = new FormData();

  useEffect(() => {
    const getPositions = async () => {
      const response = await axiosget.get('/positions');
      setUserPosition(response.data.positions);
    };

    getPositions();
  }, []);

  const sentForm = async (values) => {
    setIsSending(true);

    formData.set('position_id', values.position_id.toString());
    formData.set('name', values.name);
    formData.set('email', values.email);
    formData.set('phone', values.phone);
    formData.set('photo', values.photo);

    setResponseError('');

    try {
      const axiosToken = await axiousAuth();
      const response = await axiosToken.post('/users', formData);
      if (response.data.success) {
        setIsSending(false);
        setsuccessRegistration(true);
        getUsers();
      } else {
        throw new Error('Somthing went wrong');
      }
    } catch (error) {
      setIsSending(false);
      setResponseError(error.response.data.message);
    }
  };

  if (successRegistration) {
    return (
      <div className="successRegistaration page__container">
        <h1 className="successRegistaration__title">
          User successfully registered
        </h1>
        <div className="successRegistaration__img-container">
          <img
            className="successRegistaration__img"
            src={succesRegisterImg}
            alt="img-success-Registaration"
          />
        </div>
      </div>
    );
  }

  return (
    <section id="sign-up" className="createUserForm">
      <h1 className="createUserForm__title">Working with POST request</h1>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          name: '',
          email: '',
          phone: '',
          position_id: 1,
          photo: null,
        }}
        validateOnBlur
        onSubmit={(value) => {
          sentForm(value);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isValid,
          handleSubmit,
          dirty,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="createUserForm__form">
            <div className="createUserForm__main-inputs">
              {fields.map((field) => {
                const { fieldName, text, defaultHelperText } = field;
                return (
                  <div
                    key={fieldName}
                    className="createUserForm__input-container"
                  >
                    <input
                      className={classNames('createUserForm__input', {
                        'createUserForm__input--error':
                          touched[fieldName] && errors[fieldName],
                      })}
                      type="text"
                      id={fieldName}
                      name={fieldName}
                      value={values[fieldName]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label
                      className={classNames('createUserForm__label', {
                        'not-Empty': values[fieldName],
                        'createUserForm__label--error':
                          touched[fieldName] && errors[fieldName],
                      })}
                      htmlFor={fieldName}
                    >
                      {text}
                    </label>
                    <p
                      className={classNames('createUserForm__input-helper', {
                        'createUserForm__input-helper--error':
                          touched[fieldName] && errors[fieldName],
                      })}
                    >
                      {(touched[fieldName] &&
                        errors[fieldName] &&
                        errors[fieldName]) ||
                        defaultHelperText}
                    </p>
                  </div>
                );
              })}
            </div>
            <div role={'group'} className="createUserForm__user-position">
              <p className="createUserForm__positions-title">
                Select your position
              </p>
              {userPositions.length > 0 &&
                userPositions.map(({id, name}) => (
                  <RadioButton
                    key={id}
                    name="position_id"
                    value={id}
                    selected={values.position_id}
                    text={name}
                    onChange={(value) => setFieldValue('position_id', value)}
                  />
                ))}
            </div>
            <div
              className={classNames('createUserForm__file-uploader', {
                'createUserForm__file-uploader--error':
                  errors.photo && touched.photo,
              })}
            >
              <input
                onChange={(event) =>
                  setFieldValue('photo', event.currentTarget.files[0])
                }
                onBlur={handleBlur}
                type="file"
                style={{ display: 'none' }}
                multiple={false}
                id="fileloader"
              />
              <label
                htmlFor="fileloader"
                className={classNames('createUserForm__fileLoad-btn', {
                  'createUserForm__fileLoad-btn--error':
                    errors.photo && touched.photo,
                })}
              >
                Upload
              </label>
              <p
                className={classNames('createUserForm__fileName', {
                  'createUserForm__fileName--empty': !values.photo,
                })}
              >
                {(values.photo && values.photo.name) || 'Upload your photo'}
              </p>
              <p className="createUserForm__input-helper createUserForm__input-helper--error">
                {touched.photo && errors.photo}
              </p>
            </div>
            <h2 className="createUserForm__responseError">{responseError}</h2>
            {isSending ? (
              '<Loader />'
            ) : (
              <Button
                disabled={!isValid || !dirty}
                classModificator="createUserForm__button"
              >
                Sign up
              </Button>
            )}
          </form>
        )}
      </Formik>
    </section>
  );
};

export default Form;



// export default function Form({ onSubmit }) {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [number, setNumber] = useState('');

//     const nameInputId = shortid.generate();

//     const handleChange = e => {
//         const { name, value } = e.currentTarget;
//         if (name === 'name') {
//             setName(value)
//         }
//         if (name === 'email') {
//             setEmail(value)
//         }

//         if (name === 'number') {
//             setNumber(value)
//         }
//     };

//     const handleSubmit = e => {
//         e.preventDefault();
//         onSubmit(name, email, number);
//         setName('');
//         setNumber('');
//         setEmail('')
//     };
    
//     return (
//         <Section title="Working with POST request">
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor={nameInputId}>
//                     <input
//                         type="text"
//                         name="name"
//                         value={name}
//                         onChange={handleChange}
//                         id={nameInputId}
//                         placeholder='Your name'
//                         pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//                         title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//                         required
//                     />
//                 </label>
//                 <label htmlFor={nameInputId}>
//                     <input
//                         type="email"
//                         name="email"
//                         value={email}
//                         onChange={handleChange}
//                         id={nameInputId}
//                         placeholder='Email'
//                         pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
//                         title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//                         required
//                     />
//                 </label>
//                 <label htmlFor={nameInputId}>
//                     <input
//                         type="tel"
//                         name="number"
//                         value={number}
//                         onChange={handleChange}
//                         id={nameInputId}
//                         placeholder='Phone'
//                         pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//                         title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//                         required
//                     />
//                 </label>
//                 <Button type="submit">Sign up</Button>
//                 <RadioButton/>
//             </form>
//         </Section>
//     );
// };