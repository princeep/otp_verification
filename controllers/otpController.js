const User = require('../models/user');

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

exports.sendOTP = async (req, res) => {
    const { name, phone_number } = req.body;
    const otp = generateOTP();
    const expiry = new Date(Date.now() + 5 * 60 * 1000); 

    try {
       
        const user = await User.findOneAndUpdate(
            { phone_number },
            { name, phone_number, otp, otp_expiry: expiry },
            { new: true, upsert: true }
        );

        
        console.log(`Sending OTP ${otp} to phone ${phone_number}`);

        res.status(200).json({ message: 'OTP sent successfully!', otp });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error sending OTP.' });
    }
};

exports.verifyOTP = async (req, res) => {
    const { phone_number, otp } = req.body;

    try {
        const user = await User.findOne({ phone_number });

        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        if (otp !== user.otp) {
            return res.status(400).json({ message: 'Invalid OTP!' });
        }

        if (new Date() > user.otp_expiry) {
            return res.status(400).json({ message: 'OTP expired!' });
        }

        res.status(200).json({ message: 'OTP verified successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error verifying OTP.' });
    }
};
