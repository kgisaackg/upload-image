const express = require('express');
const connectionDB = require('./connection');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;


const multer = require('multer');

app.use('/uploads', express.static('uploads'))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage});

app.post('/', upload.single('imagelocation'), (req, res) => {
   
    const imagelocation = req.file.path;
    console.log('-------------------------');
    console.log(req.body.id);
    console.log('-------------------------');

    const imageValues = [req.body.name, req.body.type, imagelocation];

    const sql = "INSERT INTO imagetbl (name, type, imagelocation) VALUES ( ?, ?, ?)";
    
    connectionDB.connection.query(sql, imageValues, (error, results, fields) => {
        console.log(results);
        console.log(error);
        if(error){
            res.json({'error': error})
        }else{
            res.json({'wergjdf': 'we good'});
        }
    });
});

app.get('/', (req, res) => {
    const sql = "SELECT * FROM imagetbl";

    connectionDB.connection.query(sql, (error, results, fields) => {
        res.json({
            id: results.id,
            name: results.name,
            type: results.type,
            request: {
                type: 'GET',
                url: "http://localhost:3000/" + p.png
            }

        });
    });
});

app.listen(port, ()=>{
    console.log(`Server is now running on ${port}`);
});
