import { useState, useEffect } from 'react'
import ContactList from './components/ContactList'
import ContactForm from './components/ContactForm'
import './App.css'

function App() {
  const [contacts, setContacts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentContact, setCurrentContact] = useState([])

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts")
    const data = await response.json()
    setContacts(data.contacts)
  }

  const closeModal = () =>{
    setIsModalOpen(false)
    setCurrentContact({})
  }

  const openCreateModel = () =>{
    if (!isModalOpen) setIsModalOpen(true)
  }

  const openEdithModal = (contact) =>{
    if (isModalOpen) return 
    setCurrentContact(contact)
    setIsModalOpen(true)
  }

  const onUpdate = () => {
    closeModal()
    fetchContacts()
  }

  return (
  <>
    <ContactList contacts={contacts} updateContact={openEdithModal} updateCallback={onUpdate} />
    <button onClick={openCreateModel}>Create New Contact</button>
    { isModalOpen && <div className="modal">
    <div className='modal-content'>
      <span className='close' onClick={closeModal}>&times;</span>
      <ContactForm existingContact={currentContact} updateCallback={onUpdate} />
    </div>
    </div>
      
    }
  </>
  );
}

export default App
