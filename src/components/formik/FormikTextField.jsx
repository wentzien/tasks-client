import {useField} from "formik";
import TextField from "@mui/material/TextField";

const FormikTextField = ({...props}) => {
    const [field, meta] = useField(props);

    return (
        <>
            <TextField
                {...field}
                {...props}
                error={Boolean(meta.touched && meta.error)}
                helperText={meta.touched && meta.error}
            />
        </>
    );
}

export default FormikTextField;
