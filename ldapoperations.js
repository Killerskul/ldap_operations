var ldap = require('ldapjs');


//Creation Attributes
const user = {
    objectclass: ['imUser', 'imUserAux', 'top'],
    cn: 'ftest',
    sn: 'ftest12457',
    uid: 'ftest12457',
    userPassword: '123456'
}

//Search Operation
var opts = {
    filter: '(uid=*)',
    scope: 'sub',
    attributes: ['uid']
};

//Add attribute
const modifyAttr = new ldap.Change({
    operation: 'add',
    modification: {
        cn: 'joe.doe'
    }
});


modify = (add_attribute) => {
    client.modify('ou=users,ou=im,ou=br,o=com', add_attribute, (err, res) => {
        if (err) throw err
        console.log('Status: ' + res);
    })
}

search = (opts) => {
    client.search('ou=im,ou=br,o=com', opts, (err, res) => {

        res.on('searchEntry', function (entry) {
            const json = JSON.parse(JSON.stringify(entry.object));
            console.log('Entry: ' + JSON.stringify(entry.json));
        });

        res.on('searchReference', function (referral) {
            console.log('referral: ' + referral.uris.join());
        });

        res.on('error', function (err) {
            console.error('error: ' + err.message);
        });

        res.on('connectTimeout', function (err) {
            console.error('connectTimeout: ' + err.message);
        });

        res.on('end', function (result) {
            console.log('status: ' + result);
        });

    });
}

create = (user) => {
    client.add('uid=' + user.uid + 'ou=users,ou=im,ou=br,o=com', user, (err, res) => {
        if (err) throw err
        console.log(res);
    })
}


//Bind to LDAP and operation
bind = (login, password,operation) => {
    client.bind(login, password, (err) => {
        if (err) throw err
        switch (operation) {
            case "search":
                search(opts)
                break;
            
            case "modify":
                modify(add_attribute)
                break;
            case "create":
                create(add_attribute)
                break;
            default:
                throw "Provide modify or search operations"
        }
    });
}

const args = process.argv.slice(2);
const host = args[0];
const port = args[1];
const login = args[2];
const password = args[3];
const operation = args[4];

console.log(login);

const client = ldap.createClient({
    //TODO Support LDAPS
    //Connection URL
    url: 'ldap://'+host+':'+ port
});

bind(login,password,operation);
