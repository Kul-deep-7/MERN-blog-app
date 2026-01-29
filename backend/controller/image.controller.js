import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createPost = asyncHandler(async(req,res)=>{

})

export {createPost}

/* 
STEP 1: User selects a file (Frontend)
<input type="file" onChange={(e) => setFile(e.target.files[0])} />

What you get:
e.target.files[0] is a File object
It already contains:
file name
file type
size
binary data (bytes)

The browser already has the file in binary.


STEP 2: FormData packages the file
const data = new FormData();
data.append("file", file);

FormData does:
Wraps the binary file
Creates multipart/form-data
Adds boundaries so backend can split parts

Outgoing HTTP request looks like:

POST /upload
Content-Type: multipart/form-data; boundary=xyz

--xyz
Content-Disposition: form-data; name="file"; filename="pic.jpg"
Content-Type: image/jpeg

<RAW BINARY DATA>
--xyz

Important:
Binary is NOT changed
Just wrapped safely


STEP 3: Axios sends request
axios.post("/upload", data);

Browser:
Sends binary bytes
Sends headers
Sends cookies (if withCredentials: true)


STEP 4: Backend receives raw request

Without Multer:
Express sees garbage
req.body is empty
File is unreadable
Because Express cannot parse multipart data.


STEP 5: Multer intercepts request (critical)
upload.single("file")

Multer:
Reads request stream
Detects file field
Extracts binary data
Stores it (disk or memory)
Attaches metadata

Now backend sees:

req.file = {
  fieldname: 'file',
  originalname: 'pic.jpg',
  mimetype: 'image/jpeg',
  size: 24567,
  path: 'uploads/pic-123.jpg' // disk storage
}
This is the turning point.


STEP 6: Backend stores or uploads file
Option A: Store on server
/uploads/pic.jpg

Option B: Upload to Cloudinary / S3
cloudinary.uploader.upload(req.file.path)


Result:
File now lives somewhere safe
Backend gets a URL

Example:
https://res.cloudinary.com/.../pic.jpg


📤 STEP 7: Backend sends response to frontend
res.json({
  success: true,
  imageUrl: uploadedImageUrl
});


Format:
JSON
Only metadata (never binary again)


STEP 8: Frontend stores image URL
setPost(prev => ({
  ...prev,
  picture: imageUrl
}));


From now on:
You never resend the file
You only use the URL


FINAL PIPELINE DIAGRAM (MEMORIZE THIS)
FILE (binary)
 ↓
FormData (multipart)
 ↓
Axios
 ↓
HTTP request
 ↓
Multer
 ↓
req.file (binary + metadata)
 ↓
Storage / Cloud
 ↓
URL
 ↓
Frontend state

*/