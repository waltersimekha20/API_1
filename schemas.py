from marshmallow import Schema, fields


class ProductsSchema(Schema):
    id = fields.Integer()
    name = fields.String()
    description = fields.String()
    manufacturer= fields.String()
    price = fields.Integer()
    quantity = fields.Integer()
    image_url = fields.String()
    user_id = fields.Integer()



class UsersSchema(Schema):
    email = fields.String()
    password = fields.String()
    username = fields.String()
    role = fields.String()
    products = fields.Nested(ProductsSchema, many=True)