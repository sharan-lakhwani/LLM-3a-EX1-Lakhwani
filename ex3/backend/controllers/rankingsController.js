import Rankings from '../models/Rankings.js';

export const showAllRankings = async (req, res) => {
    try {
        const documents = await Rankings.find({});
        res.json(documents);
    } catch (error) {
        console.log(error);
    }
};

export const showRankingById = async (req, res) => {
    const document = await Rankings.findById(req.params.idRanking);
    if(!document) {
        res.json({message : 'Ranking no exists'});
    }
    res.json(document);
};

export const showRankingByLevel = async (req, res) => {
    try {
        console.log("level", req.params.level);
        const documents = await Rankings.find({level:req.params.level}).populate("player").sort({points:-1});     
        res.json(documents);
    } catch (error) {
        console.log(error);
    }
};

export const newRanking = async (req, res) => {
    const document = new Rankings(req.body);
    try {
        const doc = await document.save();
        res.json({ 
            error:false,
            message : 'New ranking was added with id:'+doc._id 
        });
    } catch (error) {
        //res.send(error);
        res.json({ 
            error:true,
            message : error
        });
    }
};

export const updateRanking = async (req, res) => {
    try {
        const filter = { _id : req.body.id };
        const update =  req.body;
        const options = {new : true};
        const document = await Rankings.findOneAndUpdate(filter, update, options);
        res.json({
           "message":"Ranking modified successfuly",
           ...document
        });
    } catch (error) {
        res.send(error);
    }
};

export const deleteRanking = async (req, res) => {
    try {
        await Rankings.findByIdAndDelete({ _id : req.params.idRanking });
        res.json({message : 'Ranking was deleted with id:'+req.params.idRanking });
    } catch (error) {
        console.log(error);
    }
};
