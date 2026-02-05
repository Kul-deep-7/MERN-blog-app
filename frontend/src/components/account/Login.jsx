import {useContext, useState} from 'react'
import {Box, TextField, Button, styled, Typography} from '@mui/material' //Box is basically a div substitute in Material UI. it has sx prop which is inline styling without css files.    Box = div + styling + theme + convenience
import axios from 'axios'
import { DataContext } from '../../context/DataProvider'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom' 
//useNavigate is a React hook that lets you programmatically change pages in your app.

import API_BASE_URL from '../../config'

//styled in MUI is just “making your own component(customBox) with CSS attached to it. Instead of writing styles again and again, you lock them once and reuse
//every time I call CustonBox styled component it will have these CSS... styled component name must start with CAPITAL. CSS needs semicolons
const CustomBox = styled(Box)`
   width: 380px;
  margin: 80px auto;
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  text-align: center;;
`
// when passing an html tah lke "img" we should pass it as string or we will get error.React / MUI components → pass directly. HTML tags → pass as STRING
//so instead of backtick we use ({}) & write in camelCase the styles for html tags like img
//since this is an object we dont apply semicolon, we use comma
const Image = styled('img')({
    width: 100,
    margin: 'auto', //pushes an element away from its container equally from both sides
})

const Wrapper = styled(Box)`
    padding:25px 35px;
    display: flex;
    flex: 1;
    flex-direction: column;
    & > div, & > button, & > p{
        margin-top:20px
    }

`

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FD6415;
    color: #fff;
    height: 48px;

`
const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #FD6415;
    height: 48px;
`

const Text = styled(Typography)`
    color: #878787;
    font-size: 14px;
`
const setInitialValue = {
    Name : "",
    Username: "",
    Password: ""
}

const loginInitialValue ={
    Username: "",
    Password: ""
}


const Login = () => {
    const [account, toggleAccount] = useState(true)
    const [signUp, setSignUp] = useState(setInitialValue)
    const [login, setLogin]=useState(loginInitialValue)
    const [error, showError] = useState('');
    const [msg, setMsg] = useState('')
    const { setUser } = useContext(AuthContext); 
    const { setAccount } = useContext(DataContext);  //Hey React, give me whatever DataProvider stored in DataContext which is value={{ account, setAccount }}
    const navigate = useNavigate()

    const toggleAccountView = () => {
        toggleAccount(!account); // flips true & false
        setSignUp(setInitialValue);
    };

    const onInputValue = (e) => {
    // console.log("onInputValue triggered:");
    // console.log("e.target.name:", e.target.name);
    // console.log("e.target.value:", e.target.value);
    
    setSignUp({...signUp, [e.target.name]: e.target.value}); //dynamic key it is A dynamic key means:the property name is not fixed.It comes from a variable or expression at runtime.
    //The object (setInitialValue) keys are static in the initial state, but they are updated dynamically using computed property names based on the input’s name attribute.
    }

    const onLoginValue=(e)=>{
        setLogin({...login, [e.target.name]:e.target.value})
    }

    const API_URL = API_BASE_URL


   const signupUser = async () => {

    if (!signUp.Name || !signUp.Username || !signUp.Password) {
        showError('Please fill all the details');
        return; 
    }
    showError('');

    if (signUp.Password.length < 8) {
    showError('Password must be at least 8 characters long');
    return;
}

    try {
        // console.log("=== FRONTEND DEBUG ===");
        // console.log("Current signUp state:", signUp);
        // console.log("Sending to backend...");
        
        const response = await axios.post(`${API_URL}/signup`, signUp, // Make sure this has data
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        );
        
        //console.log("Signup Success:", response.data);
        toggleAccount(true);
        setSignUp(setInitialValue);
    } catch (error) {
        console.error("Signup Error:", error.response?.data || error.message);
    }
};

//axios.post(url, data, config) url:Where to send, data: What to send, config: How to send(headers & options)

const loginUser = async function () {
        if (!login.Username || !login.Password) {
        setMsg("Please fill all login details");
        return;
    }
    setMsg('');
    try {
        const response = await axios.post(`${API_URL}/login`, login, {
            headers:{
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        console.log("Login Success:", response.data.data); //helped alot cuz inital mount couldnt load some icons & /me endpoint wasnt getting hit
        const userData = response.data.data?.user || null; //proper structure


         setAccount({
            Username: userData?.Username,
            Name: userData?.Name
        });         //setAccount receives the response and updates the account state inside the Context, making it available to all components that consume it.
        setUser(userData)  //Now when users login, AuthContext updates immediately instead of waiting for a page refresh.
        setLogin(loginInitialValue)
        navigate('/')
    } catch (error) {
         setMsg(
            error.response?.data?.message || "Invalid username or password"
        );
    }
    
}


    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png'

  return ( 
    <CustomBox>
        <Box>
            <Image src={imageURL} alt='login'/> {/*Image was img before cuz of styled */}
            {
                account === true ?
            <Wrapper>
                <TextField variant="standard" onChange={onLoginValue} name='Username' label="Enter Username"/> {/*label is just a placeholder */}
                <TextField variant="standard" type="password" onChange={onLoginValue} name='Password' label="Enter Password"/>
                {msg && (<Typography style={{ color: 'red', fontSize: '14px', marginTop: '10px' }}>{msg} </Typography>)}
                <LoginButton variant="contained" onClick={loginUser}>Login</LoginButton>
                <Text style={{textAlign : 'center'}}>OR</Text> {/*typography(text now) is basically <p> tag */}
                <SignupButton variant="text" onClick={toggleAccountView}>Create an account</SignupButton>
            </Wrapper>
            :
            <Wrapper>
                <TextField variant="standard" onChange={onInputValue} name='Name'  value={signUp.Name || ''} label="Enter Name"/> {/*label is just a placeholder */}
                <TextField variant="standard" onChange={onInputValue} name='Username'   value={signUp.Username || ''} label="Enter UserName"/>{/* First, React looks at signUp.Name . If signUp.Name exists and is truthy, use it If it is undefined, null, or empty, fall back to ''. 
                                                                                                                                                signUp is the state object, and Name is a key inside that object accessed using dot notation*/}
                <TextField variant="standard" type="password" onChange={onInputValue} name='Password'  value={signUp.Password || ''}  label="Enter Password"/>

                 {error && ( <Typography style={{ color: 'red', fontSize: '14px', marginTop: '10px' }}>{error}</Typography>)}
{ /*Already have an error state and an onClick handler for signupUser. Inside signupUser, you run validation, and if any field is empty you call showError('Please fill all the details'), 
which updates the error state with a string. If all fields are filled, you call showError(''), which makes error an empty string. In the JSX, the {error && <Typography>{error}</Typography>} 
part is pure JavaScript using A && B logic: when error is an empty string it is falsy, so nothing is rendered, and when error contains a string it is truthy, so the <Typography> component renders. 
Here, showError is the setter function returned by useState, and error is the current state value that React uses to decide whether to show the error message or not.*/}

                <LoginButton variant="contained" onClick={() => signupUser()}>SignUp</LoginButton>
                <Text style={{textAlign : 'center'}}>OR</Text> {/*typography(text now) is basically <p> tag */}
                <SignupButton variant="text" onClick={toggleAccountView}>Already have an account</SignupButton>
            </Wrapper>
            }
         </Box>
        
    </CustomBox>
  )
}

export default Login