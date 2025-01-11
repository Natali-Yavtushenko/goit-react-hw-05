import { Field, Formik, Form as FormikForm } from "formik";
import s from "./Form.module.css";

const MyForm = ({ handleSearch }) => {
  const onSubmit = (values, { resetForm }) => {
    handleSearch(values.query); // Pass query to handleSearch
    resetForm(); // Reset the form after submission
  };

  const initialValues = { query: "" };

  return (
    <div className={s.form}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <FormikForm>
          <Field
            className={s.field}
            name="query"
            placeholder="Search movies..."
          />
          <button className={s.btn} type="submit">
            Search
          </button>
        </FormikForm>
      </Formik>
    </div>
  );
};

export default MyForm;
