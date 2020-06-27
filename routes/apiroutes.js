const router = require("express").Router();
const path = require("path")
const outputPath = path.resolve(__dirname, "../db/db.json")
let notes = []
let id = 0
const fs = require("fs")

function writeFile() {
    let overwrite = JSON.stringify(notes);
    fs.writeFile(outputPath, overwrite, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("File written");
        }
    });
}

router.get("/notes", function(req, res) {
    return res.json(notes);
  });

router.post("/notes", function(req, res) {

    const newNote = req.body;
    newNote.id = id
    id += 1
  
    notes.push(newNote);
    console.log(notes)
    writeFile()

    return res.json(newNote);
  });

  router.delete("/notes/:id", function(req, res) {
    notes = notes.filter(note => note.id !== Number(req.params.id));
    writeFile() 
    res.end()
  });


  module.exports = router;