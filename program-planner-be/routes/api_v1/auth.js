import express from 'express';
import { getUsers } from '../../models/usersModels.js';
import { comparePassword } from '../../utils/authHelpers.js';
import { config } from '../../config/config.js';
import { getBlockAssignments, isMyBlock } from '../../models/blockAssignmentsModels.js';

var router = express.Router();

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    getUsers(username)
        .then((result) => {         
            if (result.rows && result.rows.length === 1) {                
                const userId = result.rows[0].user_id;
                const hashedPassword = result.rows[0].password;
                comparePassword(password, hashedPassword)
                    .then((isValid) => {
                        if (isValid) {
                            req.session.userId = userId;  // creates session
                            return res.status(200).json({ userId }).end();  // successful login
                        }
                        // invalid password
                        else {
                            console.log("Invalid password");
                            return res.status(401).end();
                        }
                    })
                    .catch((e) => { 
                        console.log(e); 
                        // internal server error
                        res.status(500).end(); 
                    })
            }
            // user does not exist
            else {
                console.log("User does not exist");
                return res.status(401).end();
            }
        })
        .catch((e) => {
            console.log("getUsers failed");
            console.log(e);
            return res.status(500).end();
        })
});

router.delete("/logout", (req, res) => {    
    if (req.session && req.session.userId) {        
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
                return res.status(500).end();  // internal server error
            } else {
                // clear the cookie in the browser
                res.clearCookie(config.session.cookieName);
                return res.status(200).end();  // successful logout
            }
        });
    } else {
        return res.status(400).end();  // bad request - session doesn't exist
    }
});

router.get("/isMyBlock", (req, res) => {
    const { block_id } = req.query;
    if (!block_id) {
        return res.status(400).end();  // bad request
    }
    if (req.session && req.session.userId) {
        const user_id = req.session.userId;
        console.log("Checking block ownership for user " + user_id + " and block " + block_id);
        isMyBlock(block_id, user_id)
            .then((result) => {
                console.log("isMyBlock result from auth.js: " + JSON.stringify(result.isMyBlock));
                return res.status(200).json({ isMyBlock: result.isMyBlock }).end();
                // if (result.isMyBlock) {
                //     return res.status(200).json({ isMyBlock: true }).end();
                // } else {
                //     return res.status(200).json({ isMyBlock: false }).end();
                // }
            })
            .catch((e) => {
                console.log("isMyBlock failed");
                console.log(e);
                return res.status(500).end();
            });
    } else {
        return res.status(401).end();  // unauthorized
    }
});

export default router; // ESM: export
