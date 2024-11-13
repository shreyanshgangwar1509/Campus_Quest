// /api/business

import Business from "../models/business";


export const getallbusinness = async(req,res) => {
    try {
        const response = await Business.find();
        return res.json(response);

    } catch (error) {
        res.status(500).json({
            message:"error in getting all bussiness"
        })
    }
}