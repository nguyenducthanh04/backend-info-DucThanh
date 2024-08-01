const nodemailer = require("nodemailer");
class SendMail {
    async SendMailToThanh(req, res) {
        const { email, content, name } = req.body;

        try {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: "dducthanh04@gmail.com",
                    pass: "midn lcia tcly pcbn",
                },
            });

            transporter.sendMail({
                from: `Người nhận tin nhắn:<${email}>`,
                to: "dducthanh04@gmail.com",
                subject: "Contact",
                html: `<div">
            <h3 style:"text-align: center">Tin nhắn từ ${name} có email là ${email} gửi đến bạn: <em>${content}</em></h3>
            </div>`,
            });

            res.send("Email sent successfully");
        } catch (error) {
            console.error("Error sending email:", error);
            res.status(500).send("An error occurred while sending the email");
        }
    }
}
module.exports = new SendMail();
