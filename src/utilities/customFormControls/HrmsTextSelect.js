import { useField } from "formik";
import React from "react";
import { FormSelect, Label } from "semantic-ui-react";

export default function HrmsTextSelect({ ...props }) {
  const [field, meta] = useField(props);

  return (
    <div>
      <FormSelect {...field} {...props} error={meta.touched && !!meta.error} />
      {meta.touched && !!meta.error ? (
        <Label pointing basic color="red" content={meta.error} />
      ) : null}
    </div>
  );
}
