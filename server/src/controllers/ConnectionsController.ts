import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinuets';

import {Request, Response} from 'express';


export default class ConnectionsController {

    async index(request: Request, response: Response)
    {
        const filters = request.query;

        const totalConnections = await db('connections').count('* as total')

        const {total} = totalConnections[0];
        return response.json({total});

    }
    async create(request: Request, response: Response)
    {
        const {
            user_id
        } = request.body;
    
        const trx = await db.transaction();
        try {
                             
            await trx('connections').insert({user_id});   
        
            await trx.commit();
        
            return response.status(201).send();
        } catch (error) {
            await trx.rollback();
    
            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            })
        }
    }
}