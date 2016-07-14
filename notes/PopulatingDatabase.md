# Populating Database

## How To Populate
```
bash populateDb.sh
```

## Test Dataset

Users
- 1 admin
- 22 fellows
- 27 companies

## Notes
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
