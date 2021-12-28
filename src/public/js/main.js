const chatOutput = document.querySelector('.chat-output');
const typing = document.getElementById('typing');
const inputUser = document.getElementById('input-user');
const inputMessage = document.getElementById('input-message');
const form = document.querySelector('form');

const template = document.getElementById('output-template').content;
const fragment = document.createDocumentFragment();

const socket = io();

document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        socket.emit('chat:send-message', {
            user: inputUser.value,
            message: inputMessage.value
        });
    });

    inputMessage.addEventListener('input', ({ target }) => {
        socket.emit('chat:typing', {
            user: inputUser.value,
            isTyping: target.value === '' ? false : true
        });
    })

    socket.on('chat:send-message', (data) => {
        data.user !== inputUser.value ? typing.textContent = '' : inputMessage.value = '';
        addOutputMessage(data);
    });
    
    socket.on('chat:typing', ({ user, isTyping}) => {
        typing.textContent = isTyping ? `${user} is typing...` : '';
    });
});

const addOutputMessage = ({ user, message }) => {
    const strong = template.querySelector('p strong');
    strong.textContent = `${user}: `;
    template.querySelector('p').textContent = '';
    template.querySelector('p').appendChild(strong);
    template.querySelector('p').append(message);
    const clone = template.cloneNode(true);
    fragment.appendChild(clone);
    chatOutput.appendChild(fragment);
}