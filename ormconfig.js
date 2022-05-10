const ENV="local";
if(ENV==="local"){
    module.exports = {
        "type": "postgres",
        "host":"localhost",
        "port": 5432,
        "username": "postgres",
        "password": "Geologia@1",
        "database": "pml3",
        "schema": "public",
        "entities": [
            "./dist/typeorm/entities/*.js"
        ],
        "migrations": [
            "./dist/database/migrations/*.js"
        ],
        "cli": {
            "migrationsDir":"./dist/database/migrations"
        }
    }
}
if(ENV==="local2prod"){
    module.exports = {
        "type": "postgres",
        "host": "pml3.regea.com.br",
        "port": 5432,
        "username": "postgres",
        "password": "Geologia@1",
        "database": "pml3",
        "schema": "public",
        "entities": [
            "./src/typeorm/entities/*.ts"
        ],
        "migrations": [
            "./src/database/migrations/*.ts"
        ],
        "cli": {
            "migrationsDir":"./src/database/migrations"
        }
    }
}
