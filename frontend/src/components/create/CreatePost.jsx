
import { Box, styled, FormControl, InputBase, Button, TextareaAutosize, Alert} from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { categories } from "../../constants/data";
import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import axios from "axios";
import API_BASE_URL from '../../constants/config'


const ImageContainer = styled(Box)`
  height: 280px;
  margin: 50px 100px;
`;

const BannerImage = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
})


const initialPost={
    title:'',
    description:'',
    picture:'',
    Username:'',
    categories:'',
    createdDate: new Date()
}

export default function CreatePost() { //this is component.

    const {account} = useContext(DataContext);
    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState(''); //for picture file
    const location = useLocation(); //useLocation is a React Router hook. It gives you info about the current URL.

    /* 
Typical location object:
    {
        pathname: "/posts", (the route path)
        search: "?category=Sports", (query string)
        hash: "",
        state: null, any data passed via navigation
    }
    So location.search is literally the query part of your URL.

Looks at the URL: ?category=Sports
Splits at = → ["?category", "Sports"]
Takes [1] → "Sports"
Fallback || 'All' → if no category exists, default is "All"
In short: “grab the category from the URL or use ‘All’ if none exists”
    */
    const url = post.picture? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'
    //if post.picture me value hai to show the value or else show the hardcodes img

    const API_URL = API_BASE_URL

//    
//       useEffect(()=>{
//         const getImage =  async() => {
//             if(file){
//                 const data = new FormData();
//                 data.append("name", file.name);
//                 data.append("file", file);
//                 data.append("title", post.title);
//                 data.append("description", post.description);
//                 data.append("categories", post.categories);

//                 const response = await axios.post(`${API_URL}/files/upload`,data,{
//                     headers:{
//                         'Content-Type': 'multipart/form-data'
//                     },
//                     withCredentials: true
//                 })
//                 post.picture = response.data //post.picture is from post state which has initial values
//             }
//         }
//         getImage();
//         post.categories = location.search?.split('=')[1] || 'All'; //check above comment
//         post.Username = account.Username
//     },[file]) //Only run this effect when file changes. Not on every render. Only when file goes from: null → img23.jpg or img23.jpg → another.png
// //useEffect runs after render, only when its dependencies change, and is used for work that shouldn’t happen while drawing UI.

const createPostHandler = async () => {
   if (!file || !post.title || !post.description || !post.categories) {
        alert("All fields are required check your image, title & description again");
        return;
    }

    if (post.description.length < 100) {
        alert("Description must be at least 100 characters long!");
        return;
    }

    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("description", post.description);
    formData.append("categories", post.categories );
    formData.append("picture", file);
    formData.append("Username", post.Username);
     formData.append("createdDate", new Date().toISOString());

    try {
        const res = await axios.post(
            `${API_URL}/create`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true
            }
        );
        console.log("Post created:", res.data);
        
        setPost(initialPost);
        setFile('');
    } catch (err) {
        console.log("Axios full error:", err);
        console.log("Status:", err.response?.status);
        console.log("Data:", err.response?.data);
        console.error("Error creating post:", err.response?.data || err.message);
    }
};

useEffect(() => {
    setPost(prev => ({
        ...prev,
        categories: location.search?.split('=')[1] || 'All',
        Username: account.Username
    }));
}, [location.search, account.Username]);


    const handleChange=(e)=>{
        setPost({...post, [e.target.name]: e.target.value})
    }

  return (
    <ImageContainer>
      <BannerImage src={url} alt="banner" />

     <FormControl style={{ width: '100%', marginTop: '20px' }}>
    
   
    <Box
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            width: '100%'
        }}
    >
        <label 
            htmlFor="fileInput" 
            style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#FD6415',
                color: '#000',
                boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
            }}
        >{/*When this label is clicked, click the input whose id="fileInput"*/}
            <AddIcon />
        </label>

        <input 
            type="file" 
            id="fileInput" // the + icon from above label will use all the "choose file" properties
            style={{display: "none"}} //hides the tradtional input button
            onChange={(e)=>setFile(e.target.files[0])} //e.target.files → a FileList (array-like). [0] → first selected file. “Take the file at index 0 and store it in state”
        /> {/* <input type="file" />
                → user selects file
                → React stores file in state
                → useEffect reacts to file change
                → FormData is prepared
                → file is sent to backend
            */}

      
        <InputBase
            onChange={handleChange}
            name="title"
            placeholder="Title"
            value={post.title}
            fullWidth
            style={{
                fontSize: '32px',
                fontWeight: 700
            }}
        />

        <Button
            variant="contained"
            style={{
                backgroundColor: '#FD6415',
                color: '#000',
                fontWeight: 600,
                padding: '8px 24px',
                borderRadius: '20px',
                textTransform: 'none',
                boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                
            }}
            onClick={createPostHandler}
        >
            PUBLISH
        </Button>
    </Box>

    <TextareaAutosize
        onChange={handleChange}
        name="description"
        value={post.description}
        placeholder="Tell your story..."
        minRows={6}
        style={{
            marginTop: '20px',
            width: '100%',
            fontSize: '18px',
            lineHeight: '1.6',
            border: 'none',
            outline: 'none',
            resize: 'none'
        }}

    />


</FormControl>

    </ImageContainer>
  )
}


/*
Timeline when app loads

First render:
file = null

Component renders
useEffect runs (first time)

Inside effect:
if (file) { ... }

But file is null, so:
getImage() does nothing
no FormData created
All good.


Timeline when user selects a file 
Step 1: user picks file
setFile(fileObject)

Step 2: React re-renders component
UI redraws
state now has the file

Step 3: React checks useEffect (Only one render after state has the file)
Did file change? → YES
Run the effect

Step 4: Effect runs
getImage();
Inside getImage:
if (file) {
  const data = new FormData();
  data.append("name", file.name);
  data.append("file", file);
}

Now:
file exists
FormData is created
file name + file added
This is preparing the file for upload.

Why getImage is inside useEffect
Because: file selection is a side effect
you don’t want this logic running on every render
only when file changes



Important clarification 🚨

useEffect does NOT:
re-render the component
refresh the page
change state automatically
It just runs code.



“Whenever the file changes,
after the screen updates,
if there is a file,
prepare it using FormData.”




Imagine you're at a **restaurant menu website**:

**useLocation = Looking at the ENTIRE receipt**
```
You get EVERYTHING:
- Which page you're on: /menu
- What filters you applied: ?category=Pizza&price=cheap
- Extra notes: #reviews
- Previous stuff: state

"Give me ALL the info about where I am"
```

**useSearchParams = Looking at ONLY the filters**
```
You ONLY care about: ?category=Pizza&price=cheap

"I just want to know what filters are active, nothing else"
*/