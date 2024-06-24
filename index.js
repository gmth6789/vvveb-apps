const express = require('express');
const bodyParser = require('body-parser');
const { resolve } = require('path');
const fs = require('fs');

const app = express();
const PORT = 8080;

app.use(express.static("./"));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: "200mb"
}));

// app.get('/', (req, res) => {
//   res.sendFile(resolve(__dirname, 'pages/index.html'));
// });


app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'editor.html'));
});

app.post('/save.php', (req, res) => {
  const { file, action, startTemplateUrl, html } = req.body;

  let result = "File saved!";
  fs.writeFileSync(file, html);
	
	try {
	  fs.writeFileSync(file, html);
	} catch (err) {
	  result = "Error saving file!";
	  console.error(err);
	}


  res.send(result);
});
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
