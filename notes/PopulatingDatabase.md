# Populating Database
## Create Test Data: [Mockaroo](https://www.mockaroo.com/projects/1254)

## Load Data
### 0.
In Vagrant, move into database directory
```
cd database
```

### 1.
Run script to drop tables using Postgres
```
./resetDb.sh sql localhost
```

### 2.
Run server to create tables using Sequelize
```
gulp server
```

### 3.
Run script to insert data using Postgres
```
./populateDb.sh sql localhost
```

## Test Dataset
Users
- 1 admin
- 19 fellows
- 30 companies

## Maintainer Notes
Log into Postgres command prompt
```
psql -U hf -h localhost -p 5432 -d hfportal
```

Run SQL script
```
\i script.sql
```

List tables in current database
```
\dt
```
