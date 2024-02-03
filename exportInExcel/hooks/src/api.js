import axios from 'axios'
const url = "https://dummyjson.com/posts"
export const post1 = async (signal) => {
    const response = await fetch(`${url}/1`, {
        signal: signal
    });
    const data = await response.json();

    if (response.status === 200) {
        return data
    }
    else {
        console.log('error')
    }
}



export const post2 = async (signal) => {
    const response = await fetch(`${url}/2`, {
        signal: signal
    });
    const data = await response.json();

    if (response.status === 200) {
        return data
    }
    else {
        console.log('error')
    }
}



export const post3 = async () => {
    const response = await fetch(`${url}/3`, {
        // signal: signal
    });
    const data = await response.json();

    if (response.status === 200) {
        return data
    }
    else {
        console.log('error')
    }
}

export const post4 = async () => {
    const response = await fetch(`${url}/4`, {
        // signal: signal
    });
    const data = await response.json();

    if (response.status === 200) {
        return data
    }
    else {
        console.log('error')
    }
}

export const post5 = async (signal) => {
    const config = {
        method: "get",
        url: `${url}/5`,
        signal:signal
    }
    try {
        const response = await axios(config);
        return response.data
    }
    catch (error) {
        console.log(error);
    }

}