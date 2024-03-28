import mongoose from 'mongoose';
import Document from './Doc.mjs';

const dosSchema = new mongoose.Schema({
    id : {
        type : String ,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    proprietaire: [{
        type : String ,
        ref: 'Document'
    }]
});

export default mongoose.model('Dossier', dosSchema);


