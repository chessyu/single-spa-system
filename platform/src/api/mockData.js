import Mock from 'mockjs'

var Random = Mock.Random;

//登录接口
Mock.mock("http://mock.cn/captchaImage",(option) => {
   return {
	"msg": "操作成功",
	"img": "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",
	"code": 200,
	"uuid": "6b540705fc70483c9023181833717449"
}
   
})

//应用程序A的菜单接口
Mock.mock('http://mock.cn/getProjectAMenu',option => {
    let data = [];
    let id = JSON.parse(option.body)
    switch(id.menuId){
        case '1000':  //平台配置的菜单列表
            data = [
                {
                  text: "首页",
                  name:'index',
                  icon: "logo-bitcoin",
                  path: "/platForm/index",
                  children: []
                },
                {
                  text: "系统管理",
                  name:'system',
                  icon: "md-basket",
                  children: [
                    {
                        text: "用户管理",
                        name:'user',
                        // icon: "ios-bowtie-outline",
                        path: "/platForm/system/user",
                        children: []
                    },
                    {
                        text: "角色管理",
                        name:'role',
                        // icon: "ios-bulb",
                        path: "/platForm/system/role",
                        children: []
                    },
                    {
                        text: "菜单管理",
                        name:'menu',
                        // icon: "md-cafe",
                        path: "/platForm/system/menu",
                        children: []
                    },
                    {
                      text: "数据字典",
                      name:'dict',
                      // icon: "md-cafe",
                      path: "/platForm/system/dict",
                      children: []
                  },
                  ]
                }
              ]
            break;
        case '1001':  //应用A的菜单列表
              data = [
                {
                text: "首页",
                name:'dome1',
                icon: "logo-bitcoin",
                path: "/skd/dome1",
                children: []
                },
                {
                    text:"其它菜单",
                    icon: "md-cafe",
                    name:'otherMenuA',
                    children: [
                        {
                            text: "测试菜单A",
                            name:'testt',
                            icon: "ios-bowtie-outline",
                            path: "/skd/dome1/testt",
                            children: []
                        },
                        {
                            text: "测试菜单B",
                            name:'testh',
                            icon: "ios-bowtie-outline",
                            path: "/skd/dome1/testh",
                            children: []
                        }
                    ]
                }
              ]
            break;
        case '1002':  //应用B的菜单列表
            data = [
              {
              text: "首页",
              name:'dome2',
              icon: "logo-bitcoin",
              path: "/wind/dome2",
              children: []
              },
              {
                  text:"其它菜单",
                  icon: "md-cafe",
                  name:'otherMenuB',
                  children: [
                      {
                          text: "测试菜单B",
                          name:'testa',
                          icon: "ios-bowtie-outline",
                          path: "/dome2/testA",
                          children: []
                      }
                  ]
              }
            ]
            break;
    }
    return data
    

})

//获取个人数据   /getInfo

Mock.mock("http://mock.cn/getInfo",option => {
    return {
        "msg": "操作成功",
        "code": 200,
        "permissions": [
            "*:*:*"
        ],
        "roles": [
            "admin"
        ],
        "user": {
            "searchValue": null,
            "createBy": "admin",
            "createTime": "2018-03-16 11:33:00",
            "updateBy": null,
            "updateTime": null,
            "remark": "管理员",
            "dataScope": null,
            "params": {},
            "userId": 1,
            "deptId": 103,
            "userName": "admin",
            "nickName": "若依",
            "email": "ry@163.com",
            "phonenumber": "15888888888",
            "sex": "1",
            "avatar": "",
            "password": "$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2",
            "salt": null,
            "status": "0",
            "delFlag": "0",
            "loginIp": "127.0.0.1",
            "loginDate": "2018-03-16T11:33:00.000+0800",
            "dept": {
                "searchValue": null,
                "createBy": null,
                "createTime": null,
                "updateBy": null,
                "updateTime": null,
                "remark": null,
                "dataScope": null,
                "params": {},
                "deptId": 103,
                "parentId": 101,
                "ancestors": null,
                "deptName": "星海",
                "orderNum": "1",
                "leader": "赵创庭",
                "phone": null,
                "email": null,
                "status": "0",
                "delFlag": null,
                "parentName": null,
                "children": []
            },
            "roles": [
                {
                    "searchValue": null,
                    "createBy": null,
                    "createTime": null,
                    "updateBy": null,
                    "updateTime": null,
                    "remark": null,
                    "dataScope": "1",
                    "params": {},
                    "roleId": 1,
                    "roleName": "管理员",
                    "roleKey": "admin",
                    "roleSort": "1",
                    "status": "0",
                    "delFlag": null,
                    "flag": false,
                    "menuIds": null,
                    "deptIds": null,
                    "admin": true
                }
            ],
            "roleIds": null,
            "postIds": null,
            "admin": true
        }
    }
})





