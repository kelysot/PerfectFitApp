const login = async (req, res) => {
    res.status(400).send({
        'status': 'fail',
        'error': err.message
    })
}

const register = async (req, res) => {
    res.status(400).send({
        'status': 'fail',
        'error': err.message
    })
}

const logout = async (req, res) => {
    res.status(400).send({
        'status': 'fail',
        'error': err.message
    })
}

module.exports ={
    login,
    register,
    logout
}