import { useState, useEffect } from 'react';
import EmployeeAPI from '../api/EmployeeAPI';
import Stars from './Stars';

function VetList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    setEmployees(EmployeeAPI.all());
  }, []);

  const handleRatingChange = (id, rating) => {
    const emp = EmployeeAPI.get(id);
    if (emp) emp.rating = rating;
    setEmployees([...EmployeeAPI.all()]);
  };

  const handleDelete = (id) => {
    EmployeeAPI.delete(id);
    setEmployees([...EmployeeAPI.all()]);
  };

  return (
    <div className="vet-list">
      <h1>Список работников клиники</h1>

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