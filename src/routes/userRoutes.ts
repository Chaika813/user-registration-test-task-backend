import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

export const prisma = new PrismaClient();
const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

router.post('/register', async (req, res) => {
    try {
        const { firstname, lastname, email, mobile_phone, password } = req.body;

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert user into database using Prisma Client
        const newUser = await prisma.user.create({
            data: {
                firstname,
                lastname,
                email,
                mobilePhone: mobile_phone,
                password: hashedPassword,
            },
        });

        res.json({email: newUser.email, name: `${newUser.firstname} ${newUser.lastname}`});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Prepare user data for the token payload
        const payload = {
            user: {
                id: user.id, // Use user's unique ID from the database
                email: user.email,
                name: `${user.firstname} ${user.lastname}`
            }
        };

        // Sign the JWT
        jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if(err) throw err;
            res.json({ token }); // Send the token to the client
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

export default router;
