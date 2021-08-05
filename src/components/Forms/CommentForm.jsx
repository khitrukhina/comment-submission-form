import React from 'react';
import { reduxForm, Field } from 'redux-form';
import classes from './CommentForm.module.css';
import { maxLengthCreator, requiredField } from '../../tools/validators';
import classNames from 'classnames';

const maxLengthName = maxLengthCreator(50);
const maxLengthComment = maxLengthCreator(100);
const Form = (props) => {
  return (
    <div>
      <form className={classes.commentForm} onSubmit={props.handleSubmit}>
        <Field
          autoComplete={'off'}
          name={'name'}
          placeholder={'Your name...'}
          component={InputName}
          validate={[requiredField, maxLengthName]}
        />
        <Field
          validate={[requiredField, maxLengthComment]}
          autoComplete={'off'}
          name={'comment'}
          placeholder={'Your comment...'}
          component={TextareaComment}
        />
        <div>
          <button className="btn btn-success">Send</button>
        </div>
      </form>
    </div>
  );
};

export const CommentForm = reduxForm({
  form: 'comment',
})(Form);

const InputName = ({ input, meta, ...props }) => {
  const hasError = meta.touched && meta.error;
  let formClass = classNames(classes.form, {
    [classes.error]: hasError,
  });
  return (
    <div className={formClass}>
      <div>
        <input {...input} {...props} />
      </div>
      {hasError && <span>{meta.error}</span>}
    </div>
  );
};

const TextareaComment = ({ input, meta, ...props }) => {
  const hasError = meta.touched && meta.error;
  let formClass = classNames(classes.form, {
    [classes.error]: hasError,
  });
  return (
    <div className={formClass}>
      <div>
        <textarea {...input} {...props} />
      </div>
      {hasError && <span>{meta.error}</span>}
    </div>
  );
};
