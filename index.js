const cambria = require('cambria');
const fs = require('fs');

// read doc from stdin if no input specified
const input = fs.readFileSync("./resources/button-instance.json" || 0, 'utf-8');
const doc = JSON.parse(input);

// we can (optionally) apply the contents of the changed document to a target document
const base = false;
// const base = "./dist/button-instance.json";
const targetDoc = base ? JSON.parse(fs.readFileSync(base, 'utf-8')) : {};

const schema = "./resources/button.schema.json";
const schemaDoc = schema ? JSON.parse(fs.readFileSync(schema, 'utf-8')) : {};

// now load a (yaml) lens definition
const lensData = fs.readFileSync("./resources/kickstartds-button.lens.yml", 'utf-8');
let lens = cambria.loadYamlLens(lensData);

// should we reverse this lens?
const reverse = false;
if (reverse) {
  lens = cambria.reverseLens(lens);
}

const updatedSchema = cambria.updateSchema(schemaDoc, lens);

// finally, apply the lens to the document, with the schema, onto the target document!
const newDoc = cambria.applyLensToDoc(lens, doc, schemaDoc, targetDoc);

fs.writeFileSync("./dist/button-instance.json", JSON.stringify(newDoc, null, 2));
fs.writeFileSync("./dist/button.schema.json", JSON.stringify(updatedSchema, null, 2));