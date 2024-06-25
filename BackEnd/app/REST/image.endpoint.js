import businessContainer from "../business/business.container.js";
import multer from "multer";
import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
const storageS = multer.memoryStorage();
const upload =  multer({ storage: storageS});
const ImageEndpoint = (router) => {
    router.put('/api/Image/update/:id', async (req, res) => {
        try {
            const ImageEntry = await businessContainer.getImageManager(req).update(req.body,req.params.id);
            if (ImageEntry) {
                res.status(201).json(ImageEntry);
            } else {
                res.status(500).json({ error: 'Error creating Image entry 1' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error creating Image entry' });
        }
    });
    router.put('/api/deleteImage/:id', async (req, res) => {
        try {

            const ImageEntry = await businessContainer.getImageManager().remove(req.params.id);
            if (ImageEntry) {
                res.status(201).json(ImageEntry);
            } else {
                res.status(500).json({ error: 'Error creating Image entry 1' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error creating Image entry' });
        }
    });
    router.get('/api/Image/byId/:Id', async (req, res,next) => {
        try {
            const Image = await businessContainer.getImageManager().get(req.params.Id);
            console.log(Image);
            res.status(200).json(Image);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching Image' });
        }

    });
    router.get('/api/Image/by-owner/:ownerId', async (req, res) => {
        const ownerId = req.params.ownerId;
        console.log(req.params.ownerId);
        try {
            const Image = await businessContainer.getImageManager(req).findByOwner(ownerId);
            console.log(Image);
            res.status(200).json(Image);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching Image' });
        }

    });
    router.get('/api/Image/by-owner/amount/:ownerId', async (req, res) => {
        const ownerId = req.params.ownerId;
        console.log(req.params.ownerId);
        try {
            const Image = await businessContainer.getImageManager(req).findByOwner(ownerId);
            console.log(Image.length);
            res.status(200).json(Image.length);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching Image' });
        }
    });

    router.get('/api/Images', async (req, res, next) => {

        try {
            const Image = await businessContainer.getImageManager().query();
            //const obj = JSON.parse(Image.toString());
            console.log(Image.length);
          /*  for (let i = 0; i < Image.length; i++){
                let obj = Image[i];
                console.log(obj.image_data);
                const b64 = Buffer.from(obj.image_data).toString('base64');
                const mimeType = 'image/png'; // e.g., image/png

                res.write(`<img src="data:${mimeType};base64,${b64}" />`);
            }
*/

            res.status(200).send(Image);
        } catch (error) {
            res.status(500).send({ error: 'Error fetching Image' });
        }
    });



    router.post('/api/createImage',upload.single('file'), async (req, res, next) => {
        try {


            let temp = {
                id_user:req.body.id_user,
                title:req.body.title ,
                description:req.body.description ,
                is_public:req.body.is_public,
                filename: req.file.originalname,
                size : req.file.size,
                image_data: req.file.buffer,
                imgType: req.file.mimetype
            };
            const ImageEntry = await businessContainer.getImageManager().createNew(temp);

            if (ImageEntry) {
                res.status(201).send('Image '+req.file.originalname+' added');
            } else {
                res.status(500).json({ error: 'Error creating Image entry 1' });
            }
        } 
    });
};
export default ImageEndpoint;
