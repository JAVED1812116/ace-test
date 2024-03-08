class User_DTO{
    constructor(user){
        this._id = user._id;
        this.username = user.username;
    }
}

module.exports = User_DTO;