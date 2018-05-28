import mongoose from 'mongoose'
import server from './server'

async function connectDb(driver) {
  await driver.connect(process.env.MONGODB_URI)
}

Promise.resolve(connectDb(mongoose))
  .then(_ => console.log(`\n=== Connected to database ===\n`))
  .catch(e => console.log(`\n===\n${e.message}\n===\n`))

server.listen(process.env.PORT || 5000, () =>
  console.log(`\n=== Listening on port ${process.env.PORT || 5000} ===\n`)
)
