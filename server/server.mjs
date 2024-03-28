import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './models/User.mjs';
import Document from './models/Doc.mjs';
import Dossier from './models/Dos.mjs';

const PORT = 3000;
const app = express();
const uri = "mongodb+srv://ghita123:ghita@cluster0.d98u6ni.mongodb.net/?retryWrites=true&w=majority";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.path}`);
  next();
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(`Login request from username => ${username}  pwd => ${password}`);
  try {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      return res.json(user.role);
    } else {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error during login: ', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/login/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    return res.json(user.accountStatus);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/sign_up', async (req, res) => {
  const { username, password, email, firstName, lastName } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = new User({
    username,
    password: hashedPassword,
    email,
    firstName,
    lastName,
    dateRegistered: new Date(),
  });

  const user = await User.findOne({ username });

  if (user && bcrypt.compareSync(password, user.password)) {
    return res.status(400).json({ message: 'Utilisateur déjà existant' });
  }

  newUser.save().then(savedUser => {
    console.log('User saved:', savedUser);
  })

      .catch(error => {
        console.error('Error saving user:', error);
      });

  res.json("sign up succes");
});

app.get('/home/:role?', async (req, res) => {
  try {
    const roleFilter = req.params.role;
    const users = roleFilter
        ? await User.find({ role: roleFilter })
        : await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/home', async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username });
    console.log(user);
    if (user.accountStatus == "suspended")
      user.accountStatus = "active";
    else
      user.accountStatus = "suspended";
    await user.save();
    console.log(user);
    return res.json(user.accountStatus);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/home/:username', async (req, res) => {
  const { username } = req.params;
  try {
    await User.deleteOne({ username });
    return res.json('user deleted');
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/doc/:prop/:fold', async (req, res) => {
  try {
    const { prop, fold } = req.params;
    const documents = await Document.find({ proprietaire: prop, folder: fold });
    res.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/doc/:prop', async (req, res) => {
  try {
    const { prop } = req.params;
    const documents = await Document.find({ proprietaire: prop });
    res.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add a new document
app.post('/doc/:folder', async (req, res) => {
  const { folder } = req.params;
  const { emplacement, name, extension, type, taille, proprietaire } = req.body;
  try {
    // Find the last document in the database and get its ID
    const lastDocument = await Document.findOne({}, {}, { sort: { 'id': -1 } });
    let lastId = 0;
    if (lastDocument) {
      lastId = lastDocument.id;
    }
    const newId = lastId + 1;

    // Create a new document instance with the new ID
    const document = new Document({ id: newId, emplacement, name, extension, type, taille, proprietaire, folder });
    await document.save();
    res.json({ message: 'Document added successfully' });
  } catch (error) {
    console.error('Error adding document:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/doc/:id/:folder', async (req, res) => {
  const { id, folder } = req.params;
  const updatedDocument = req.body;
  updatedDocument.emplacement = folder + '/' + updatedDocument.name + '.' + updatedDocument.extension;
  try {
    await Document.findOneAndUpdate({ id: id }, updatedDocument);
    res.json({ message: 'Document updated successfully' });
  } catch (error) {
    console.error('Error updating document:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a document
app.delete('/doc/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const iddoc = parseInt(id.split(':')[1], 10);
    const doc = await Document.findOneAndDelete({ id: iddoc });
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/dossier/:prop', async (req, res) => {
  try {
    const { prop } = req.params;
    const documents = await Dossier.find({ proprietaire: prop });
    res.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/dossier', async (req, res) => {
  const { name, proprietaire } = req.body;
  try {
    const lastDocument = await Dossier.findOne({}, {}, { sort: { 'id': -1 } });
    let lastId = 0;
    if (lastDocument) {
      lastId = lastDocument.id;
    }
    const newId = lastId + 1;

    const document = new Dossier({ id: newId, name, proprietaire });
    await document.save();
    res.json({ message: 'Document added successfully' });
  } catch (error) {
    console.error('Error adding document:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/dossier/:id', async (req, res) => {
  const { id } = req.params;
  const updatedDocument = req.body;
  try{
    await Dossier.findOneAndUpdate({ id: id }, updatedDocument);
    res.json({ message: 'Document updated successfully' });
  }catch(error){
    console.error('Error updating document:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/dossier/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const doc = await Document.deleteMany({ folder: id });
    const dos = await Dossier.findOneAndDelete({ id: id });
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Error deleting folder:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
