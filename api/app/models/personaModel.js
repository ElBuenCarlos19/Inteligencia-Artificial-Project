const connection = require('../config/db');

class PersonaModel {
    constructor(id, nombre, apellido, cedula, edad, celular) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.cedula = cedula;
        this.edad = edad;
        this.celular = celular;
    }
    async insertar() {
        const query = `INSERT INTO persona (nombre, apellido, cedula, edad, celular) VALUES (?, ?, ?, ?, ?)`;
        const values = [this.nombre, this.apellido, this.cedula, this.edad, this.celular];
        return await connection.query(query, values);

    }
    async consultar() {
        const query = `SELECT * FROM persona WHERE id = ?`;
        const values = [this.id];
    
        return new Promise((resolve, reject) => {
            connection.query(query, values, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
    }
    
        
    
    
    async actualizar() {
        const query = `UPDATE persona SET nombre = ?, apellido = ?, cedula = ?, edad = ?, celular = ? WHERE id = ?`;
        const values = [this.nombre, this.apellido, this.cedula, this.edad, this.celular, this.id];
        return await connection.query(query, values);
    } 
    async eliminar() {
        const query = `DELETE FROM persona WHERE id = ?`;
        const values = [this.id];
        return await connection.query(query, values);
    }
}

module.exports = PersonaModel;