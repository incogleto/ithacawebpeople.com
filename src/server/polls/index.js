/* eslint no-console: 0 */
import schedule from 'node-schedule'
import fs from 'fs-extra'
import path from 'path'

// set poll directory
const appPollDir = path.resolve(__dirname)

// read any valid polls out of this directory
const getPolls = async () => {

    // get any polls from within app/polls directory
    const dirPolls = fs.readdirSync(appPollDir)
        .map(poll => {
            return {
                name: poll,
                path: path.join(appPollDir, poll, 'index.js')
            }
        })

    // filter out polls that don't exist
    return dirPolls.filter(p => fs.pathExistsSync(p.path))
}

// utility to create a single poll
export const createPoll = ({ interval, processor, cron = null }) => {

    // run on cron,
    // start schedule
    if ( cron ) {
        const job = schedule.scheduleJob(cron, () => {
            return processor().catch(err => {
                // return error('Error during a cron poll', err)
                console.log('Error during a cron poll', err)
            })
        })
        return job
    }

    // run on interval,
    // start self-executing loop
    return (async function run() {

        try {

            await processor()

            return setTimeout(run, interval)

        } catch(err) {

            // error('Error during a timeout poll', err)
            console.log('Error during a timeout poll', err)
            return setTimeout(run, interval)

        }

    }())

}


// controller function to start all polls
export default async () => {

    const polls = await getPolls()
    return polls.map(poll => {

        console.log(`STARTING POLL: ${ poll.name }`)

        const settings = require(poll.path).default
        return createPoll(settings)

    })
}
