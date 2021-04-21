
// modal update comment
function openModal(id) {
    var modal = document.getElementById(id);
    modal.style.display = "block";
}

// close modal update comment
function closeModal(id) {
    var modal = document.getElementById(id);
    modal.style.display = "none";
}

// close modal update comment
window.onclick = function (event) {
    let modals = document.getElementsByClassName('modal')
    if (modals) {
        for (let modal of modals) {
            if (modal) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        }
    }
}

function like(action, id) {

    let data = { post: null, comment: null, action };

    switch (action) {
        case 'comment': data.comment = id; break;
        case 'post': data.post = id; break;
        default: return;
    }

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }

    fetch(`${window.location.protocol}//${window.location.host}/api/like/set_like`, options)
        .then(response => response.ok ? response.json() : response)
        .then(data => {
            if (data.err === null) {
                if (action == "comment") {
                    document.getElementById('counterComment' + id).innerHTML = data.data.nbLikeComment;
                } else if (action == 'post') {
                    document.getElementById('counterPost').innerHTML = data.data.nbLikePost;
                }
            }
        })
        .catch(error => console.error(error))
}
