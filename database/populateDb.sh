#!/bin/bash

echo "Usage: populateDb.sh directory [host]"
echo "Starting to populate database..."

# check if argument(s) supplied
function quit() {
  installStatus=$1
  echo $installStatus
  exit
}

if [ -z "$1" ]; then
  echo "Please supply directory where SQL scripts are located."
  quit "ERROR: Database population failed!"
fi

directory=$1
host=$2

# specify order in which data should be inserted since some relies on other relations so sequence is important
scripts=("reset.sql" "users.sql" "fellows.sql" "companies.sql" "tags.sql" "fellow_tags.sql" "company_tags.sql" "votes_fellows.sql" "votes_companies.sq")
for i in "${scripts[@]}"
do
  sqlFile="${directory}/${i}"
  #PGPASSWORD=hunter.2 psql -U hf -d hfportal -h $host < $i
done

quit "SUCCESS: Database population completed!"
