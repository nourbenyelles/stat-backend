const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: 'root',
  password: "",
  database: 'miniprojet'
});

app.get('/api/age', (_req, res) => {
  const query = 'SELECT age, COUNT(*) as count FROM avocat GROUP BY age';
  db.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la récupération des données dâge des avocats.' });
    } else {
      const labels = results.map((row) => row.age);
      const data = results.map((row) => row.count);
      res.json({ labels, data });
    }
  });
});

app.get('/api/specialite', (_req, res) => {
  const query = 'SELECT specialite, COUNT(*) as count FROM avocat GROUP BY specialite';
  db.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la récupération des données de spécialité des avocats." });
    } else {
      const labels = results.map((row) => row.spécialité);
      const data = results.map((row) => row.count);
      res.json({ labels, data });
    }
  });
});

app.post('/api/avocat', (req, response) => {
  const { nom, age } = req.body;
  const query = 'INSERT INTO avocat (nom_av, age) VALUES (?, ?)';
  db.query(query, [nom, age], (error, res) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de l'insertion des données de l'avocat." });
    } else {
      res.json({ success: true });
    }
  });
});
app.listen(8081, () => {
  console.log("Running...");
});
