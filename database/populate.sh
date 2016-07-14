#!/bin/bash

for i in *.sql; do
  PGPASSWORD=hunter.2 psql -U hf -d hfportal -h $1 < $i
done
