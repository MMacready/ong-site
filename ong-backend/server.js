const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Adicionado para verificar a pasta uploads

const app = express();

// Configuração do CORS para permitir requisições do frontend
app.use(cors({
  origin: 'http://localhost:3002', // Especifica a origem do frontend
  methods: ['GET', 'POST', 'DELETE', 'PUT'], // Métodos permitidos
  allowedHeaders: ['Content-Type'], // Headers permitidos
}));
app.use(express.json());

// Verificar e criar a pasta uploads, se não existir
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log('Pasta uploads criada com sucesso.');
}

// Configuração do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Apenas PDFs e imagens (JPEG/PNG) são permitidos!'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // Limite de 5MB para arquivos
});

// Middleware para capturar erros do multer
const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error('Erro do Multer:', err.message);
    return res.status(500).json({ message: 'Erro no upload de arquivo (Multer)', error: err.message });
  } else if (err) {
    console.error('Erro no upload:', err.message);
    return res.status(500).json({ message: 'Erro no upload de arquivo', error: err.message });
  }
  next();
};

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
  }
});

// Criar tabelas com logs adicionais
db.run(`
  CREATE TABLE IF NOT EXISTS about (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    image TEXT
  )
`, (err) => {
  if (err) console.error('Erro ao criar tabela about:', err.message);
  else console.log('Tabela about criada ou já existe.');
});

db.run(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT
  )
`, (err) => {
  if (err) console.error('Erro ao criar tabela projects:', err.message);
  else console.log('Tabela projects criada ou já existe.');
});

db.run(`
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    synopsis TEXT NOT NULL,
    image TEXT
  )
`, (err) => {
  if (err) console.error('Erro ao criar tabela books:', err.message);
  else console.log('Tabela books criada ou já existe.');
});

db.run(`
  CREATE TABLE IF NOT EXISTS project_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    path TEXT NOT NULL
  )
`, (err) => {
  if (err) console.error('Erro ao criar tabela project_images:', err.message);
  else console.log('Tabela project_images criada ou já existe.');
});

db.run(`
  CREATE TABLE IF NOT EXISTS transparency (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    comment TEXT,
    file_path TEXT
  )
`, (err) => {
  if (err) console.error('Erro ao criar tabela transparency:', err.message);
  else console.log('Tabela transparency criada ou já existe.');
});

// Middleware para log de todas as requisições
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Rota para Sobre Nós
app.post('/api/about', upload.single('image'), multerErrorHandler, (req, res) => {
  console.log('Recebendo requisição POST /api/about');
  console.log('Body:', req.body);
  console.log('File:', req.file);
  const { content } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  if (!content) {
    console.log('Erro: Conteúdo não fornecido');
    return res.status(400).json({ message: 'Conteúdo é obrigatório' });
  }

  db.run(
    'INSERT INTO about (content, image) VALUES (?, ?)',
    [content, image],
    function (err) {
      if (err) {
        console.error('Erro ao inserir em about:', err.message);
        return res.status(500).json({ message: 'Erro ao atualizar Sobre Nós', error: err.message });
      }
      console.log('Sobre Nós atualizado com sucesso, ID:', this.lastID);
      res.json({ message: 'Sobre Nós atualizado com sucesso' });
    }
  );
});

// Rotas para projetos
app.get('/api/projects', (req, res) => {
  console.log('Recebendo requisição GET /api/projects');
  db.all('SELECT * FROM projects', [], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar projetos:', err.message);
      return res.status(500).json({ message: 'Erro ao buscar projetos', error: err.message });
    }
    console.log('Projetos encontrados:', rows);
    res.json(rows);
  });
});

app.post('/api/projects', upload.single('image'), multerErrorHandler, (req, res) => {
  console.log('Recebendo requisição POST /api/projects');
  console.log('Body:', req.body);
  console.log('File:', req.file);
  const { title, description } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  if (!title || !description) {
    console.log('Erro: Título ou descrição não fornecidos');
    return res.status(400).json({ message: 'Título e descrição são obrigatórios' });
  }

  db.run(
    'INSERT INTO projects (title, description, image) VALUES (?, ?, ?)',
    [title, description, image],
    function (err) {
      if (err) {
        console.error('Erro ao inserir projeto:', err.message);
        return res.status(500).json({ message: 'Erro ao adicionar projeto', error: err.message });
      }
      console.log('Projeto adicionado com sucesso, ID:', this.lastID);
      res.json({ message: 'Projeto adicionado com sucesso' });
    }
  );
});

app.delete('/api/projects/:id', (req, res) => {
  console.log('Recebendo requisição DELETE /api/projects/:id');
  const { id } = req.params;
  db.run('DELETE FROM projects WHERE id = ?', id, function (err) {
    if (err) {
      console.error('Erro ao excluir projeto:', err.message);
      return res.status(500).json({ message: 'Erro ao excluir projeto', error: err.message });
    }
    console.log('Projeto excluído com sucesso, ID:', id);
    res.json({ message: 'Projeto excluído com sucesso' });
  });
});

// Rotas para livros
app.get('/api/books', (req, res) => {
  console.log('Recebendo requisição GET /api/books');
  db.all('SELECT * FROM books', [], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar livros:', err.message);
      return res.status(500).json({ message: 'Erro ao buscar livros', error: err.message });
    }
    console.log('Livros encontrados:', rows);
    res.json(rows);
  });
});

app.post('/api/books', upload.single('image'), multerErrorHandler, (req, res) => {
  console.log('Recebendo requisição POST /api/books');
  console.log('Body:', req.body);
  console.log('File:', req.file);
  const { title, author, synopsis } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  if (!title || !author || !synopsis) {
    console.log('Erro: Título, autor ou sinopse não fornecidos');
    return res.status(400).json({ message: 'Título, autor e sinopse são obrigatórios' });
  }

  db.run(
    'INSERT INTO books (title, author, synopsis, image) VALUES (?, ?, ?, ?)',
    [title, author, synopsis, image],
    function (err) {
      if (err) {
        console.error('Erro ao inserir livro:', err.message);
        return res.status(500).json({ message: 'Erro ao adicionar livro', error: err.message });
      }
      console.log('Livro adicionado com sucesso, ID:', this.lastID);
      res.json({ message: 'Livro adicionado com sucesso' });
    }
  );
});

app.delete('/api/books/:id', (req, res) => {
  console.log('Recebendo requisição DELETE /api/books/:id');
  const { id } = req.params;
  db.run('DELETE FROM books WHERE id = ?', id, function (err) {
    if (err) {
      console.error('Erro ao excluir livro:', err.message);
      return res.status(500).json({ message: 'Erro ao excluir livro', error: err.message });
    }
    console.log('Livro excluído com sucesso, ID:', id);
    res.json({ message: 'Livro excluído com sucesso' });
  });
});

// Rotas para imagens do carrossel
app.get('/api/project-images', (req, res) => {
  console.log('Recebendo requisição GET /api/project-images');
  db.all('SELECT * FROM project_images', [], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar imagens do carrossel:', err.message);
      return res.status(500).json({ message: 'Erro ao buscar imagens do carrossel', error: err.message });
    }
    console.log('Imagens do carrossel encontradas:', rows);
    res.json(rows);
  });
});

app.post('/api/project-images', upload.single('image'), multerErrorHandler, (req, res) => {
  console.log('Recebendo requisição POST /api/project-images');
  console.log('File:', req.file);
  if (!req.file) {
    console.log('Erro: Nenhuma imagem enviada');
    return res.status(400).json({ message: 'Nenhuma imagem enviada' });
  }

  const imagePath = `/uploads/${req.file.filename}`;
  db.run(
    'INSERT INTO project_images (path) VALUES (?)',
    [imagePath],
    function (err) {
      if (err) {
        console.error('Erro ao inserir imagem do carrossel:', err.message);
        return res.status(500).json({ message: 'Erro ao adicionar imagem do carrossel', error: err.message });
      }
      console.log('Imagem do carrossel adicionada com sucesso, ID:', this.lastID);
      res.json({ message: 'Imagem do carrossel adicionada com sucesso' });
    }
  );
});

app.delete('/api/project-images/:id', (req, res) => {
  console.log('Recebendo requisição DELETE /api/project-images/:id');
  const { id } = req.params;
  db.run('DELETE FROM project_images WHERE id = ?', id, function (err) {
    if (err) {
      console.error('Erro ao excluir imagem do carrossel:', err.message);
      return res.status(500).json({ message: 'Erro ao excluir imagem do carrossel', error: err.message });
    }
    console.log('Imagem do carrossel excluída com sucesso, ID:', id);
    res.json({ message: 'Imagem do carrossel excluída com sucesso' });
  });
});

// Rotas para transparência
app.get('/api/transparency', (req, res) => {
  console.log('Recebendo requisição GET /api/transparency');
  db.all('SELECT * FROM transparency', [], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar itens de transparência:', err.message);
      return res.status(500).json({ message: 'Erro ao buscar itens de transparência', error: err.message });
    }
    console.log('Itens de transparência encontrados:', rows);
    res.json(rows);
  });
});

app.post('/api/transparency', upload.single('file'), multerErrorHandler, (req, res) => {
  console.log('Recebendo requisição POST /api/transparency');
  console.log('Body:', req.body);
  console.log('File:', req.file);
  const { title, comment } = req.body;
  const filePath = req.file ? `/uploads/${req.file.filename}` : null;

  if (!title) {
    console.log('Erro: Título não fornecido');
    return res.status(400).json({ message: 'Título é obrigatório' });
  }

  db.run(
    'INSERT INTO transparency (title, comment, file_path) VALUES (?, ?, ?)',
    [title, comment || '', filePath],
    function (err) {
      if (err) {
        console.error('Erro ao inserir item de transparência:', err.message);
        return res.status(500).json({ message: 'Erro ao adicionar item de transparência', error: err.message });
      }
      console.log('Item de transparência adicionado com sucesso, ID:', this.lastID);
      res.json({ message: 'Item de transparência adicionado com sucesso' });
    }
  );
});

app.delete('/api/transparency/:id', (req, res) => {
  console.log('Recebendo requisição DELETE /api/transparency/:id');
  const { id } = req.params;
  db.run('DELETE FROM transparency WHERE id = ?', id, function (err) {
    if (err) {
      console.error('Erro ao excluir item de transparência:', err.message);
      return res.status(500).json({ message: 'Erro ao excluir item de transparência', error: err.message });
    }
    console.log('Item de transparência excluído com sucesso, ID:', id);
    res.json({ message: 'Item de transparência excluído com sucesso' });
  });
});

// Rota de teste para verificar se o backend está funcionando
app.get('/api/health', (req, res) => {
  console.log('Recebendo requisição GET /api/health');
  res.json({ status: 'Backend está funcionando!' });
});

app.listen(3003, () => {
  console.log('Servidor rodando na porta 3003');
});