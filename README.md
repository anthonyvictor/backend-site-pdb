## Back-end da aplicação do Tech Dinner.

### Requirements

- yarn
- docker and docker-compose

### Installation

**- Clone this repository**

```sh
git clone https://github.com/techdinner/techdinner-backend.git
```

**- Change directory**

```sh
cd techdinner-backend
```

**- Run database with Docker**

```sh
make || make run
```

**- Migrations:**
> Run docker, and make sure your database container is active and running OK.

- If you are NOT using an ORM, first, run:
```sh	
yarn migration:sql
```
- If you are using TypeORM:

```sh	
yarn migration:run
```

**- Run project without Docker (dev environment)**

```sh
yarn
```

**- Start the project in development**

```sh
yarn dev
```

### Features

**- Users management**
- There's two types of users: `admin user` and `standard user`
- Admins could create new users, change user's role and manage some other things standard users can't.
- When admin first create a new user, the application will send an email to registered address, with a link for the ``password-insertion window``. It guarantees the confidentiality of the password.

**- Customers CRUD**
- Any users can `create`, `read`, and `update` informations of a customer. But only `admins` can `delete`.
- Customers that already have at least 1 order registered in the database can't be deleted, `not even by admin`.
- You can insert `tags` to make easy the search by keywords. (Tags won't appear in the order paper in the printer.)
- Customers could have multiple addresses registered.
  
**- Products CRUD**
- Any users can `create`, `read`, `update` or `delete` a product. But some `admin` need to approve it.
- Products that appear at least in 1 order can't be deleted, `not even by admin`.
- You can set: categories, components, flavors, amounts, min or max quantities, mid time of preparing, and a plenty of attributes.
- Products could be in multiple groups and categories. Take your time to build a efficient and beautiful menu.

**- Deliverymen CRUD**
- Any users can `create`, `read`, and `update` informations of a deliveryman. But only `admins` can `delete`.
- Deliverymen that already was registered at least in 1 order can't be deleted, `not even by admin`.
- Deliveryman must be linked to a customer. Others informations are added in it.

**- Settings**
- There´s a lot of configurations that can be used to set for example, the `printers`, `monitors`, `UI settings`, `office hour` and some other things.
- Only admins can change global settings.
  
**- Order handling**
- In orders management, you could set `customer`, `items`, `delivery address`, `deliveryman`, `payment methods`, `print`, `cancel`, `finish`, talk directly in web chat apps, and many other great features.
- It was thought take orders in a very fast way. Using keyboard shortcuts, most used features easily to be reached, intelligent suggestions and a clean interface to turn the things the most simple as can be. 