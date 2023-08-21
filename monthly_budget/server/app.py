from flask import Flask, request, make_response, jsonify, Response as response
from flask_cors import CORS
import bcrypt
import jwt
import datetime
from functools import wraps
import mariadb

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = 'f95049e369ccafca7b4aefc15fb450'
app.config['JWT_TOKEN_LOCATION'] = ['cookies']

conn = mariadb.connect(
    host='127.0.0.1',
    port= 3306,
    user='root',
    password='root',
    database='budget'
)

cur = conn.cursor()

def token_required(f):
    @wraps(f)
    def function(*args, **kwargs):
        token = None
        token = request.cookies.get("token")

        if not token:
            return make_response(jsonify({"message": "token missing"}), 401)
        
        try : 
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        except: 
            return make_response(jsonify({"message": "Invalid token"}), 401)

        return f(*args, **kwargs)
    
    return function

@app.route("/signup")
def signup():
    username = request.args.get("username")
    password = request.args.get("password")

    cur.execute('SELECT COUNT(username) FROM User WHERE username = %s', (username,))
    data = cur.fetchall()
    if (data[0][0] != 0):
        return {"success": "False", "message": "username already in use"}

    cur.execute("SELECT MAX(id) FROM User")
    data = cur.fetchall()
    print(data)
    new_id = 1
    if data[0][0] is not None: new_id = data[0][0] + 1
    
    password_to_bytes = bytes(password, "utf-8")
    new_password = bcrypt.hashpw(password_to_bytes, bcrypt.gensalt())
    cur.execute("INSERT INTO User(id, username, password) VALUES(%s, %s, %s)", (new_id, username, new_password,))
    conn.commit()
    return {"success": "True"}

@app.route("/login")
def login():
    username = request.args.get("username")
    password = request.args.get("password")

    cur.execute("SELECT * FROM User WHERE username = %s ", (username,))
    data = cur.fetchall()
    if (len(data) == 0):
        return {"success": "False", "message": "user does not exist"}

    user = data[0]
    input_password = bytes(password, 'utf-8')
    correct_password = user[2]
    password_is_correct = bcrypt.checkpw(input_password, correct_password)
    if (password_is_correct == False):
        return {"success": "False", "message": "incorrect password"}

    token = jwt.encode({"id": user[0], "username": user[1], 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'], 'HS256')
    response = make_response(jsonify({"success": "True", "token": token}), 200,)
    response.headers["Content-Type"] = "application/json"
    response.set_cookie("token", token, httponly = True)
    return response

@app.route("/logout")
def logout():
    response = make_response(jsonify({"message": "successful logout"}), 200,)
    response.set_cookie("token", max_age=0)
    return response

@app.route("/is_logged")
def is_logged():
    token = request.cookies.get("token")
    if not token: 
        return make_response(jsonify({"message": "no cookie found"}), 400,)
    
    try: 
        data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
    except: 
        return make_response(jsonify({"message": "invalid token"}), 400,)
    
    return make_response(jsonify({"success" : "True"}), 200,)

@app.route("/update_password")
def update():
    username = request.args.get("username")
    password = request.args.get("password")
    requested_password = request.args.get("new_password")

    cur.execute("SELECT COUNT(username) FROM User WHERE username = %s", (username,))
    data = cur.fetchall()
    if (data[0][0] == 0):
        return make_response(jsonify({"success": "False", "message": "username not found"}), 400,)

    cur.execute("SELECT * FROM User WHERE username = %s", (username,))
    data = cur.fetchall()
    user = data[0]
    correct_password = user[2]
    input_password = bytes(password, "utf-8")
    truth = bcrypt.checkpw(input_password, correct_password)

    if truth == False: 
        return make_response(jsonify({"message": "invalid password"}), 400,)
    
    password_to_bytes = bytes(requested_password, 'utf-8')
    new_password = bcrypt.hashpw(password_to_bytes, bcrypt.gensalt())
    cur.execute("UPDATE User SET password = %s WHERE username = %s", (new_password, username,))
    conn.commit()

    response = make_response({"success": "True", "message": "successfully changed password"}, 200,)
    response.set_cookie("token", max_age=0)
    return response


@app.route("/delete_user")
def delete_user():
    #id = 0
    token = request.cookies.get("token")
    data = jwt.decode(token, app.config['SECRET_KEY'], algorithms = ['HS256'])
    id = data['id']

    cur.execute("DELETE FROM User WHERE id = %s", (id,))
    cur.execute("DELETE FROM Expenses WHERE userid = %s", (id,))
    conn.commit()

    response = make_response(jsonify({"message": "account deleted"}), 200,)
    response.set_cookie("token", max_age=0)
    return response

@app.route("/get_expenses")
@token_required
def get_expense():
    #user_id = 2
    token = request.cookies.get("token")
    user_id = 0
    
    try: 
        decoded = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        user_id = decoded['id']
    except: 
        response = make_response(jsonify({"message": "invalid token"}),405)
        return response
        
    print(user_id)
    cur.execute("SELECT * FROM Expenses WHERE userid = %s", (user_id,))
    expenses = cur.fetchall()
    
    total_expenses = []
    for expense in expenses: 
        new_expense = {}
        new_expense['id'] = expense[0]
        new_expense['userid'] = expense[1]
        new_expense['category'] = expense[2]
        new_expense['expense'] = expense[3]
        new_expense['amount'] = expense[4]
        total_expenses.append(new_expense)

    #tuple(total_expenses)
    return {"success": "True", "expenses": total_expenses}

@app.route("/create_expense")
@token_required
def create_expense():
    #user_id = 2
    #category = "medical"
    #expense = "dental"
    #amount = 50.67

    token = request.cookies.get("token")
    data = jwt.decode(token, app.config['SECRET_KEY'], algorithms = ['HS256'])
    user_id = data['id']
    category = request.args.get('category')
    expense = request.args.get('expense')
    amount = request.args.get('amount')

    cur.execute("SELECT MAX(id) FROM Expenses")
    data = cur.fetchall()
    new_id = 1
    if data[0][0] is not None: new_id = data[0][0] + 1
    cur.execute("INSERT INTO Expenses(id, userid, category, expense, amount) VALUES(%s, %s, %s, %s, %s)", (new_id, user_id, category, expense, amount,))
    conn.commit()

    return {"success": "True"}

@app.route("/delete_expense")
@token_required
def delte_expense():
    #id = 2
    id = request.args.get("id")

    cur.execute("DELETE FROM Expenses WHERE id = %s", (id,))
    conn.commit()

    return {"success": "True"}

@app.route("/postman")
def postman():
    return make_response(jsonify({"message": "hello postman"}), 200,)

@app.route("/postman_delete")
def postman_delete():
    id = request.args.get("id")

    cur.execute("DELETE FROM Expenses WHERE id = %s", (id,))
    conn.commit()

    return {"success": "True"}

if __name__ == '__main__':
    app.run()