import express from 'express';
const app = express();
app.use(express.json())

app.listen(80, () => {
  // tslint:disable-next-line:no-console
  console.log('Example app listening on port 80!');
});
