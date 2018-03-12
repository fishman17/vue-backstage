import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { LoginUsers, Users } from './data/user'
import { echarts } from './data/echarts'
let _Users = Users

export default {
    bootstrap() {
        let mock = new MockAdapter(axios);
        mock.onGet('/success').reply(200, {
            msg: 'success'
        });
        mock.onGet('/user/test').reply(config => {
            let newN = config.params;
            newN = newN + 100;
            return new Promise((resolve, reject) => {
                resolve([200, {
                    code: 521521,
                    msg: 'testSUCCESS',
                    newN,
                }])
            })
        });
        //登录
        mock.onPost('/login').reply(config => {
            console.log(config);
            let { username, password } = JSON.parse(config.data);
            return new Promise((resolve, reject) => {
                let user = null;
                setTimeout(() => {
                    let hasUser = LoginUsers.some(u => {
                        if (u.username === username && u.password === password) {
                            user = JSON.parse(JSON.stringify(u));
                            user.password = undefined;
                            return true;
                        }
                    });
                    if (hasUser) {
                        resolve([200, { code: 200, msg: '请求成功', user }]);
                    } else {
                        resolve([200, { code: 500, msg: '账号或密码错误' }]);
                    }
                }, 1000);
            });
        });
        mock.onGet('/user/list').reply(config => {
            let { name } = config.params;
            let mockUsers = _Users.filter(user => {
                if (name && user.name.indexOf(name) == -1) return false;
                return true;
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        users: mockUsers
                    }]);
                }, 1000);
            });
        });
        mock.onGet('/user/listpage').reply(config => {
            let { name, page } = config.params;
            let mockUsers = _Users.filter(user => {
                if (name && user.name.indexOf(name) == -1) return false;
                return true;
            });
            let total = mockUsers.length;
            let fiUsers = mockUsers.filter((u, index) => index < page * 20 && index >= (page - 1) * 20)

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        users: fiUsers,
                        total
                    }]);
                }, 500);
            });
        });
        mock.onGet('/user/add').reply(config => {
            let newUser = config.params;
            _Users.push(newUser);
            return new Promise((resolve, reject) => {
                resolve([200, {
                    msg: '添加成功'
                }]);
            });
        });
        mock.onGet('/user/remove').reply(config => {
            console.log(config);
            let id = config.params.id;
            _Users = _Users.filter(u => u.id !== id);
            // _Users.slice();
            return new Promise((resolve, reject) => {
                resolve([200, {
                    msg: '删除成功'
                }]);
            });
        });
        mock.onGet('/user/batchremove').reply(config => {
            let { id } = config.params;
            let ids = id.split(',');
            console.log(ids);
            _Users = _Users.filter(u=> !ids.includes(u.id));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve([200, {
                    code: 200,
                    msg: '全部删除成功'
                  }]);
                }, 200);
              });
        });
        mock.onGet('/user/edit').reply(config => {
            let { id, name, addr, age, birth, sex } = config.params;
            _Users.some(u => {
              if (u.id === id) {
                u.name = name;
                u.addr = addr;
                u.age = age;
                u.birth = birth;
                u.sex = sex;
                return true;
              }
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve([200, {
                    code: 200,
                    msg: '编辑成功'
                  }]);
                }, 500);
              });
        });
        mock.onGet('/user/echarts').reply(config => {
            console.log(config);
            return new Promise((resolve, reject) => {
                  resolve([200, {
                    code: 200,
                    msg: echarts
                  }]);
              });
        });
    }
}