import { useField } from "formik";
import React from "react";
import { FormTextArea, Label } from "semantic-ui-react";


export default function HrmsTextArea({ ...props }) {
  const [field, meta] = useField(props);

  return (
    <div>
      <FormTextArea {...field} {...props} error={meta.touched && !!meta.error} />
      {meta.touched && !!meta.error ? (
        <Label pointing basic color="red" content={meta.error} />
      ) : null}
    </div>
  );
}
