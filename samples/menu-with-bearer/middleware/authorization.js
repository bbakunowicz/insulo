require('dotenv').config();

module.exports = (roles) => (req, res, next) => {
    if (Array.isArray(req.roles)) {
      for (let i=0; i<req.roles.length; i++){
        if (roles.find((role)=>{return role === req.roles[i]})) {
          next();
          return;
        }
      }
    }
    console.info('required_roles:', roles);
    console.info('provided_roles:', req.roles);

    return res.status(403).json({
        errors: [
            { msg: 'Not authorized' }, 
            { msg: `Required roles: ${roles}`},
            { msg: `Provided roles: ${req.roles}`}],
        errcode: 'autherr_not_authorized'
    });
};
