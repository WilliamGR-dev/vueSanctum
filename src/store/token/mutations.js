export const token = (state, token) => {
    state.user.token = token
} 

export const data = (state, data) => {
    state.user.data = data
}

export const tasks = (state, tasks) => {
    state.tasks = tasks
}

export const task = (state, task) => {
    state.task = task
} 