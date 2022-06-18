const mongoose = require("mongoose")

const ArtistSchema = mongoose.Schema({
    _id:{
        type: mongoose.Types.ObjectId,
        default: mongoose.Types.ObjectId,
    },
    birthName:{
        type: String,
        required: true,
        unique: true
    },
    artisticName: String,
    age:{
        type: Number,
        required: true
    },
    birthday: Date,
    from:{
        type: String,
        required: true
    },
    occupation:{
        type: [String],
        required: true
    },
    bio:{
        type: String,
        required: true
    },
    famousWorks:{
        type: [String],
        required: true
    },
    awards: [String],
    alive:{
        type: Boolean,
        required: true
    },
    image: [String]
    
    }, { timestamps  : true })
    

const Model = mongoose.model("artist", ArtistSchema)


module.exports = Model