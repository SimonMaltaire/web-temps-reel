// REST
import express from 'express';
import Reservation from '../models/Reservation.js';
import User from '../models/User.js';

const router = express.Router();

// GET User reservations
router.get('/', async (req, res) => {
    const user = await User.findByPk(req.user.id);
    if (user) {
        const userReservations = await user.getReservations();
        res.send(userReservations).status(200);
    } else {
        res.sendStatus(400);
    }
});

// POST User reservation
router.post('/', async (req, res) => {
    const user = await User.findByPk(req.user.id);
    if (user) {
        const reservation = await Reservation.create({
            type: req.body.type,
            date: new Date(req.body.date)
        });
        await user.addReservation(reservation);
        res.send(reservation).status(200)
    } else {
        res.sendStatus(400);
    }
});


export default router;