# Populating Database

## How To Populate
```
cd database
sh populateDb.sh sql
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
