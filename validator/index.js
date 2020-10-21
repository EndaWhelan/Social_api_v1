exports.createPostValidator = (req, res, next) => {
    
    // title
    req.check('title','Write a Title').notEmpty()
    req.check('title','Title must be between 4 to 150 chars').isLength({
        min: 4,
        max: 150
    });

    // body
    req.check('body','Write a Body').notEmpty()
    req.check('body','Body must be between 4 to 2000 chars').isLength({
        min: 4,
        max: 2000
    });

    const errors = req.validationErrors();

    if(errors){
        const firsterror = errors.map((err)=>err.msg)[0]
        return res.status(400).json({error: firsterror})
    }
    next();
}

exports.userSignupValidator = (req, res, next) => {
    //name is not null and 4 to 18 char
    req.check("name", "Name is Required!").notEmpty();
    // email is not null, valid and normailised

    req.check("email","Email must be between 3 to 32 chars")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
        min: 4,
        max: 2000
    })

    // check password
    req.check("password", "Password is Required!").notEmpty();
    req.check("password")
    .isLength({min: 6})
    .withMessage("Password must contain at least 6 chars")
    .matches(/\d/)
    .withMessage("Password must contain a number");
    // check for errors
    const errors = req.validationErrors();

    if(errors){
        const firsterror = errors.map((err)=>err.msg)[0]
        return res.status(400).json({error: firsterror})
    }
    next();
}