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

                    {isRegister && (
                        <>
                            <TextField 
                                label= "First Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.firstName}
                                name="firstName"
                                error={Boolean(Louched.firstName)&& Boolean(errors.firstName)}
                                helperText ={touched.firstName && errors.firstName}
                                sx= {{gridColumn : "span 2"}}

                                />

                            <TextField 
                                label= "Last Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.lastName}
                                name="lastname"
                                error={Boolean(Louched.lastname)&& Boolean(errors.lastname)}
                                helperText ={touched.lastname && errors.lastname}
                                sx= {{gridColumn : "span 2"}}

                                />    

                            <TextField 
                                label= "Location"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.location}
                                name="location"
                                error={Boolean(Louched.location)&& Boolean(errors.location)}
                                helperText ={touched.location && errors.location}
                                sx= {{gridColumn : "span 4"}}

                                />   

                            <TextField 
                                label= "Ocupation"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.ocupattion}
                                name="ocupattion"
                                error={Boolean(Louched.ocupattion)&& Boolean(errors.ocupattion)}
                                helperText ={touched.ocupattion && errors.ocupattion}
                                sx= {{gridColumn : "span 4"}}

                                /> 

                                <Box
                                gridColumn= "span 4"
                                border={`1px solid ${palette.neutral.medium}`}
                                borderRadius = "5px"
                                p="1rem"
                                >

                                 <Dropzone
                                    acceptedFiles= ".jpg,.jpeg,.png"
                                    multiple={false}
                                    onDrop={ (acceptedFiles) =>{
                                        setFieldValue("picture" , acceptedFiles[0])
                                    }}
                                 >

                                    { ({getRootProps, getInputProps}) =>{

                                        <Box 
                                        {... getRootProps()}
                                        border={`2px dashed ${palette.primary.main}`}
                                        p="1rem"
                                        sx={{"&:hover" : {cursor:pointer}}}
                                        >

                                        <input {...getInputProps() }/>
                                        {!values.picture ? (
                                            <p>Agregar foto aqui</p>
                                        ): (
                                            <Flexbetween>
                                                <Typography> {values.pciture.name} </Typography>
                                                <EditOutLinedIcon />
                                            </Flexbetween>
                                        )}
                                           
                                        </Box>

                                    }}

                                 </Dropzone>   



                                </Box>       
                        </>

                    )}
                    </Box>
                </form>
            )}

            </Formik>
        )
    }
}


export default Form ;