# Populating Database
## Create Test Data: [Mockaroo](https://www.mockaroo.com/projects/1254)

## Load Data
in vagrant
```
cd database
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
