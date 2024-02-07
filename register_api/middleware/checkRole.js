
let roleErrorDisplayed = false;

exports.checkRole = (requiredRoles) => {
    return (req, res, next) => {
        console.log("req.user", req.user);
        console.log("req.user.role", req.user.role);
        console.log("requiredRoles", requiredRoles);

        if (req.user && requiredRoles.includes(req.user.role)) {
            next(); 
        } else {
            if (!roleErrorDisplayed) {
                res.status(403).json({
                    status: 'error',
                    message: 'Unauthorized. This User not have permissions.',
                });
                roleErrorDisplayed = true; // Set the flag to true after displaying the error
            }
        }
    };
};
