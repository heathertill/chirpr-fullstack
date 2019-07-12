import * as path from 'path';
import * as express from 'express';
import apiRouter from './routes';

const app = express();

let p = path.join(__dirname, '../public');
console.log(p);

app.use(express.static(p));  // serves any static files to the home path route

app.use(express.json());  // parsers req.body._ "content-type: application/json"
                          // turns on expr.json, intercept the request, parse the body object
                          // add it to the request and sending it to the next step => apiRouter
app.use(apiRouter);

// add this at the bottom of the list. Will allow application to refresh the current
// page in the browser even it is not on localhost3000
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});


const port = process.env.PORT || 3000; // process.env.PORT is used for deployment (i.e. Heroku)
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
