import axios from 'axios'

export const login = ({ commit, state }, form) => {
    axios.post(
        'https://tondont-list.herokuapp.com/api/auth/login',
        {
            email: form.email,
            password: form.password,
            device_name: "vue"
        }
    ).then((response) => {
        console.log(response);

        // console.log(response.data.token)
        commit('token', response.data.token)

        const user = {
            name: response.data.name,
            email: response.data.email,
            created_at: response.data.created_at
        }

        commit('data', user)
        state.msg.success = 'you are connected'


    }).catch((error) => {
        state.msg.error = error
        console.log(error)
    });
}

export const register = ({ commit, state }, form) => {
    axios.post(
        'https://tondont-list.herokuapp.com/api/auth/register',
        {
            name: form.name,
            email: form.email,
            password: form.password,
            device_name: "vue"
        }
    ).then((response) => {
        console.log(response);

        // console.log(response.data.token)
        commit('token', response.data.token)

        const user = {
            name: response.data.name,
            email: response.data.email,
            created_at: response.data.created_at
        }

        commit('data', user)
        state.msg.success = 'Compte enregsitré'
        // window.location.href="/login"
    }).catch((error) => {
        state.msg.error = error
        console.log(error)
    });
}

export const logout = ({ commit, state }) => {
    const token = state.user.token;
    if (!token) {
        return;
    }

    axios.post(
        'https://tondont-list.herokuapp.com/api/auth/logout', {}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((response) => {
        console.log(response);
        state.msg.success = 'Vous etes déconnecté'
    }).catch((error) => {
        console.log(error)
    });
    commit('token', null);
    commit('data', {});
    window.location.href = "/"
}

export const tasks_user = ({ commit, state }) => {
    console.log(state.user.token)
    axios.get(
        'https://tondont-list.herokuapp.com/api/tasks/', {
        headers: {
            'Authorization': `Bearer ${state.user.token}`
        }
    }).then((response) => {
        // console.log("action tasks")
        // console.log(response.data['posts']);
        const tasks = response.data['posts']

        commit('tasks', tasks)
    }).catch((error) => {
        console.log(error)
    });
}

export const task_user = ({ commit, state }, id) => {
    console.log(state.user.token)
    axios.get(
        `https://tondont-list.herokuapp.com/api/tasks/${id}`, {
        headers: {
            'Authorization': `Bearer ${state.user.token}`
        }
    }).then((response) => {
        console.log("task_user")
        console.log(response.data)
        const task = {
            id: response.data['id'],
            body: response.data['body']
        }

        commit('task', task)
    }).catch((error) => {
        console.log(error)
    });
}

export const updateTask = ({ commit, state }, task) => {
    console.log(task.body)
    axios.put(
        `https://tondont-list.herokuapp.com/api/tasks/${task.id}`, {
        body: task.body,
        done: 1
    },
        {
            headers: {
                'Authorization': `Bearer ${state.user.token}`
            }
        }
    ).then((response) => {
        console.log(response);
        state.msg.success = 'task updates'
        commit('task', task)
    }).catch((error) => {
        console.log(error)
        state.msg.error = error
    });
}

export const deleteTask = ({ state, commit }, task) => {
    console.log(state.user.token)
    axios.delete(
        `https://tondont-list.herokuapp.com/api/tasks/${task.id}`, {
        headers: {
            'Authorization': `Bearer ${state.user.token}`
        }
    }).then((response) => {
        console.log(response)
        state.msg.success = 'task destroyed'
        const task = {
            body: ''
        }
        commit('task', task)
    }).catch((error) => {
        console.log(error)
    });
}

export const createTask = ({ state }, form) => {
    axios.post(
        'https://tondont-list.herokuapp.com/api/tasks/', {
        body: form.body
    },
        {
            headers: {
                'Authorization': `Bearer ${state.user.token}`
            }
        }
    ).then((response) => {
        console.log(response);
        state.msg.success = 'task created'
    }).catch((error) => {
        console.log(error)
        state.msg.error = error
    });
}
