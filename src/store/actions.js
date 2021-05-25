import axios from 'axios'
import router from "../router";

export const login = ({ commit, state }, form) => {
    axios.post(
        'http://sanctumwilliam.herokuapp.com/api/auth/login',
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
            id: response.data.id,
            name: response.data.name,
            email: response.data.email,
            created_at: response.data.created_at
        }

        commit('data', user)
        state.msg.success = 'you are connected'
        router.push('/me');
    }).catch((error) => {
        state.msg.error = 'Mauvais identifiant'
        console.log(error)
    });
}

export const register = ({ commit, state }, form) => {
    axios.post(
        'http://sanctumwilliam.herokuapp.com/api/auth/register',
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
        window.location.href="/"
    }).catch((error) => {
        console.log(error)
        state.msg.error = "L'email existe deja"
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

export const tasks_user = ({ commit, getters, state }) => {
    console.log(state.user.token)
    axios.post(
        'http://sanctumwilliam.herokuapp.com/api/tasksuser/',{
            user_id: getters.user.data.id
        }, {
            headers: {
                'Authorization': `Bearer ${state.user.token}`
            }
        }).then((response) => {
        const tasks = response.data['posts']

        commit('tasks', tasks)
    }).catch((error) => {
        console.log(error)
    });
}

export const updateTask = ({  state }, task) => {
    axios.put(
        `http://sanctumwilliam.herokuapp.com/api/tasks/${task.id}`, {
            body: task.body,
        },
        {
            headers: {
                'Authorization': `Bearer ${state.user.token}`
            }
        }
    ).then((response) => {
        console.log(response);
        state.msg.success = 'task updates'
        router.push('/me');
    }).catch((error) => {
        console.log(error)
        state.msg.error = error
    });
}

export const deleteTask = ({ state }, taskId) => {
    console.log(state.user.token)
    axios.delete(
        `http://sanctumwilliam.herokuapp.com/api/tasks/${taskId}`, {
            headers: {
                'Authorization': `Bearer ${state.user.token}`
            }
        }).then((response) => {
        console.log(response)
        state.msg.success = 'task destroyed'
        router.push('/me');
    }).catch((error) => {
        console.log(error)
    });
}

export const createTask = ({ getters, state }, form) => {
    console.log(getters.user.data.id)
    axios.post(
        'http://sanctumwilliam.herokuapp.com/api/tasks/', {
            body: form.body,
            user_id: getters.user.data.id
        },
        {
            headers: {
                'Authorization': `Bearer ${state.user.token}`
            }
        }
    ).then((response) => {
        console.log(response);
        state.msg.success = 'task created'
        router.push('/tasks');
    }).catch((error) => {
        console.log(error)
        state.msg.error = "Echec d'ajout"
    });
}
