const roleModel = require('../../DB/Model/role')


const authorization = async (req, res, next) => {
    try {
        const roleId = req.saveToken.role;
        const result = await roleModel.findById(roleId);
        if(result.role == "admin") {
            next();
        } else {
            return res.status(403).json({massege: "forbidden"})
        }
    } catch (error) {
        res.status(403).json(error)
    }
}



module.exports = authorization;