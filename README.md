# LDAP Operations

Ldap Operations is a nodejs code to make LDAP operations (search, modify and create)

## Install

Install node dependencies (only dependency is the module ldapjs ) 
```
npm install
```
## Usage

At the current state, there is only support for hard-coded values for the operations

Edit variable user for create operations:
```javascript
const user = {
    objectclass: ['imUser', 'imUserAux', 'top'],
    cn: 'ftest',
    sn: 'ftest12457',
    uid: 'ftest12457',
    userPassword: '123456'
}
```

Use the variable opts to define search operations
```javascript
var opts = {
    filter: '(uid=*)',
    scope: 'sub',
    attributes: ['uid']
};
```
Use the variable modifyAttr to define modify/add attributes
```javascript
const modifyAttr = new ldap.Change({
    operation: 'add',
    modification: {
        cn: 'joe.doe'
    }
});
```

You have to define the correct DN at the functions
```javascript
client.modify('ou=users,ou=im,ou=br,o=com', add_attribute, (err, res) => {
        if (err) throw err
        console.log('Status: ' + res);
    })
```

Run the code with the following arguments
```
node ldapoperations.js <HOSTNAME/IP> <PORT> <DN FOR LOGIN> <PASSWORD> <OPERATION SEARCH/CREATE/MODIFY>
```

## Contributing
Pull requests are welcome.