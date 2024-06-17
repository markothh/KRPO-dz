import Header from './Header';
import axios from 'axios';
import React, { useEffect, useState } from 'react';



const Contacts = ({ auth, handleLogout }) => {
    const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/contacts');
        setContacts(response.data);
      } catch (error) {
        console.error('Ошибка при получении врачей:', error);
      }
    };

    fetchContacts();
  }, []);
  return (
    <div>
      <Header auth={auth} handleLogout={handleLogout} />
      <div className='content'>
          <h2 style={{ textAlign: 'center'}}>Контакты</h2>
          <table className="table" style={{ maxWidth: '1000px', margin: '0px auto' }}>
            <thead>
              <tr>
                <th>ФИО</th>
                <th>Должность</th>
                <th>E-mail</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(contact => (
                <tr key={contact.id}>
                  <td>{contact.name}</td>
                  <td>{contact.position}</td>
                  <td>{contact.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </div>
  );
};

export default Contacts;




