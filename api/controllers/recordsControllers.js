import createError from 'http-errors'
import Record from '../models/Record.js'


// GET all records
export const getRecords = async (req, res, next) => {
  try {
    const records = await Record.find()
    res.json( records )
  } catch (err) {
    next(err)
  }
}

// GET record
export const getRecord = async (req, res, next) => {
  try {
    const { id } = req.params
    const record = await Record.findById( id )
    if(!record) res.json({
      error: `No record with id: ${id} can be found.`
    })
    res.json( record )
  } catch (err) {
    next( err )
  }
}

// CREATE record
export const createRecord = async (req, res, next) => {
  try {
    const record = await Record.create( req.body )
    res.json( record )
  } catch (err) {
    next( err )
  }
}

// UPDATE record
export const updateRecord = async (req, res, next) => {
  try {
    const { id } = req.params
    const updatedRecord = await Record.findByIdAndUpdate(
      id, req.body, { new: true }
    )
    if(!updatedRecord) throw new createError(
      404,
      `No record with id: ${id} can be found.`
    )
    res.json({ success: `Record with id: ${id} was updated`})
  } catch (err) {
    next( err )
  }
}

// DELETE record
export const deleteRecord = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedRecord = await Record.findByIdAndDelete( id )
    if(!deletedRecord) throw new createError(
      404,
      `No record with id: ${id} can be found.`
    )
    res.json({ succes: `Record with id: ${id} was deleted`})
  } catch (err) {
    next( err )
  }
}