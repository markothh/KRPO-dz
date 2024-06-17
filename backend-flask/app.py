from flask import Flask, request, jsonify, session, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
CORS(app)

# Конфигурация для PostgreSQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:123123@localhost:5432/krpo_kirkorov'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

    def __init__(self, email, password):
        self.email = email
        self.password = password


class Schedule(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False)
    city = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255), nullable=False)


class Contacts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    position = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)


# Инициализация базы данных
with app.app_context():
    db.create_all()


@app.route('/register', methods=['POST'])
def register():
    data = request.json
    users = Users.query.filter_by(email=data['email']).first()
    if users:
        return jsonify({'message': 'Пользователь уже существует'}), 400

    new_users = Users(email=data['email'], password=data['password'])
    db.session.add(new_users)
    db.session.commit()
    return jsonify({'message': 'Пользователь успешно зарегистрирован'}), 201


@app.route('/login', methods=['POST'])
def login():
    data = request.json

    users = Users.query.filter_by(email=data['email'], password=data['password']).first()
    if not users:
        return jsonify({'message': 'Неверные учетные данные'}), 401

    session['users'] = {'email': users.email}  # Сохраняем только email в сессии
    return jsonify({'message': 'Вход выполнен успешно'}), 200


@app.route('/logout', methods=['GET'])
def logout():
    session.pop('users', None)  # Удаляем пользователя из сессии
    return "logout ok"


@app.route('/schedule', methods=['GET', 'POST'])
def manage_schedule():
    if request.method == 'GET':
        schedule = Schedule.query.all()
        concert_list = []
        for concert in schedule:
            concert_list.append({
                'id': concert.id,
                'date': concert.date,
                'city': concert.city,
                'address': concert.address
            })
        return jsonify(concert_list)

    if request.method == 'POST':
        data = request.json
        new_concert = Schedule(date=data['date'], city=data['city'], address=data['address'])
        db.session.add(new_concert)
        db.session.commit()
        return jsonify({'message': 'Концерт успешно добавлен'}), 201


@app.route('/contacts', methods=['GET'])
def get_contacts():
    if request.method == 'GET':
        contacts = Contacts.query.all()
        contact_list = []
        for contact in contacts:
            contact_list.append({
                'id': contact.id,
                'name': contact.name,
                'position': contact.position,
                'email': contact.email
            })
        return jsonify(contact_list)


if __name__ == '__main__':
    app.run(debug=True)
