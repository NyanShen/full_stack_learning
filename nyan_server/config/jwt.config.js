
module.exports = {
    algorithms: ['HS256'],
    jwtSecretKey: "NyanShenForDevelopment",
    unlessPath: [/^\/api\/auth\//, /^\/api\/uni\//]
}