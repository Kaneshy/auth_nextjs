import { NextResponse } from 'next/server'
import db from '@/libs/prisma'
import bcrypt from 'bcrypt'

export async function POST(request) {
    try {
        const data = await request.json()

        const userFoundByEmail = await db.user.findUnique({
            where: {
                email: data.email
            }
        });

        const userFoundByUsername = await db.user.findUnique({
            where: {
                username: data.username
            }
        });

        console.log('userFoundByEmail', userFoundByEmail);

        if (userFoundByEmail) {
            return NextResponse.json({
                message: 'email already exists'
            });
        } else if (userFoundByUsername){
            return NextResponse.json('Username already exists');
        } else {
            // Logic to proceed when the email doesn't exist
            // For instance, you might continue with user creation/update here

            const hashedPassword  = await bcrypt.hash(data.password, 10)
            console.log(hashedPassword)

            const newUser = await db.user.create({
                data: {
                    username: data.username, 
                    email: data.email,
                    password: hashedPassword
                }
            })


            const {password: _, ...user} = newUser

            // Return success message or status
            return NextResponse.json(user);
        }


        
    } catch (error) {
        // Handle any errors that occurred during the database query or processing
        console.error('Error:', error);
        return NextResponse.json({
            message: 'Internal server error',
            error: error.message
        }, {
            status: 500
        });
    }
}


