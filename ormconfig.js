const ENV="local2prod";
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
if(ENV==="local2prodheroku"){
    module.exports = {
        "type": "postgres",
        "url": "postgres://rtpctryunzwxnn:084200bd616dd857618c8226e498f95b4c62482f3ac9452bb355ac81a3a6180c@ec2-34-193-235-32.compute-1.amazonaws.com:5432/ddevd9gr7m1kud",
        "ssl": {rejectUnauthorized: false },
        "schema":"prod",
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
if(ENV==="prodheroku"){
    module.exports = {
        "type": "postgres",
        "url": "postgres://rtpctryunzwxnn:084200bd616dd857618c8226e498f95b4c62482f3ac9452bb355ac81a3a6180c@ec2-34-193-235-32.compute-1.amazonaws.com:5432/ddevd9gr7m1kud",
        "ssl": {rejectUnauthorized: false },
        "schema":"prod",
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
if(ENV==="localprodBkg"){
    module.exports = {
        "type": "postgres",
        "host": "pml3.regea.com.br",
        "port": 5432,
        "username": "postgres",
        "password": "Geologia@1",
        "database": "pml3",
        "schema": "backup",
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