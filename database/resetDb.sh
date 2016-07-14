#!/bin/bash

echo "Usage: resetDb.sh directory host"
echo "Starting to reset database..."

# check if argument supplied
quit() {
    installStatus=$1
    echo $installStatus
    exit
}

if [ -z "$1" ]; then
    echo "Please supply directory where SQL scripts are located or reset."
    quit "ERROR: Database reset failed!"
fi
directory=$1

if [ -z "$2" ]; then
    echo "Please supply host to connect to Postgres database."
    quit "ERROR: Database reset failed!"
fi
host=$2

# specify order in which data should be inserted since some relies on other relations so sequence is important
scripts=("drop.sql")
for i in "${scripts[@]}"
do
    sqlFile="${directory}/${i}"
    password="hunter.2"
    PGPASSWORD=$password psql -U hf -d hfportal -h $host < $sqlFile
done

quit "SUCCESS: Database reset completed!"
