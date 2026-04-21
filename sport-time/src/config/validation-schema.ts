import * as Joi from 'joi'

const isProd = process.env.NODE_ENV === 'production'


export const envValidationSchema = Joi.object({
    // ? Variables de APP
    APP_PORT: Joi.number().default(3000),
    NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
     
    // ? Variables de MONGODB
    MONGO_URL: Joi.string().required(),
})