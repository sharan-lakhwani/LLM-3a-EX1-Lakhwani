import mongoose from "mongoose";
const Schema = mongoose.Schema;

const rankingsSchema = new Schema({
    level: {
        type: Number,
        required: true
    }, 
    points: {
        type: Number,
        required: true, 
    }, 
    player: {
        type: mongoose.Schema.ObjectId,
        ref: 'Players'
    }
}, 
{ versionKey: false }
);



const Rankings =  mongoose.model('Rankings', rankingsSchema);
export default Rankings;