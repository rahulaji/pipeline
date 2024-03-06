const User = require('../models/data');

const users = (req, res, next) => {
    User.find()
        .then(users => {
            res.json(users);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
}

const one_user = (req, res, next) => {
    let userID = req.params.userID; // Use req.params for fetching user ID
    User.findById(userID)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
}

const store = (req, res, next) => {
    let user = new User({
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    });

    user.save()
        .then(savedUser => {
            res.status(201).json({ message: 'User added successfully!', user: savedUser });
        })
        .catch(error => {
            res.status(400).json({ error: error.message });
        });
}

const update = (req, res, next) => {
    let userID = req.params.userID; // Use req.params for user ID
    let updatedData = {
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    };

    User.findByIdAndUpdate(userID, updatedData, { new: true })
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'User updated successfully!', user: updatedUser });
        })
        .catch(error => {
            res.status(400).json({ error: error.message });
        });
}

const destroy = (req, res, next) => {
    let userID = req.params.userID; // Use req.params for user ID
    User.findByIdAndRemove(userID)
        .then(deletedUser => {
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'User deleted successfully!' });
        })
        .catch(error => {
            res.status(400).json({ error: error.message });
        });
}

const getUserData = (req, res, next) => {
    User.aggregate([
        { $match : { designation : 'Civil Engineer' } },
        { $sort : {name:-1}  },
        { $project : { _id : 0, name : 1  } }
    ])
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}


module.exports = {
    users,
    one_user,
    store,
    update,
    destroy,
    getUserData
}
