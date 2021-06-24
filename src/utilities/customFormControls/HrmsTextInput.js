import { useField } from "formik";
import React from "react";
import { FormInput, Label } from "semantic-ui-react";

export default function HrmsTextInput({ ...props }) {
  const [field, meta] = useField(props);

  return (
    <div>
      <FormInput {...field} {...props} error={meta.touched && !!meta.error}/>
      {meta.touched && !!meta.error ? (
          <Label pointing basic color="red" content={meta.error} />
        ) : null}
    </div>
  );
}
