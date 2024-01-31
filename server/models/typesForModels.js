exports.defaultStringType = {
    minLength: 7,
    maxLength: 50,
    type: String,
    required: true,
}
exports.timeStampType = {
    type: Date,
    default: new Date(),
}