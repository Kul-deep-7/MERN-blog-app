import {useState} from 'react'
import {Box, TextField, Button, styled, Typography} from '@mui/material' //Box is basically a div substitute in Material UI. it has sx prop which is inline styling without css files.    Box = div + styling + theme + convenience
import axios from 'axios'


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


const Login = () => {
    const [account, toggleAccount] = useState(true)
    const [signUp, setSignUp] = useState(setInitialValue)
    const [error, showError] = useState('');


    const toggleAccountView = () => {
        toggleAccount(!account); // flips true & false
        setSignUp(setInitialValue);
    };

    const onInputValue = (e) => {
    // console.log("onInputValue triggered:");
    // console.log("e.target.name:", e.target.name);
    // console.log("e.target.value:", e.target.value);
    
    setSignUp({...signUp, [e.target.name]: e.target.value});
}

    const API_URL = "http://localhost:7000"


   const signupUser = async () => {
    try {
        console.log("=== FRONTEND DEBUG ===");
        console.log("Current signUp state:", signUp);
        console.log("Sending to backend...");
        
        const response = await axios.post(`${API_URL}/signup`, signUp, // Make sure this has data
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        
        console.log("Signup Success:", response.data);
        toggleAccount(true);
        setSignUp(setInitialValue);
    } catch (error) {
        console.error("Signup Error:", error.response?.data || error.message);
    }
};


    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png'

  return ( 
    <CustomBox>
        <Box>
            <Image src={imageURL} alt='login'/> {/*Image was img before cuz of styled */}
            {
                account === true ?
            <Wrapper>
                <TextField variant="standard" label="Enter Username"/> {/*label is just a placeholder */}
                <TextField variant="standard" label="Enter Password"/>
                <LoginButton variant="contained">Login</LoginButton>
                <Text style={{textAlign : 'center'}}>OR</Text> {/*typography(text now) is basically <p> tag */}
                <SignupButton variant="text" onClick={toggleAccountView}>Create an account</SignupButton>
            </Wrapper>
            :
            <Wrapper>
                <TextField variant="standard" onChange={onInputValue} name='Name'  value={signUp.Name || ''} label="Enter Name"/> {/*label is just a placeholder */}
                <TextField variant="standard" onChange={onInputValue} name='Username'   value={signUp.Username || ''} label="Enter UserName"/>
                <TextField variant="standard" onChange={onInputValue} name='Password'  value={signUp.Password || ''}  label="Enter Password"/>

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