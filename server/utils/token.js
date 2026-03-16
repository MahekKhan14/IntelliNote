import jwt from 'jsonwebtoken'

export const getToken = async(userId) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
        console.log("Generated JWT token:", token); // Debugging log
        return token;
    } catch (error) {
        console.error("Error generating token:", error);
    }
} 