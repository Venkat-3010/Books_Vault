import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import CreateBooks from './pages/CreateBooks'
import ShowBooks from './pages/ShowBooks'
import EditBooks from './pages/EditBooks'
import DeleteBooks from './pages/DeleteBooks'
import Home from './pages/Home'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/books/create' element={<CreateBooks />} />
      <Route path='/books/details/:id' element={<ShowBooks />} />
      <Route path='/books/edit/:id' element={<EditBooks />} />
      <Route path='/books/delete/:id' element={<DeleteBooks />} />
    </Routes>
  )
}

export default App
