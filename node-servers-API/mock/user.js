const Mock = require('mockjs');

const user = [
    {
        user_id : 1,
        user_code : 'admin',
        user_name : '系统管理员',
        password : '123456',
        status: true,
        create_time :'2021-01-30',
        create_user : '系统管理员'
    },
    {
        user_id : 2,
        user_code : 'test',
        user_name : '游客',
        password : '123456',
        status: true,
        create_time :'2021-01-30',
        create_user : '系统管理员'
    },
]
function userData(){
    let data = [].concat(user);
    for(let i =0; i< 8; i++){
        let obj = {};
        obj.user_id = i + 3;
        obj.user_code = Mock.mock('@first');
        obj.user_name = Mock.mock('@cname');
        obj.password = 123456;
        obj.status = true;
        obj.create_time = '2021-04-15';
        obj.create_user = "系统管理员"
        data.push(obj);
    }
    return data;
}

module.exports = {
    USER : userData()
}