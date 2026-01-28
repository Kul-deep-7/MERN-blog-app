
import { Box, styled, FormControl, InputBase, Button, TextareaAutosize} from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { categories } from "../../constants/data";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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

export default function CreatePost() {

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

    useEffect(()=>{
        const getImage = () => {
            if(file){
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);
            }
        }
        getImage();
        post.categories = location.search?.split('=')[1] || 'All'; //check above comment
    },[file])



    const handleChange=(e)=>{
        setPost({...post, [e.target.name]: e.target.value})
    }

    const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'
  return (
    <ImageContainer>
      <BannerImage src={url} alt="banner" />

     <FormControl style={{ width: '100%', marginTop: '20px' }}>
    
    {/* ROW: +  Title  Publish */}
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

        {/* Title */}
        <InputBase
            onChange={handleChange}
            name="title"
            placeholder="Title"
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
                boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
            }}
        >
            PUBLISH
        </Button>
    </Box>

    {/* Content */}
    <TextareaAutosize
        onChange={handleChange}
        name="description"
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
