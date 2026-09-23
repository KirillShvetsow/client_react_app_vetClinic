import { useState, useEffect } from 'react';
import EmployeeAPI from '../api/EmployeeAPI';
import Stars from './Stars';

function VetList({ currentUser }) {
  const [employees, setEmployees] = useState([]);

  // Стейт для полей формы добавления
  const [newName, setNewName] = useState('');
  const [newJob, setNewJob] = useState('');

  // Загружаем сотрудников при первом рендере
  useEffect(() => {
    setEmployees(EmployeeAPI.all());
  }, []);

  // Обработчик изменения рейтинга
  const handleRatingChange = (id, rating) => {
    const emp = EmployeeAPI.get(id);
    if (emp) emp.rating = rating;
    setEmployees([...EmployeeAPI.all()]);
  };

  // Обработчик удаления
  const handleDelete = (id) => {
    EmployeeAPI.delete(id);
    setEmployees([...EmployeeAPI.all()]);
  };

  // Обработчик добавления нового сотрудника
  const handleAdd = (e) => {
    e.preventDefault(); // чтобы страница не перезагружалась при submit

    // Вызываем метод add из нашего "API"
    EmployeeAPI.add({
      name: newName.trim(),
      job: newJob.trim(),
      rating: 0,
    });

    // Обновляем стейт — React перерисует таблицу
    setEmployees([...EmployeeAPI.all()]);

    // Очищаем поля формы
    setNewName('');
    setNewJob('');
  };

  return (
    <div className="vet-list">
      <h1>Список работников клиники</h1>

      {/* Форма добавления */}
      <form onSubmit={handleAdd} className="add-form">
        <input
          type="text"
          placeholder="ФИО сотрудника"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Специализация"
          value={newJob}
          onChange={(e) => setNewJob(e.target.value)}
          required
        />
        <button type="submit">Добавить</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>ФИО</th>
            <th>Специализация</th>
            <th>Оценка</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e) => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.name}</td>
              <td>{e.job}</td>
              <td>
                <Stars
                  value={e.rating}
                  onChange={(rating) => handleRatingChange(e.id, rating)}
                />
              </td>
              <td>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(e.id)}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {employees.length === 0 && <p>Список пуст</p>}
    </div>
  );
}

export default VetList;