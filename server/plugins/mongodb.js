import mongoose from "mongoose"

export default async (nitroApp) => {
    const config = useRuntimeConfig()
    mongoose
        .connect(config.MONGODB)
        .then(() => {
            console.log('DB Connected')
        })
        .catch(err => {
            console.log('DB not Connected')
            console.log(err)
            console.log(config.MONGODB)
        })
}