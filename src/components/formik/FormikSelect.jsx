import {useField} from "formik";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const FormikTextField = ({...props}) => {
    const [field, meta] = useField(props);

    return (
        <>
            <FormControl
                fullWidth={props.fullWidth || true}
                variant={props.variant || "outlined"}
                margin={props.margin || "normal"}>
                <InputLabel
                    id={"select-menu-" + props.name + "-label"}
                >
                    {props.label}
                </InputLabel>
                <Select
                    labelId={"select-menu-" + props.name + "-label"}
                    id={"select-menu-" + props.name}
                    label={props.label}
                    {...field}
                >
                    {
                        props.items.map(i => <MenuItem key={"menu-item" + i.name}
                                                       value={i.value}>{i.name}</MenuItem>)
                    }
                </Select>
            </FormControl>
        </>
    );
}

export default FormikTextField;
