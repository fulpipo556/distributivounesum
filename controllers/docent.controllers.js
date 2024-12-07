import pool from '../database/conexion.js';

// Consulta Personalizada
const getDoces = async (req, res, next) => {
    try {
     const { id } = req.params;
     const result = await pool.query("SELECT * FROM distributivo_docente WHERE ced = $1", [id]);
     if (result.rows.length === 0) {
        return res.status(200).json([]); 
     }
     res.json(result.rows);
    } catch (error) {
     next(error);
    }
 };

const getAllDoces = async (req, res, next) => {
    try {
        const consuAlldis = await pool.query("SELECT * FROM distributivo_docente ORDER BY nomape");
        res.json(consuAlldis.rows);
    } catch (error) {
        next(error);
    }
};

// Consulta antes de Guardar
const checkIfActiviExists = async (ced, nomape, checkByCodfunOnly = false) => {
    let query;
    let params;
    if (checkByCodfunOnly) {
        query = "SELECT COUNT(*) FROM distributivo_docente WHERE nomape = $1";
        params = [nomape];
    } else {
        query = "SELECT COUNT(*) FROM distributivo_docente WHERE ced = $1 AND nomape = $2";
        params = [ced, nomape];
    }
    const result = await pool.query(query, params);
    return result.rows[0].count > 0;
};

// Almacena la información
const createDoces = async (req, res, next) => {
    try {
        const { ced, nomape, fechana, tele, dire, correo, estadoc } = req.body;

        const existsByCodfun = await checkIfActiviExists(ced, nomape, true);
        const existsByCodfunAndActividad = await checkIfActiviExists(ced, nomape);

        if (existsByCodfun || existsByCodfunAndActividad) {
            return res.status(400).json({ message: "Ya existe este nombre en la base de datos" });
        }

        const result = await pool.query(
            "INSERT INTO distributivo_docente (ced, nomape, fechana, tele, dire, correo, estadoc) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [ced, nomape, fechana, tele, dire, correo, estadoc]
        );

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const deleteDoces = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const result = await pool.query("DELETE FROM distributivo_docente WHERE ced = $1", [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Cédula no encontrada" });
        }
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};

const updateDoces = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nomape, fechana, tele, dire, correo, estadoc } = req.body;
        const result = await pool.query(
            "UPDATE distributivo_docente SET nomape=$1, fechana=$2, tele=$3, dire=$4, correo=$5, estadoc=$6  WHERE ced = $7 RETURNING *",
            [nomape, fechana, tele, dire, correo, estadoc, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Cédula no encontrada" });
        }
        return res.json(result.rows);
    } catch (error) {
        next(error);
    }
};

export const docentcontrollers = {
    getDoces,
    getAllDoces,
    createDoces,
    deleteDoces,
    updateDoces
};