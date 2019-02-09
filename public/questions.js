const room = 'questions';
const socket = io('/chat');
var qs = {{{ questions }}}
var qcount = 1
$(document).ready(function () {
    $("#start").click((event) => {
        console.log('start')
        $('#start').hide();
        $('#chatroom').show();


        $('#messages').append($('<div>').text(qs[qcount]));

    })


    $('form').submit(() => {
        qcount += 1;

        let msg = $('#m').val();
        socket.emit('message', { msg, room });
        $('#m').val('');

        console.log('qcount: ' + qcount);
        console.log('length: ' + qs.length);
        if (qcount < qs.length) {
            console.log('appending')
            $('#messages').append($('<div>').text(qs[qcount]));
        } else {
            socket.emit('questions are done');

        }

        return false;


    });
})


socket.on('connect', () => {
    // emitting to everybody
    socket.emit('join', { room: room });
})

socket.on('message', (msg) => {
    $('#messages').append($('<div>').text(msg));

})