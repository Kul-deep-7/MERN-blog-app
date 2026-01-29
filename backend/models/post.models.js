import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    title:{
        type : String,
        required : true
    },
    description:{
        type: String,
        required : true
    },
    picture:{
        type: String,
        required : true
    },
    categories: {
        type: String,
        enum: ['Music', 'Tech', 'Fashion', 'Sports', 'Movies'],
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, //just an ID of user
        ref: "User"
    },
},{
    timestamps: true
})

const Post = mongoose.model("Post", postSchema)

export default Post

/* 
enum means: only these values are allowed. Nothing else

Frontend click → URL (?categ=Sports)
→ CreatePost reads "Sports"
→ API receives "Sports"
→ MongoDB checks enum
→ Save allowed ✅


If someone tries:
/create?categ=Politics
MongoDB says no and refuses to save.
That’s enum enforcing discipline.
*/