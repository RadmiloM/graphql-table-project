console.log("app js working");

const serverURL = `http://localhost:5000/graphql`;

function getUsers() {
    fetch(serverURL, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            query: `
            query {
                    users {
                        id
                        firstName
                        lastName
                    }}`
        })
    }).then(response => response.json())
    .then(data => console.log(data))
    .catch(error=> console.error('Error', error))
}

getUsers();