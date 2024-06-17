import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';

const Schedule = ({ auth, handleLogout }) => {
  const [concerts, setConcerts] = useState([]);
  const [newConcert, setNewConcert] = useState({
    date: '',
    city: '',
    address: ''
  });

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/schedule');
        setConcerts(response.data);
      } catch (error) {
        console.error('Ошибка при получении концертов:', error);
      }
    };

    fetchConcerts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewConcert({ ...newConcert, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:5000/schedule', newConcert);
      const response = await axios.get('http://127.0.0.1:5000/schedule');
      setConcerts(response.data);
      setNewConcert({ date: '', city: '', address: '' });
    } catch (error) {
      console.error('Ошибка при создании концерта:', error);
    }
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(date).toLocaleDateString('ru-RU', options);
  };

  return (
    <div>
      <Header auth={auth} handleLogout={handleLogout} />
      <div className='content'>
          <h2 style={{ textAlign: 'center' }}>Концерты</h2>
          <table className="table" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <thead>
              <tr>
                <th>Дата</th>
                <th>Город</th>
                <th>Адрес</th>
              </tr>
            </thead>
            <tbody>
              {concerts.map(concert => (
                <tr key={concert.id}>
                  <td>{formatDate(concert.date)}</td>
                  <td>{concert.city}</td>
                  <td>{concert.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>

      <div className='content'>
          <h3 style={{ textAlign: 'center', marginTop: '20px' }}>Добавить концерт</h3>
          <form onSubmit={handleSubmit} style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="form-group">
              <label htmlFor="date">Дата:</label>
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"
                value={newConcert.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">Город:</label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={newConcert.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Адрес:</label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={newConcert.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Создать концерт</button>
          </form>
      </div>
    </div>
  );
};

export default Schedule;
