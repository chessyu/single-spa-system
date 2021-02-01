const dept = [
    {
        dept_id:1,
        dept_name :'总部',
        dept_code : 'base',
        parent_id :0,
        leader_id : 1,
        status:1,
        create_time :'2021-01-30',
        create_user : '系统管理员'
    },
    {
        dept_id:2,
        dept_name :'商务部',
        dept_code : 'server',
        parent_id :0,
        leader_id : 1,
        status:1,
        create_time :'2021-01-30',
        create_user : '系统管理员'
    },
    {
        dept_id:3,
        dept_name :'人事部',
        dept_code : 'ministry_of_personnel',
        parent_id :0,
        leader_id : 1,
        status:1,
        create_time :'2021-01-30',
        create_user : '系统管理员'
    }
]

module.exports = {
    DEPT : dept
}