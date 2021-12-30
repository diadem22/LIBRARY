const express = require ('express')
const app = express()
let { books } = require ('./booksdata')


app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.get('/api/books', (req, res) => {
  res.status(200).json({ success: true, data: books })
})
app.get('/api/books/:id', (req, res) => {
  res.status(200).json({ success: true, data: id })
})
app.post('/api/postman/books', (req, res) => {
  const { name } = req.body
  if (!name) {
    return res.status(400).json({ success: false, msg: 'please provide name value' })
  }
  res.status(201).json({ success: true, data: [...books, name] })
})


app.put('/api/books/:id', (req, res) => {
  const { id } = req.params
  const { name } = req.body
  
  const title = books.find((title) => title.id === Number(id))

  if (!title) {
    return res.status(404).json({ success: false, msg: `The book with id ${id} is currently not available` })
  }
  const newBook = books.map((title) => {
    if (title.id === Number(id)) {
      title.name = name
     
    }
    return title
  })
  res.status(200).json({ success: true, data: newBook })
})

app.delete('/api/books/:id', (req, res) => {
  const title = books.find((title) => title.id === Number(req.params.id))
  if (!title) {
    return res.status(404).json({ success: false, msg: `The book with id is currently not available ${req.params.id}` })
  }
  const newBook = books.filter(
    (title) => title.id !== Number(req.params.id)
  )
  return res.status(200).json({ success: true, data: newBook })
})


app.listen(6000, () => {

  console.log('Server is listening on port 6000....')
})
