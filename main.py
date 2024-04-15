from flask import Flask, make_response, jsonify, request
from flask_migrate import Migrate
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token
from models import db, Users, Products
from schemas import UsersSchema, ProductsSchema

app = Flask(__name__)


app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

app.config['JWT_SECRET_KEY'] =b'\x12\xcc}Sb\x80\xbf\x8fp\x9fT?\xfc\x16\xd8('

jwt = JWTManager(app)


migrate = Migrate(app, db)

bcrypt = Bcrypt(app)

db.init_app(app)
CORS(app)


CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True, methods=["GET", "POST", "PUT"], allow_headers=["Content-Type"])



@app.route('/users', methods = ['GET'])
def get_users():
    user_list = Users.query.all()
    users = UsersSchema(many=True).dump(user_list)
    return make_response(jsonify(users), 200)

@app.route('/register', methods = ["POST"])
def register_user():
    
    email = request.json['email']
    password = request.json['password']
    username = request.json['username']
    role = request.json['role']

    user_exists = Users.query.filter_by(email = email).first()


    if user_exists:
        return jsonify(message  = 'User exists')
    
    hashed_password = bcrypt.generate_password_hash(password)

    new_user = Users(username = username, password = hashed_password, email = email,role = role)

    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({
        "id":new_user.id,
        "email":new_user.email
    })
    
    
@app.route('/login', methods = ['GET'])
def login_user():
    email = request.json['email']
    password = request.json['password']

    user = Users.query.filter_by(email = email).first()

    if user is None:
        return jsonify(message = "Unauthorized")
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify(message = "Incorrect email/password")
    
    access_token = create_access_token(identity=email)

    user_data = UsersSchema().dump(user)
    
    
    return jsonify({
        "access_token":access_token,
        "id":user.id,
        "user_data":user_data
    })
    
@app.route('/products', methods = ["GET", "POST"])
def products_data():
    if request.method == "GET":
        products_list = Products.query.all()
        products_data = ProductsSchema(many=True).dump(products_list)
        return make_response(jsonify(products_data))
    
    
    if request.method == "POST":
        data = request.get_json()
      
        products = ProductsSchema().load(data)
        new_product = Products(**products)
        db.session.add(new_product)
        db.session.commit()
        products_schema = ProductsSchema().dump(new_product)
        return make_response(jsonify(products_schema))



@app.route("/products/<int:id>", methods = ["GET", "PATCH", "DELETE"])
def product_by_id(id):
    if request.method == "GET":
        product_name = Products.query.filter_by(id = id).first()
        product_data = ProductsSchema().dump(product_name)
        return make_response(jsonify(product_data), 200)
    
    
    if request.method == "DELETE":
        product_item = Products.query.filter_by(id = id).first()
        db.session.delete(product_item)
        db.session.commit()
        return make_response(jsonify(message = "product deleted successfully"), 200)
    
    
    if request.method == "PATCH":
        product = Products.query.filter_by(id = id).first()
        data = request.get_json()
        product_data = ProductsSchema().load(data)
        for field, value in product_data.items():
            setattr(product, field, value)
        db.session.add(product)
        db.session.commit() 

        products_data = ProductsSchema().dump(product)
        return make_response(jsonify(products_data))
    
    
if __name__ == "__main__":
    app.run(debug=True)