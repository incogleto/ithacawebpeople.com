import SES from 'aws-sdk/clients/ses'

const { AWS_SES_KEY, AWS_SES_SECRET, AWS_SES_SENDER } = process.env

let ses = false
if ( AWS_SES_KEY && AWS_SES_SECRET )
    ses = new SES({
        region: 'us-east-1',
        accessKeyId: AWS_SES_KEY,
        secretAccessKey: AWS_SES_SECRET
    })

export default (ops) => {
    return new Promise((resolve, reject) => {
        if ( !ses ) return resolve()
        if ( !ops.to ) return reject()

        const settings = {
            Destination: {
                ToAddresses: [ops.to]
            },
            Message: {
                Body: {
                    Html: {
                        Data: ops.html || ''
                    },
                    Text: {
                        Data: ops.body || ''
                    }
                },
                Subject: {
                    Data: ops.subject || 'IWP Verification'
                }
            },
            Source: `Ithaca Web People <${ AWS_SES_SENDER }>`
        }

        return ses.sendEmail(settings, function(err, data) {
            if (err) return reject(err)
            return resolve(data)
        })
    })
}
