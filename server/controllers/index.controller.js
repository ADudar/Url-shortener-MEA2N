module.exports = {
        startPage: function (req, res, next) {
                res.send('API for URL Link Shortener')
        },
        apiTest: (req, res) => {
                res.send(
                        'Welcome to API!'
                );
        },

        notFoungPage: (req, res, next) => {
                res.status(404).send("Page not found");
        }
};