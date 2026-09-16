const EmployeeAPI = {
    employees: [
      { id: 1, name: "Ben Blocker", job: "Узи", raiting: 0 },
      { id: 2, name: "Dave Defender", job: "Осмотр", raiting: 0 },
      { id: 3, name: "Sam Sweeper", job: "Осмотр", raiting: 0 },
      { id: 4, name: "Matt Midfielder", job: "Хуирургия", raiting: 0 },
      { id: 5, name: "William Winger", job: "Не знаю", raiting: 0 },
    ],
    all: function () {
      return this.employees;
    },
    get: function (id) {
      const isEmployee = (p) => p.id === id;
      return this.employees.find(isEmployee);
    },
    delete: function (id) {
      const isNotDelEmployee = (p) => p.id !== id;
      this.employees = this.employees.filter(isNotDelEmployee);
      return true;
    },
    add: function (employee) {
      if (!employee.id)
        employee = {
          ...employee,
          id:
            this.employees.reduce((prev, current) => {
              return prev.id > current.id ? prev : current;
            }, 0).id + 1,
        };
      this.employees = [...this.employees, employee];
      return employee;
    },
    update: function (employee) {
      this.get();
      this.employees.shift(employee);
      return employee;
    },
  };
  export default EmployeeAPI;