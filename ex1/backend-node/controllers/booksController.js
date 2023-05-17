import Books from '../models/Books.js';

export const showAllBooks = async (req, res) => {
    try {
        const documents = await Books.find({});
        res.json(documents);
    } catch (error) {
        console.log(error);
    }
};

export const showBookById = async (req, res) => {
    const document = await Books.findById(req.params.idBook);
    if(!document) {
        res.json({message : 'Book no exists'});
    }
    res.json(document);
};

export const searchBooksByName = async (req, res) => {
    try {
        const { query } = req.params;
        const documents = await Books.find({ nombre: new RegExp(query, 'i') });
        res.json(documents);
    } catch (error) {
        console.log(error);
    }
};

export const newBook = async (req, res) => {
    const document = new Books(req.body);
    try {
        const doc = await document.save();
        res.json({ 
            error:false,
            message : 'New book was added with id:'+doc._id 
        });
    } catch (error) {
        //res.send(error);
        res.json({ 
            error:true,
            message : error
        });
    }
};

export const updateBook = async (req, res) => {
    try {
        const filter = { _id : req.body.id };
        const update =  req.body;
        const options = {new : true};
        const document = await Books.findOneAndUpdate(filter, update, options);
        res.json({
           "message":"Book modified successfuly",
           ...document
        });
    } catch (error) {
        res.send(error);
    }
};

export const deleteBook = async (req, res) => {
    try {
        await Books.findByIdAndDelete({ _id : req.params.idBook });
        res.json({message : 'Book was deleted with id:'+req.params.idBook });
    } catch (error) {
        console.log(error);
    }
};
