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