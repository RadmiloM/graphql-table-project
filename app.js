console.log("app js working");

const tableBody = document.querySelector('tbody')
console.log("🚀 ~ tableBody:", tableBody)

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
                        age
                        email
                        phone
                    }}`
        })
    }).then(response => response.json())
    .then(response => {
        if(response && response?.data?.users.length > 0) {
            const users = response?.data?.users;
            users.forEach(item => {
                console.log(item);
                const tableRow = document.createElement('tr');

                const tableFirstName = document.createElement('td');
                const tableLastName = document.createElement('td');
                const tableAge = document.createElement('td');
                const tableEmail = document.createElement('td');
                const tablePhone = document.createElement('td');

                tableFirstName.innerText = item?.firstName ?? '';
                tableLastName.innerText = item?.lastName ?? '';
                tableAge.innerText = item?.age ?? '';
                tableEmail.innerText = item?.email ?? '';
                tablePhone.innerText = item?.phone ?? '';

                tableRow.appendChild(tableFirstName);
                tableRow.appendChild(tableLastName);
                tableRow.appendChild(tableAge);
                tableRow.appendChild(tableEmail);
                tableRow.appendChild(tablePhone);

                tableBody.append(tableRow);
            })
            
        }
    })
    .catch(error=> console.error('Error', error))
}

getUsers();

/*
{
    "data": {
        "users": [
            {
                "id": "1",
                "firstName": "Rade",
                "lastName": "Jovic"
            },
            {
                "id": "2",
                "firstName": "Damir",
                "lastName": "Damic"
            },
            {
                "id": "3",
                "firstName": "Loko",
                "lastName": "Lokic"
            },
            {
                "id": "4",
                "firstName": "Marta",
                "lastName": "Martic"
            },
            {
                "id": "5",
                "firstName": "Sasa",
                "lastName": "Sasic"
            }
        ]
    }
}
*/