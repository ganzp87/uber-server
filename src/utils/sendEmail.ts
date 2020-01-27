import Mailgun from "mailgun-js"

const mailGunClient = new Mailgun({
	apiKey: process.env.MAILGUN_API_KEY || "",
	domain: process.env.MAILGUN_DOMAIN || ""
})
const sendEmail = (subject: string, html: string) => {
	const emailData: Mailgun.messages.SendData = {
		from: "ganzp@naver.com",
		to: "ganzp@naver.com",
		subject,
		html
	}
	return mailGunClient.messages().send(emailData)
}

export const sendVerificationEmail = (fullName: string, key: string) => {
	const emailSubject = `Hello! ${fullName}, please verify your email`
	const emailBody = `Verify your email by clicking <a href="http://naver.com/verification/${key}/">here</a>`
	return sendEmail(emailSubject, emailBody)
}
