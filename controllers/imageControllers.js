const Image = require('../models/Image');

const getImage = async (req, res) => {
    try{
        const image = await Image.find();
        return res.status(200).json({image})
    }catch(err){
        return res.status(500).json({err})
    }
};

const uploadImage = async (req, res) => {
    try {
        if (req.file && req.file.path){
            const image = new Image({
                url: req.file.path,
            });

            await image.save()
            return res.status(200).json({ msg: "Image saved successfully" })
        } else {
            return res.status(422).json({ err })
        }
    } catch (err) {
       return res.status(500).json({ err })
    }
}

module.exports = {
    getImage,
    uploadImage
}