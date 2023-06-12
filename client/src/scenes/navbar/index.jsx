import { useState } from "react" ;
import { 
    Box , 
    IconButton,
    InputBase,
    Typography, 
    Select, 
    MenuItem, 
    FormControl, 
    useTheme,
    useMediaQuery} from "@mui/material" ;

 import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Menu,
    Close
 } from "@mui/icons-material" ;

 import { useDispatch  , useSelector} from "react-redux";
 import { setMode , setLogout } from "state" ;
 import { useNavigate } from "react-router-dom" ;
 import Flexbetween from "components/FlexBetween";


const Navbar = () =>{
    const  [isMobileMenuToggled , setidmobileMenuToggled] = useState(false);
    const  dispactch = useDispatch();
    const  navigate = useNavigate();
    const  user = useSelector( (state) => state.user ); 
    const  isNonMobileScreens = useMediaQuery( "(min-width:1000px)" ) ;
    
    const theme = useTheme ();
    const neutralLight =theme.palette.neutral.ligth ; 
    const dark = theme.palette.neutral.dark ;
    const background = theme.palette.background.default ; 
    const primaryLight  =  theme.palette.primary.light ;
    const alt = theme.palette.background.alt ;

    const fullName = `${user.firstName} ${user.lastName}` ;

    return( 

        <Flexbetween padding="1rem 6%" background={alt}>

            <Flexbetween gap="1.75rem">

                <Typography fontWeight="Bold"
                            fontSize= "clamp(1rem ,2rem, 2.25rem)"
                            color="primary"
                            onClick={ () => navigate("/home")}
                            sx={{
                                   " &:hover" :{
                                    color: primaryLight,
                                    cursor: "pointer"
                                   }
                            }}
                        >
                    SocioPedia

                </Typography>

                {isNonMobileScreens && (
                    <Flexbetween backgroundColor = {neutralLight}
                                 borderRadius= "9px"
                                 gap = "3rem"
                                 padding= "0.1rem 1.5rem"
                                    >
                        <InputBase placeholder="Search..." />
                                 <IconButton>
                                     <Search />
                                  </IconButton>

                    </Flexbetween>
                )}

            </Flexbetween>

            {/* Desktop NAV */}

            {  isNonMobileScreens ? ( 
                <Flexbetween gap="2rem"> 

                    <IconButton onClick={ ()=> dispactch(setMode())}>
                        {theme.palette.mode === "dark"  ? (
                            <DarkMode sx={{fontSize : "25px"}} />
                        ):(
                            <LightMode sx={{color: dark , fontSize : "25px"}} />
                        )}
                    </IconButton>

                    <Message sx={{fontSize : "25px"}} />

                    <Notifications sx={{fontSize : "25px"}} />

                    <Help sx={{fontSize : "25px"}} />

                    <FormControl variant="standard" value= {fullName}>

                        <Select 
                            value={fullName}
                            sx={{
                                backgroundColor: neutralLight,
                                width : "150px",
                                borderRadius: "0.25rem",
                                padding:"0.25rem 1rem",
                                "& .MuiSvgIcon-root:"{
                                    pr: "0.25rem",
                                    width: "3rem"
                                },
                                "& .MuiSelect-select:focus":{
                                    backgroundColor: neutralLight
                                }
                            }}
                            input = {<InputBase />}
                            >

                            <MenuItem value={fullName}>


                            </MenuItem>

                        </Select>
                    </FormControl>


                </Flexbetween >
                ) : (
                <IconButton></IconButton> 
            )}

        </Flexbetween>
    )
}

export default Navbar ;