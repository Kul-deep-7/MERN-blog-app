
import { Box, styled, FormControl, InputBase, Button, TextareaAutosize} from "@mui/material"
import AddIcon from '@mui/icons-material/Add';

const ImageContainer = styled(Box)`
  height: 280px;
  margin: 50px 100px;
`;

const BannerImage = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
})




export default function CreatePost() {

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
        />

        {/* Title */}
        <InputBase
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
