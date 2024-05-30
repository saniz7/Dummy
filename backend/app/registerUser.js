'use strict';

const helper = require('./helper.js');

async function main() {
    const username = 'patient1'; // Change this to the username you want to register
    const userOrg = 'patient'; // Change this if you want to register for a different organization

    try {
        console.log(`Registering user ${username} for organization ${userOrg}`);
        
        const response = await helper.getRegisteredUser(username, userOrg);
        
        if (response.success) {
            console.log(`${username} enrolled successfully`);
        } else {
            console.error(`Failed to enroll user ${username}`);
        }
    } catch (error) {
        console.error(`Error registering user ${username}: ${error.message}`);
    }
}

main();
