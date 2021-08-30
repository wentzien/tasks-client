import {useField} from "formik";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";

const FormikTextField = ({...props}) => {
    const [field, meta] = useField(props);

    return (
        <>
            <Typography
                sx={{mt: 2}}
                color="textPrimary"
                gutterBottom
                variant="subtitle2"
            >
                {props.label}
            </Typography>
            <Typography
                color="textSecondary"
                variant="body2"
            >
                {props.description}
            </Typography>
            <Switch
                checked={field.value}
                {...field}
                {...props}
            />
        </>
    );
}

export default FormikTextField;
