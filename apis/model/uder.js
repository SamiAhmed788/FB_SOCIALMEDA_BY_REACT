import mongoose from 'mongoose';

const UsersSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            min : 3,
            max : 20, 
            unique : true


        },
        email: {
            type: String,
            required: true,
            max : 50,
            unique : true
        },
        password: {
            type: String,
            required: true,
            min:6,
        },
        profilepicture:{
             type: String,
             default: ""
        },coverpicture:{
                type: String,
                default: ""
        },
        followers:{
                type: Array,
                default: []
               },
                 followings:{
                type: Array,
                default: []
               },
        isAdmin:{
                  type: Boolean,
                  default : false
        } ,desc:{
            type: String,
            min : 50
    },    from:{
        type: String,
        min : 50,
}, relationship:{
    type: String,
    status : ""
},   city:{
    type: String,
    status : ""

}        
        
    },
    { timestamps: true } 
);


export default mongoose.model('Users', UsersSchema);