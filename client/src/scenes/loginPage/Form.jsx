import { useState } from "react" ;
import{
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
    Password,
} from "@mui/icons-material" ;

import EditOutLinedIcon from "@mui/icons-material/EditOutlined" ;
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import Flexbetween from "components/FlexBetween";

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName : yup.string().required("required"),
    email : yup.string().email("Email Invalido").required("required"),
    password : yup.string().required("required"),
    location: yup.string().required("required"),
    ocupation: yup.string().required("required"),
    picture: yup.string().required("required"),
})

const loginSchema = yup.object().shape({
    email : yup.string().email("Email Invalido").required("required"),
    password : yup.string().required("required"),
});

const initalValuesRegister = {
    firstName :"",
    lastName : "",
    email: "",
    password: "",
    localtion: "",
    ocupation: "" ,
    picture:"",
}

const initialValuesLogin ={
    email: "",
    password: "",
};

const Form = () =>{
    const[pageType, setPageType] = useState("login");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("min-width:600px");
    const isLogin = pageType === "login ";
    const isRegister = pageType === "register" ;

    const handleFormsSubmit = async ( values , onsubmit) =>{
        return (
            <Formik onSubmit={handleFormsSubmit}
                    initialValues={isLogin ? initialValuesLogin : initalValuesRegister}
                    validationSchema={isLogin ? loginSchema :  registerSchema}
            >

            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) = (
                <form onSubmit={handleSubmit}>
                    <Box display="grid"
                         gap="30px" 
                         gridTemplateColumns= "repeat(4, minmax(0, 1fr))"
                         sx={{
                            "& > div": {gridColumn : isNonMobile ? undefined : "span 4"},
                         }}
                   >

                    </Box>
                </form>
            )}

            </Formik>
        )
    }
}


export default Form ;