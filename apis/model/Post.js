import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required : true
        },
      
        Img:{
             type: String,
        },
        Likes:{
                type: Array,
                default: []
               },
        desc:{
            type: String,
            max: 500
    },  
    },
    { timestamps: true } 
);


export default mongoose.model('Post', PostSchema);