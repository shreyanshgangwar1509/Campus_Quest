import HuntModel from "../models/Hunt.model";


const createHunt = async (req, res) => {
    const { title, host, description, Questions, Answers, Hint1, difficulty } = req.body;
    
    const existhunt = await HuntModel.findOne({title});
    if (existhunt) {
        res.status(400).json({
            message:"Hunt with this titel name is already exists"
        })
    }
    const newhunt = await new HuntModel({
        title,
        host,
        description,
        Questions,
        Answers,
        Hint1,
        difficulty,
    })
    await newhunt.save();
    res.status(200).json({
        message:"Hunt created successfully"
    })
    return;
}

const allhunts = async (req, res) => {
    const hunts = await HuntModel.findall();
    return hunts;
}

const huntinfo = async (req, res) => {
    try {
        const huntid = req.params;
        const hunt = await HuntModel.findOne({ huntid });
        if (!hunt) {
            res.status(400).json({
                message:"No such hunt exists"
            })
            return;
        }
        return hunt;
    } catch (error) {
        console.log('Error in finding hunt');
        
    }
}
const takePartInHunt = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}
const endhunt = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}