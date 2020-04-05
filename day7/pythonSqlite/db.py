import sqlite3
import uuid
from typing import List
from employee import Employee


def test():
    conn = sqlite3.connect(':memory:')
    c = conn.cursor()
    c.execute("""DROP TABLE IF EXISTS employees;""")
    c.execute("""
      CREATE TABLE IF NOT EXISTS
        employees (
          id TEXT PRIMARY KEY,
          first TEXT NOT NULL,
          last TEXT NOT NULL,
          pay INTEGER NOT NULL
        );

      """
              )

    e1 = Employee('Jog', 'Joe', 5000)
    e2 = Employee('Bog', 'Boe', 6000)
    entries = [e1, e2]
    for entry in entries:
        c.execute("INSERT INTO employees VALUES (?, ?, ?, ?);",
                  (uuid.uuid4(), entry.first, entry.last, entry.pay))
        c.execute("INSERT INTO employees VALUES ('bob', 'dole', 5000)")
        c.execute("SELECT * FROM employees WHERE last=?", (e1.last,))
        print(c.fetchall())
        c.execute("SELECT * FROM employees WHERE last=:last",
                  {'last': e2.last})
        print(c.fetchmany(5))
        conn.commit()
        conn.close()


class EmployeeRepository:
    def __init__(self, dbUrl: str = ':memory:'):
        self.conn = sqlite3.connect(dbUrl)
        self.cursor = self.conn.cursor()

    def setup(self):
        self.cursor.execute("DROP TABLE IF EXISTS employees;")
        self.cursor.execute("""
          CREATE TABLE IF NOT EXISTS
            employees (
              id TEXT PRIMARY KEY,
              first TEXT NOT NULL,
              last TEXT NOT NULL,
              pay INTEGER NOT NULL
            );
        """)

    def closeConnection(self):
        self.conn.close()

    def execute(self, statement: str, parameterDict: dict):
        with self.conn:
            self.cursor.execute(statement, parameterDict)

    def insert(self, e: Employee):
        self.execute('INSERT INTO employees VALUES (:id, :first, :last, :pay);', {
            'id': str(uuid.uuid4()), 'first': e.first, 'last': e.last, 'pay': e.pay
        })

    def byFirst(self, first: str) -> List[Employee]:
        self.execute('SELECT * FROM employees WHERE first=:first', {
            'first': first
        })
        return self.cursor.fetchall()


repo = EmployeeRepository()
repo.setup()
repo.insert(Employee('Bog', 'Boe', 6000))
print(repo.byFirst('Bog'))

repo.closeConnection()
